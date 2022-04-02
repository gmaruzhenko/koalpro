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
    directory = '../../testing/expected_outcomes'
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

    case_directory = '../../testing/test_cases'

    for test_case in os.listdir(case_directory):
        f = os.path.join(case_directory, test_case)
        # checking if it is a file
        if os.path.isfile(f):
            print(f)
            # returns JSON object as
            # a dictionary
            file=open(f, "r")
            json_string = json.load(file)
            test_data = json_string
            #print(test_data)
            
            index = os.path.splitext(os.path.basename(test_case))[0] +"_outcome.json"
            outcome = test_expected_outcomes.get(index)

            # hit the config/GET endpoint first:
            #resp_config_get = requests.get(url)
            #assert resp_config_get.status_code == 200, "Problem with the '/config/GET' endpoint"

            # hit the config/POST endpoint 
            resp_config_post = requests.post(url,  json=test_data)    
            assert resp_config_post.status_code == 200, "Problem with the '/config/POST' endpoint"

            # send a request to get the data from /data/GET endpoint
            resp_data = requests.get(url_data)
            assert resp_data.status_code == 200, "Problem with the '/data/GET' endpoint"
            
            # store the response data
            output = resp_data.json()
            # print response full body as text
            print(output)
            print("\n \n")
            
            # print the expected outcome
            print(outcome)
            print("\n \n")
            

            assert (output == outcome), "Response does not match expected outcome."


if __name__ == '__main__':
    test_post_config()

