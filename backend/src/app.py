import pandas as pd
from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
# import pandas as pd
import ast, json
from types import SimpleNamespace

app = Flask(__name__)
CORS(app)


@app.route('/data/crosssell', methods=['GET'])
def send_cross_sell_data():
    '''
    Sends aggregated cross sell tabulated data up to frontend
    :return: json
    '''

    # TODO ship main function's data tabulation results instead of dummy below
    response = jsonify({'cross sell key1 ': 'value1', 'ross sell key2': 'value2'})
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/data/upsell', methods=['GET'])
def send_upsell_data():
    '''
    Sends aggregated upsell tabulated data up to frontend
    :return: json
    '''

    # TODO ship main function's data tabulation results instead of dummy below
    response = jsonify({'upsell key1': 'value1', 'upsell key2': 'value2'})
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
        print(new_config)
        return jsonify('TODO implement config update')
    else:
        response = jsonify(json.load(open('example.json')))
        return response


# Opening JSON file
f = open('example.json')
# returns JSON object as a dictionary
example_json_data = json.load(f)

operations = ["addition", "subtraction", "multiplication", "division"]
nodelist = []  # Keep track of nodes
operations_todo = {}  # Dictionary to keep track of connections. Key = node name, Value = type of operation
edges = {}  # Dictionary to keep track of edges. Key = Target, Values = Sources
results = {}  # Dictionary to keep track of connections. Key = node name, Value = result dict


def load_JSON(json_data):
    for node in json_data:
        # Parse JSON into an object with attributes corresponding to dict keys.
        # currnode = json2obj(node)

        if node['type'] == 'csv_data_import':
            # store new input dict
            nodelist.append(node)

            # load dict from csv
            # loadcsv(currnode.id, currnode.data) Returns dict obj with nodeid = {key,value}

        elif node['type'] in operations:
            # store in operations to do list
            operations_todo[node['id']] = node['type']

        elif node['type'] == 'cross_sell_output' or node['type'] == 'up_sell_output':
            results[node['id']] = {}

        elif node['type'] == 'connection':
            # connection objects
            if node['target'] not in edges:
                edges[node['target']] = []
                edges[node['target']].append(node['source'])

            elif node['target'] in edges:
                if node['source'] not in edges[node['target']]:
                    edges[node['target']].append(node['source'])

    print(
        "\nNodelist: \n", nodelist, "\n\n",
        "Operations: \n", operations_todo, "\n\n",
        "Edges \n", edges, "\n\n",
        "Results: \n", results)

    processOperations(operations_todo)
    print("\n\nCompleting calculations...\n")
    print("Modified Node List:\n", nodelist, "\n\n")
    print("FINAL RESULTS:\n", results, "\n\n")


# Params =  string: type of operation, inputs: list of input node names
# Returns = result dict
def do_operation(string, inputs):
    result = {}
    if string == "addition":
        # use add method
        result["abc"] = 123
        result["def"] = 456
        pass
    if string == "subtraction":
        # use minus method
        pass
    if string == "multiplication":
        # use multiply method
        pass
    if string == "division":
        # use division method
        pass
    return result


def processOperations(operationslist):
    for edge in edges:
        if edge in operations_todo:
            answer = do_operation(operations_todo[edge], edges[edge])
            newnode = {
                'id': edge,
                'data': answer
            }
            nodelist.append(newnode)
        elif edge in results:
            if (len(edges[edge]) == 1):
                key = edges[edge][0]
            for node in nodelist:
                currID = node['id']
                if currID == key:
                    data = node['data']
                    results[edge] = data


if __name__ == '__main__':
    app.run(debug=True)
    # for i in example_json_data:
    #     print(i)
    load_JSON(example_json_data)
    # Closing file
    f.close()
    app.run()