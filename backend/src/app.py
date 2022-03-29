from distutils.command.config import config
from turtle import back
from urllib import response
import pandas as pd
from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
# import pandas as pd
import ast, json, requests
from types import SimpleNamespace
from algebra import addition, subtraction, multiplication, division, load_csv, discount, product
from topsort import Graph, make_graph, process_edges

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['GET'])
@cross_origin()
def send_data():
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
        response = load_JSON()
        unsorted = pd.DataFrame.from_records(response)
        sorted_df = unsorted.sort_values(by='cross_sell_value',ascending=False)
        records = sorted_df.to_dict('records')
        response =  jsonify(records)
        return response

@app.route('/config', methods=['GET', 'POST'])
@cross_origin()
def process_config():
    if request.method == 'POST':

        new_config = request.get_json(cache=True)
        new_config_dict = json.dumps(new_config["elements"])

#if posted config is not null, update config and backup to cache the last saved post
        if new_config and new_config_dict is not None:
            with open('../../resources/config_file.json', 'w') as config_file:
                json.dumps(config_file.write(new_config_dict))
            with open('../../resources/backup_config.json', 'w') as backup_file :
                json.dumps(backup_file.write(new_config_dict))
            
            print(new_config_dict)
            config_file.close()
            backup_file.close()
        return json.dumps(new_config_dict)

    else:
        '''
        GET /config
        After the user completes dragging and dropping nodes in the no-code workflow, 
        backend can request the node configuration from the JSON config file. 
        '''
        try: #reading exisiting config file
            with open('../../resources/config_file.json', 'r') as config_file:
                curr_config = json.load(config_file)
                print(curr_config)
            config_file.close()
            return json.dumps(curr_config)
        except: 
            #if no existing config file, then create one and
            # overwrite config file with backup config file
            with open('../../resources/backup_config.json', 'r') as backup_file :
                backup_data = backup_file.read()
                if len(backup_data) < 1:
                    backup_data = superbackup()
            
            with open('../../resources/config_file.json', 'w') as config_file :
                json.dumps(config_file.write(backup_data))

            #curr_config = json.dump(backup_data, open('../../resources/config_file.json', 'w'))
            #print(curr_config)
            backup_file.close()
            config_file.close()
            return json.dumps(backup_data)
def superbackup():
    with open('../../resources/super_backup_config_DONOTTOUCH.json', 'r') as super_backup_file :
        super_backup_data = super_backup_file.read()
    with open('../../resources/backup_config.json', 'w') as backup_config :
                json.dumps(backup_config.write(super_backup_data))
    backup_config.close()
    super_backup_file.close()
    return super_backup_data
'''
Parses JSON config file from Frontend
RETURNS: JSON str of Python Result Dictionary for up-sell or cross-sell with [{"companyid": "id", "value":1}]
'''
def load_JSON():
    operations = ["addition", "subtraction", "multiplication", "division", "discount", "product"]
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

        if node["type"] == "csv_data_import" or node["type"] == "DummySnowflakeDBImport" or node["type"] == "DummySalesforceImport":
            # store new input dict
            nodelist.append(node)
            print(node)

            # load dict from csv
            # loadcsv(node.data) Returns dict obj with nodeid = {key,value}
            # inputid = node["id"]
            data = load_csv(node["data"])
            results[node["id"]] = data
        elif node["type"] in operations:
            # store in operations to do list
            if node["type"] == "discount":
                node_data = node["data"]
                operations_todo[node["id"]] = (node["type"],node_data["discount"])
            elif node["type"] == "product":
                node_data = node["data"]
                node_product = node_data["product"] #Product is a list of len = 1 e.g. "product": [{"unit_price": 30, "product_name": "Helmet"}]
                productlist = node_product[0]
                operations_todo[node["id"]] = (node["type"],productlist["unit_price"])
            else:
                operations_todo[node["id"]] = node["type"]

        elif node["type"] == "cross_sell_output" or node["type"] == "up_sell_output":
            if node["type"] == "cross_sell_output":
                results[node["id"]] = {}
                cross_sell_resultid = node["id"]
                cross_sell = True

            elif node["type"] == "up_sell_output":
                results[node["id"]] = {}
                up_sell_resultid = node["id"]
                up_sell = True 

        elif node["type"] == "button_edge":
            # connection objects
            if node["target"] not in edges:
                edges[node["target"]] = []
                edges[node["target"]].append(node["source"])

            elif node["target"] in edges:
                if node["source"] not in edges[node["target"]]:
                    edges[node["target"]].append(node["source"])

    #lookup dict to convert nodeid strings to ints
    #  Key: Int node number, Value: string name
    lookup_dict = {}
    edge_graph = make_graph(edges,lookup_dict) #Perform topological sort on the list of edges
    topsorted_list = edge_graph.topologicalSort() #returns list of the order of indexes of edgelist
    #print("\n\nTOPSORT",topsorted_list)
    processed_edges = process_edges(topsorted_list, edges, lookup_dict) #Returns correct dictionary of edges after top sort
    #print("FINAL EDGES",processed_edges)
    #print("\nNodelist: \n", nodelist, "\n\n","Operations: \n", operations_todo, "\n\n","Edges: \n", edges,"\n\nSorted Edges:\n",processed_edges, "\n\n","Results: \n", results)
    #Perform operations based on the todo list
    processOperations(operations_todo, processed_edges, nodelist, results)
    cross_sell_dict_to_return = {}
    up_sell_dict_to_return = {}

    if cross_sell:
        cross_sell_dict_to_return = results[cross_sell_resultid]
    if up_sell:
        up_sell_dict_to_return = results[up_sell_resultid]
    
    #print("\n\nCROSS SELL DICT", cross_sell_dict_to_return, "\n\nUP SELL DICT", up_sell_dict_to_return)
    #print("DICT TO RETURN",dict_to_return)

    #response = json.dumps(reformat_response)
    #print(reformat_response)
    
    # Combines cross sell and upsell dictionaries to format 
    # {'companyA': ['cross-sell', 'upsell'], 'companyB': ['cross-sell', 'upsell]}
    dict_to_return = {}
    
    if len(cross_sell_dict_to_return) == 0:
        total_keys = list(up_sell_dict_to_return.keys())
    elif len(up_sell_dict_to_return) == 0:
        total_keys = list(cross_sell_dict_to_return.keys())
    elif cross_sell_dict_to_return and up_sell_dict_to_return:
        total_keys = list(cross_sell_dict_to_return.keys()) + list(up_sell_dict_to_return.keys())
    else: 
        print("NO ITEMS IN DICTIONARY")

    for key in set(total_keys):
        try:
            dict_to_return.setdefault(key,[]).append(cross_sell_dict_to_return[key])        
        except KeyError:
            pass

        try:
            dict_to_return.setdefault(key,[]).append(up_sell_dict_to_return[key])          
        except KeyError:
            pass

    #print("\n\nDICT TO RETURN",dict_to_return)

    reformat_response = []
    for k in dict_to_return:
        dict_entry = {}
        dollars = dict_to_return[k]
        dict_entry['companyID'] = k
        
        if up_sell and cross_sell:
            dict_entry['cross_sell_value'] = dollars[0]
            dict_entry['up_sell_value'] = dollars[1]
        elif len(dollars) <= 1 and cross_sell:
            dict_entry['cross_sell_value'] = dollars[0]
            dict_entry['up_sell_value'] = None
        elif len(dollars) <= 1 and up_sell:
            dict_entry['up_sell_value'] = dollars[0]
            dict_entry['cross_sell_value'] = None   

        reformat_response.append(dict_entry)
        #print(reformat_response)

    #reformat_response = [ {'companyID' : k, 'cross_sell_value' : dict_to_return[k][0], 'up_sell_value' : dict_to_return[k][1]} for k in dict_to_return]
    # print('/n',"ANSWER",reformat_response)
    return reformat_response


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
            #print("\n\nedge", edge)
            #print("\n\noperationslist[edge]", operationslist[edge], "\n\nedges_list[edge]",edges_list[edge],"\n\nresults", results_data)
            answer = do_operation(operationslist[edge], edges_list[edge],results_data)
            newnode = {
                "id": edge,
                "type": "calculation_result",
                "data": answer
            }
            node_list.append(newnode)
            results_data[edge] = answer
            continue
        elif edge in results_data: #if node is a calculated result or output node
            if (len(edges_list[edge]) == 1):
                inputid = edges_list[edge][0]
            for node in node_list:
                currID = node["id"]
                #case: operation node from calculated result -> output node
                if currID == inputid and node["type"] == "calculation_result":
                    data = node["data"]
                    results_data[edge] = data
                #case: input node -> output node
                elif currID == inputid and (node["type"] == "csv_data_import"or node["type"] == "DummySnowflakeDBImport" or node["type"] == "DummySalesforceImport"):
                    data = load_csv(node["data"])
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
        if isinstance(string_or_tuple, str):
            dict2 = result_db[inputs[0]]
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
    if string_or_tuple[0] == "product":
        # use division method
        unit_price = string_or_tuple[1]
        operation_result = product(dict1,unit_price)
    return operation_result

if __name__ == '__main__':
    app.run(debug=True)

