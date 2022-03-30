# Test script to automatically run the test cases using the JSON files in the folder "..\tests\test_cases"

from distutils.command.config import config
from urllib import response
from flask import Flask, render_template, jsonify, request
import ast, json, requests
from types import SimpleNamespace
import os
import requests
import json


def test_get_config():                  
    # First testing GET request at the '/config' endpoint
    url = 'http://127.0.0.1:5000/config'
    resp = requests.get(url)
    assert resp.status_code == 200


def test_post_config():
    directory = 'expected_outcomes'
    url = 'http://127.0.0.1:5000/config'
    url_data = 'http://127.0.0.1:5000/data'
    
    # iterate over files in expected_outcomes and storing their content them in a dictionary 
    test_expected_outcomes = {}
    for expected_outcomes in os.listdir(directory):
        f = os.path.join(directory, expected_outcomes )
        # checking if it is a file
        if os.path.isfile(f):
            print(f)
            file=open(f, "r")
            # returns JSON object as
            # a dictionary
            
            index = os.path.splitext(os.path.basename(expected_outcomes))[0] +".json"
            test_expected_outcomes[index] = json.load(file)
            
            # Iterating through the json
            # list
            #print(test_expected_outcomes.get(index))
            
    # Now iterating over files in test_cases, sending the content of each file as a request to the backend, 
    # and checking if the response matches the corresponding expected outcome in store in the dictionary above

    directory = 'test_cases'

    for test_case in os.listdir(directory):
        f = os.path.join(directory, test_case)
        # checking if it is a file
        if os.path.isfile(f):
            print(f)
            # returns JSON object as
            # a dictionary
            file=open(f, "r")
            #print(file)
            json_string = json.load(file)
            test_data = json_string
            #print(test_data)
            
            index = os.path.splitext(os.path.basename(test_case))[0] +"_outcome.json"
            #print(index)
            outcome = test_expected_outcomes.get(index)
            #print(data)
            #print(outcome)
    
            # convert dict to json string by json.dumps() for body data. 
            resp_config = requests.post(url,  json=test_data)       
            #print(resp.json())
            # Validate response headers and body contents, e.g. status code.
            assert resp_config.status_code == 200
            resp_body = resp_config.json()

            resp_data = requests.get(url) 

            #print(resp_body)
            #assert resp_body['url'] == url
            resp_data = requests.get(url_data) 
            # print response full body as text
            print(resp_data.text)
            print("\n \n")
            
            #print(outcome)
            print("\n \n")
            assert resp_data.json() == outcome

