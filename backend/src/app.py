from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast

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

if __name__ == '__main__':
    app.run()
