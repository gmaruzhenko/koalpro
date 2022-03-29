# Test script to automatically run the test cases using the JSON files in the folder "..\tests\test_cases"

from distutils.command.config import config
from urllib import response
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