
import pandas as pd

data = {
            "label": "csv_data_import node",
            "csv_name": "dummy.csv",
            "column_keys": "Company Name",
            "column_values": "Sales"
        }

company1 = {
    "salesforce": 30000,
    "microsoft": 50000,
    "google": 40000
}

company2 = {
    "salesforce": 10000,
    "microsoft": 40000,
    "google": 20000,
    "tesla": 4000
}

def addition(dict1, dict2):
    resDict = {}
    for key in dict1:
        if key in dict2:
            resDict[key] = dict1[key] + dict2[key]
        else:
            resDict[key] = dict1[key]
            pass
    for key2 in dict2:
        if key2 not in resDict:
            resDict[key2] = dict2[key2]
    #print(resDict)
    return resDict

def subtraction(dict1, dict2):
    resDict = {}
    for key in dict1:
        if key in dict2:
            resDict[key] = abs(dict1[key] - dict2[key])
        else:
            resDict[key] = dict1[key]
            pass
    for key2 in dict2:
        if key2 not in resDict:
            resDict[key2] = dict2[key2]
    #print(resDict)
    return resDict

def multiplication(dict1, dict2):
    resDict = {}
    for key in dict1:
        if key in dict2:
            resDict[key] = dict1[key] * dict2[key]
        else:
            resDict[key] = dict1[key]
            pass
    for key2 in dict2:
        if key2 not in resDict:
            resDict[key2] = dict2[key2]
    #print(resDict)
    return resDict

def division(dict1, dict2):
    resDict = {}
    for key in dict1:
        if key in dict2:
            resDict[key] = dict1[key] // dict2[key]
        else:
            resDict[key] = dict1[key]
            pass
    for key2 in dict2:
        if key2 not in resDict:
            resDict[key2] = dict2[key2]
    #print(resDict)
    return resDict

def discount(dict1,discount_decimal):
    resDict = {}
    for key in dict1:
        resDict[key] = dict1[key] * discount_decimal
    return resDict
    
# takes "data" and loads the CSV.
def load_csv(data):
    path = data["csv_name"]
    keysColumn = data["column_keys"]
    valuesColumn = data["column_values"]
    df = pd.read_csv(path)
    df[valuesColumn] = df[valuesColumn].fillna(0)
    df[valuesColumn] = df[valuesColumn].astype(str).str.replace(",", "").astype(float)
    keys = df[keysColumn]
    values = df[valuesColumn]

    res = {}
    for i in range(len(keys)):
        res[keys[i]] = float(values[i])

    #print(res)
    return res

def load_initial(path):
    return pd.read_csv(path)
