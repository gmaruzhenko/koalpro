# Starting with virtual environment 
See for further details on OS specific commands https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#activating-a-virtual-environment

###For windows:

create a virtual environment 

`py -m venv env`


load into it

`.\env\Scripts\activate`

cd into src

`py -m pip install -r requirements.txt`

when updating or adding dependencies make sure to update requirements.txt 

`py -m pip freeze > requirements.txt`

# How to access endpoints of  Flask API via console
## /data  
View currently computed data

`curl http://127.0.0.1:5000/data`

## /config 

 Send up new no-code config 
 

`curl -X POST http://127.0.0.1:5000/config -d "{\"Id\": 78912, \"Quantity\": 1, \"Price\": 19.00}"`

View currently used no-code config 

`curl http://127.0.0.1:5000/config`

