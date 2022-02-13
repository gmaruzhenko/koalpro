# How to access endpoints of  Flask API via console
## /data  
View currently computed data

`curl http://127.0.0.1:5000/data`

## /config 

 Send up new no-code config 
 

`curl -X POST http://127.0.0.1:5000/config -d "{\"Id\": 78912, \"Quantity\": 1, \"Price\": 19.00}"`

View currently used no-code config 

`curl http://127.0.0.1:5000/config`

