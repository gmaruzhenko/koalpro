from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api, reqparse
#import pandas as pd
import ast, json
from types import SimpleNamespace

app = Flask(__name__)
api = Api(app)

#Data Endpoint
class Data(Resource):
    #methods go here
    #GET: data from csv, stores in a dict
    def get(self): 
        data = pd.read_csv('/Users/pamira/koalpro/koalpro/resources/example.csv')  # Change file path
        data = data.to_dict()  # convert dataframe to dictionary
        return {'data': data}, 200  # return data and 200 OK code
    

#Config Endpoint
class Config(Resource):
    #methods go here
    #GET: JSON from frontend to backend
    def get(self): 
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            json_config = request.json
            return {'config': json_config}, 200  # return data and 200 OK code
        else:
            return 'Content-Type not supported!'
    
api.add_resource(Data, '/data')  # '/data' is our entry point for Data
api.add_resource(Config, '/config')  # '/config' is our entry point for JSON config file

# Opening JSON file
f = open('example.json')
# returns JSON object as a dictionary
example_json_data = json.load(f)

operations = ["addition", "subtraction", "multiplication", "division"]
nodelist = [] #Keep track of inputs
operations_todo = {} #Dictionary to keep track of connections. Key = node name, Value = type of operation
edges = {}
results = {} #Dictionary to keep track of connections. Key = node name, Value = result dict

def load_JSON(json_data):
    for node in json_data:
        # Parse JSON into an object with attributes corresponding to dict keys.
        #currnode = json2obj(node)

        if node['type'] == 'csv_data_import':
            #store new input dict
            nodelist.append(node)
            
            #load dict from csv
            #loadcsv(currnode.id, currnode.data) Returns dict obj with nodeid = {key,value}

        elif node['type'] in operations:
            #store in operations to do list
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
    "Nodelist: \n",nodelist,"\n\n",
    "Operations: \n", operations_todo,"\n\n",
    "Edges \n", edges,"\n\n",
    "Results: \n", results)

    processOperations(operations_todo)
    print("\n\nCompleting calculations...\n")
    print("Completed Node List:\n",nodelist,"\n\n")
    print("Results\n",results)

#Params =  string: type of operation, inputs: list of input node names 
#Returns = result dict         
def do_operation(string, inputs):
    result = {}  
    if string == "addition":
        #use add method
        result["abc"] = 123
        result["def"] = 456
        pass
    if string == "subtraction":
        #use minus method
        pass
    if string == "multiplication":
        #use multiply method
        pass
    if string == "division":
        #use division method
        pass  
    return result

def processOperations(operationslist):
    for edge in edges:
        if edge in operations_todo:
            answer = do_operation(operations_todo[edge],edges[edge])
            newnode = {
                    'id': edge,
                    'data': answer
                    }
            nodelist.append(newnode)
        elif edge in results:
            if(len(edges[edge])== 1):
                key = edges[edge][0]
            for node in nodelist:
                currID = node['id']
                if currID == key:
                    data = node['data']
                    results[edge] = data



if __name__ == '__main__':
    # for i in example_json_data:
    #     print(i)
    load_JSON(example_json_data)
    # Closing file
    f.close()
    app.run()
