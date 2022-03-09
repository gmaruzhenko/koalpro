
from distutils.command.config import config
import pandas as pd
from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
# import pandas as pd
import ast, json, requests
from types import SimpleNamespace
from algebra import addition, subtraction, multiplication, division, load_csv

app = Flask(__name__)
CORS(app)


@app.route('/data/crosssell', methods=['GET'])
def send_cross_sell_data():
    '''
    Sends aggregated cross sell tabulated data up to frontend
    :return: json
    '''
    #if cross-sell, 
    # TODO ship main function's data tabulation results instead of dummy below
    
    response = load_JSON()
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/data/upsell', methods=['GET'])
def send_upsell_data():
    '''
    Sends aggregated upsell tabulated data up to frontend
    :return: json
    '''

    # TODO ship main function's data tabulation results instead of dummy below
    response = load_JSON()
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/postcsv', methods=['POST'])
def send_csv():
    response = jsonify(json.load(open(request.data)))
    return response

@app.route('/config', methods=['GET', 'POST'])
@cross_origin()
def process_config():
    if request.method == 'POST':
        new_config = request.get_json()

        with open('../../resources/config_file.json', 'w') as config_file:
                json.dumps(config_file.write(new_config))

        print(new_config)
        return json.dumps(new_config)
    else:
        '''
        GET /config
        After the user completes dragging and dropping nodes in the no-code workflow, 
        backend can request the node configuration from the JSON config file. 
        '''
        try: 
            with open('../../resources/config_file.json', 'r') as config_file:
                curr_config = json.load(config_file)
                print(curr_config)
            return json.dumps(curr_config)
        except:
            curr_config = json.dump("", open('../../resources/config_file.json', 'w'))
            print(curr_config)
            return json.dumps(curr_config)
        
    

'''
Parses JSON config file from Frontend
RETURNS: Result Dictionary for up-sell or cross-sell with {companyid, value}
'''
def load_JSON():
    operations = ["addition", "subtraction", "multiplication", "division"]
    nodelist = []  # Keep track of nodes
    operations_todo = {}  # Dictionary to keep track of connections. Key = node name, Value = type of operation
    edges = {}  # Dictionary to keep track of edges. Key = Target, Values = Sources
    results = {}  # Dictionary to keep track of connections. Key = node name, Value = result dict
    response = requests.get("http://127.0.0.1:5000/config")
    json_data = response.json()
    for node in json_data:
        # Parse JSON into an object with attributes corresponding to dict keys.

        if node["type"] == "csv_data_import":
            # store new input dict
            nodelist.append(node)

            # load dict from csv
            # loadcsv(node.data) Returns dict obj with nodeid = {key,value}
            data = load_csv(node["data"])
            results[node["id"]] = data
        elif node["type"] in operations:
            # store in operations to do list
            operations_todo[node["id"]] = node["type"]

        elif node["type"] == "cross_sell_output" or node["type"] == "up_sell_output":
            results[node["id"]] = {}
            resultid = node["id"]
            if node["type"] == "cross_sell_output":
                cross_sell = True
            if node["type"] == "cross_sell_output":
                up_sell = True    

        elif node["type"] == "default":
            # connection objects
            if node["target"] not in edges:
                edges[node["target"]] = []
                edges[node["target"]].append(node["source"])

            elif node["target"] in edges:
                if node["source"] not in edges[node["target"]]:
                    edges[node["target"]].append(node["source"])

    print(
        "\nNodelist: \n", nodelist, "\n\n",
        "Operations: \n", operations_todo, "\n\n",
        "Edges \n", edges, "\n\n")
#     "Results: \n", results)

    #Perform operations based on the todo list
    processOperations(operations_todo, edges, nodelist, results)

    # print("\n\nCompleting calculations...\n")
    # print("Modified Node List:\n", nodelist, "\n\n")
    # print("FINAL RESULTS:\n", results, "\n\n")

    response = jsonify(results[resultid])
    print(results[resultid])
    
    return response

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
def do_operation(string, inputs,result_db):
    operation_result = {}
    dict1 = result_db[inputs[0]]
    dict2 = result_db[inputs[1]]
    if string == "addition":
        # use add method
        operation_result = addition(dict1,dict2)
    if string == "subtraction":
        # use minus method
        operation_result = subtraction(dict1,dict2)
    if string == "multiplication":
        # use multiply method
        operation_result = multiplication(dict1,dict2)
    if string == "division":
        # use division method
        operation_result = division(dict1,dict2)
    return operation_result

if __name__ == '__main__':
    app.run(debug=True)

