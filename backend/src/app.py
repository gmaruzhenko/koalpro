from distutils.command.config import config
from urllib import response
import pandas as pd
from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
# import pandas as pd
import ast, json, requests
from types import SimpleNamespace
from algebra import addition, subtraction, multiplication, division, load_csv, discount

app = Flask(__name__)
CORS(app)


@app.route('/data/crosssell', methods=['GET'])
@cross_origin()
def send_cross_sell_data():
    '''
    Sends aggregated cross sell tabulated data up to frontend
    :return: json with array of records where each record is in shape :
    {
    "companyID": "United Parcel Service, Inc.", 
    "cross_sell_value": 1086000
    }
    '''
    if(requests.get("http://127.0.0.1:5000/config") == ""):
        return ("",204)
    
    else:
        is_crosssell = False
        is_upsell = False
        response,is_crosssell,is_upsell = load_JSON()
    
        if(is_upsell):
            response = ''
            return (response, 204)
        elif(is_crosssell):
            response =  jsonify(response)
            return response

@app.route('/data/upsell', methods=['GET'])
@cross_origin()
def send_upsell_data():
    '''
    Sends aggregated upsell tabulated data up to frontend
    :return: json
    '''
    if(requests.get("http://127.0.0.1:5000/config") == ""):
        return ("",204)
    
    else:
        is_crosssell = False
        is_upsell = False
        response,is_crosssell,is_upsell = load_JSON()
    
        if(is_crosssell):
            response = ''
            return (response, 204)
        elif(is_upsell):
            return response
    

@app.route('/config', methods=['GET', 'POST'])
@cross_origin()
def process_config():
    if request.method == 'POST':

        new_config = request.get_json(cache=True)
        new_config_dict = json.dumps(new_config["elements"])
        print(type(new_config_dict))
        with open('../../resources/config_file.json', 'w') as config_file:
                json.dumps(config_file.write(new_config_dict))
        print(new_config_dict)
        config_file.close()
        return json.dumps(new_config_dict)

    else:
        '''
        GET /config
        After the user completes dragging and dropping nodes in the no-code workflow, 
        backend can request the node configuration from the JSON config file. 
        '''
        # json_data = response.json()
        # get response
        #if response not empty:
        #write to config.json & update backup.json
        #else
        #pull from backup & overwrite config with backup

        try: #reading exisiting config file
            with open('../../resources/config_file.json', 'r') as config_file:
                curr_config = json.load(config_file)
                print(curr_config)
            config_file.close()
            return json.dumps(curr_config)
        except: 
            #TODO: if no existing config file, overwrite config file with backup config file
            with open('../../resources/backup_config.json', 'r') as file :
                backup_data = file.read()
            
            with open('../../resources/config_file.json', 'w') as config_file :
                json.dumps(config_file.write(backup_data))

            #curr_config = json.dump(backup_data, open('../../resources/config_file.json', 'w'))
            #print(curr_config)
            file.close()
            config_file.close()
            return json.dumps(backup_data)

'''
Parses JSON config file from Frontend
RETURNS: JSON str of Python Result Dictionary for up-sell or cross-sell with [{"companyid": "id", "value":1}]
'''
def load_JSON():
    operations = ["addition", "subtraction", "multiplication", "division", "discount"]
    nodelist = []  # Keep track of nodes
    
    # Dictionary to keep track of connections. Key = node name, Value = type of operation
    #For discount type, Key = nodeid : Value: Tuple(String:type of operation, discount a decimal)
    operations_todo = {}  
    
    edges = {}  # Dictionary to keep track of edges. Key = Target, Values = Sources
    results = {}  # Dictionary to keep track of connections. Key = node name, Value = result dict

    response = requests.get("http://127.0.0.1:5000/config")
    json_data = response.json()
    cross_sell = False
    up_sell = False

    for node in json_data:
        # Parse JSON into an object with attributes corresponding to dict keys.

        if node["type"] == "csv_data_import":
            # store new input dict
            nodelist.append(node)

            # load dict from csv
            # loadcsv(node.data) Returns dict obj with nodeid = {key,value}
            inputid = node["id"]
            data = load_csv(node["data"])
            results[node["id"]] = data
        elif node["type"] in operations:
            # store in operations to do list
            if node["type"] == "discount":
                node_data = node["data"]
                operations_todo[node["id"]] = (node["type"],node_data["discount_from_list_price"])
            else:
                operations_todo[node["id"]] = node["type"]

        elif node["type"] == "cross_sell_output" or node["type"] == "up_sell_output":
            results[node["id"]] = {}
            resultid = node["id"]
            if node["type"] == "cross_sell_output":
                cross_sell = True
                up_sell = False
            if node["type"] == "up_sell_output":
                up_sell = True  
                cross_sell = False  

        elif node["type"] == "default":
            # connection objects
            if node["target"] not in edges:
                edges[node["target"]] = []
                edges[node["target"]].append(node["source"])

            elif node["target"] in edges:
                if node["source"] not in edges[node["target"]]:
                    edges[node["target"]].append(node["source"])

    #print("\nNodelist: \n", nodelist, "\n\n","Operations: \n", operations_todo, "\n\n","Edges \n", edges, "\n\n","Results: \n", results)

    #Perform operations based on the todo list
    if len(operations_todo) <= 0:
        resultid = inputid
    else:
        processOperations(operations_todo, edges, nodelist, results)

    # print("\n\nCompleting calculations...\n")
    # print("Modified Node List:\n", nodelist, "\n\n")
    # print("FINAL RESULTS:\n", results, "\n\n")
    dict_to_return = results[resultid]
    #print("DICT TO RETURN",dict_to_return)
    if (cross_sell == True):
        reformat_response = [ {'companyID' : k, 'cross_sell_value' : dict_to_return[k]} for k in dict_to_return]
    elif (up_sell == True):
        reformat_response = [ {'companyID' : k, 'up_sell_value' : dict_to_return[k]} for k in dict_to_return]
    #response = json.dumps(reformat_response)
    #print(reformat_response)

    return reformat_response,cross_sell,up_sell


# Params =  string: type of operation, inputs: list of input node names
# Returns = result dict

'''
Processes the operations in the todo list
PARAMETERS:
operationslist: Dictionary of operations to be performed (operations_todo in loadJSON())
edges_list: Dictionary of connections
node_list: List of nodes
results_data: Dictionary of nodeid and it's corresponding data

RETURNS: void
'''
def processOperations(operationslist,edges_list, node_list, results_data):
    for edge in edges_list:
        if edge in operationslist:
            answer = do_operation(operationslist[edge], edges_list[edge],results_data)
            newnode = {
                'id': edge,
                'data': answer
            }
            node_list.append(newnode)
        elif edge in results_data:
            if (len(edges_list[edge]) == 1):
                key = edges_list[edge][0]
            for node in node_list:
                currID = node['id']
                if currID == key:
                    data = node['data']
                    results_data[edge] = data


'''
Calls on the methods that perform the specified operation 
PARAMETERS:
String: String specifying operation (ex. "Addition", "Subtraction", etc.)
intputs: Inputs to the operation in the form of Nodeid (ex. dndnode_1, dndnode_2, etc.)
result_db: Dictionary Database called "result" that holds the nodeid and the corresponding data. Ex. {nodeid, {companyid, value}} 

RETURNS: Results from the operation in a dictionary
'''
def do_operation(string_or_tuple, inputs,result_db):
    operation_result = {}
    length = len(inputs)
    if length >= 1:
        dict1 = result_db[inputs[0]]
    if length >=2:
        dict2 = result_db[inputs[1]]
    
    if string_or_tuple == "addition":
        # use add method
        operation_result = addition(dict1,dict2)
    if string_or_tuple == "subtraction":
        # use minus method
        operation_result = subtraction(dict1,dict2)
    if string_or_tuple == "multiplication":
        # use multiply method
        operation_result = multiplication(dict1,dict2)
    if string_or_tuple == "division":
        # use division method
        operation_result = division(dict1,dict2)
    if string_or_tuple[0] == "discount":
        # use division method
        discount_num = string_or_tuple[1]
        operation_result = discount(dict1,discount_num)
    return operation_result

if __name__ == '__main__':
    app.run(debug=True)

