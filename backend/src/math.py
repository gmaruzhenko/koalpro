



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






def handleMath(dict1, dict2, operation):
    # add
    if operation == 0:
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
        print(resDict)

    # subtract
    if operation == 1:
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
        print(resDict)


    #multiply
    if operation == 2:
        resDict = {}
        for key in dict1:
            if key in dict2:
                resDict[key] = dict1[key]*dict2[key]
            else:
                resDict[key] = dict1[key]
                pass
        for key2 in dict2:
            if key2 not in resDict:
                resDict[key2] = dict2[key2]
        print(resDict)


    #divide
    if operation == 3:
        resDict = {}
        for key in dict1:
            if key in dict2:
                resDict[key] = dict1[key]//dict2[key]
            else:
                resDict[key] = dict1[key]
                pass
        for key2 in dict2:
            if key2 not in resDict:
                resDict[key2] = dict2[key2]
        print(resDict)



handleMath(company1, company2, 3)

