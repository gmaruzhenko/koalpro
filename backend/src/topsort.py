# Python program to print topological sorting of a DAG
from collections import defaultdict
 
# Class to represent a graph
 
 
class Graph:
    def __init__(self, vertices):
        self.graph = defaultdict(list) # dictionary containing adjacency List
        self.V = vertices # No. of vertices
 
    # function to add an edge to graph
    def addEdge(self, u, v):
        self.graph[u].append(v)
 
 
    # The function to do Topological Sort.
    def topologicalSort(self):
         
        # Create a vector to store indegrees of all
        # vertices. Initialize all indegrees as 0.
        in_degree = [0]*(self.V)
         
        # Traverse adjacency lists to fill indegrees of
           # vertices.  This step takes O(V + E) time
        for i in self.graph:
            for j in self.graph[i]:
                in_degree[j] += 1
 
        # Create an queue and enqueue all vertices with
        # indegree 0
        queue = []
        for i in range(self.V):
            if in_degree[i] == 0:
                queue.append(i)
 
        # Initialize count of visited vertices
        cnt = 0
 
        # Create a vector to store result (A topological
        # ordering of the vertices)
        top_order = []
 
        # One by one dequeue vertices from queue and enqueue
        # adjacents if indegree of adjacent becomes 0
        while queue:
 
            # Extract front of queue (or perform dequeue)
            # and add it to topological order
            u = queue.pop(0)
            top_order.append(u)
 
            # Iterate through all neighbouring nodes
            # of dequeued node u and decrease their in-degree
            # by 1
            for i in self.graph[u]:
                in_degree[i] -= 1
                # If in-degree becomes zero, add it to queue
                if in_degree[i] == 0:
                    queue.append(i)
 
            cnt += 1
 
        # Check if there was a cycle
        if cnt != self.V:
            print ("There exists a cycle in the graph")
        else :
            # Print topological order
            # print(top_order)
            return (top_order)

#Function makes a graph, adds the edges
#Returns the Graph and the lookup dictionary that maps the string node ids to the integer id
def make_graph(dict,lookup_dict):
    #lookup dict to convert nodeid strings to ints
    #  Key: Int node number, Value: string name
    lookup_dict = make_lookup_dict(dict,lookup_dict)
    g = Graph(len(lookup_dict))

    for key in dict:
        value = dict[key]
        if len(value) == 1:
            g.addEdge(lookup_num(dict[key][0],lookup_dict),lookup_num(key,lookup_dict)) #addEdge(source, destination)
            print("Source",dict[key][0], "Destination", key) 
        else:
            #seperate the source edges list with the same destination
            g.addEdge(lookup_num(dict[key][0],lookup_dict),lookup_num(key,lookup_dict))
            print("Source",dict[key][0], "Destination", key) 
            g.addEdge(lookup_num(dict[key][1],lookup_dict),lookup_num(key,lookup_dict))
            print("Source",dict[key][1], "Destination", key) 
    return g

def process_edges(topsortedlist, edgedict, lookup_dict):
    newdict = {}
    #keys = list(edgedict)
    for index in topsortedlist:
        currkey = lookup_id(index, lookup_dict)
        if currkey not in newdict and currkey in edgedict:
            newdict[currkey]= edgedict[currkey]
        else:
            pass
    return newdict

def make_lookup_dict(edgedict, lookup_dict):
    nodeset = set()
    for key in edgedict:
        value = edgedict[key]
        if key not in nodeset:
            nodeset.add(key)
        for val in value:
            if val not in nodeset:
                nodeset.add(val) 
    i = 0
    for node in nodeset:
        lookup_dict[i] = node
        i +=1
    print("LOOKUP DICT", lookup_dict)
    return lookup_dict

def lookup_num(string, lookup_dict):
    for key in lookup_dict:
        if lookup_dict[key] == string:
            return key

def lookup_id(int,lookup_dict):
    return lookup_dict[int]

