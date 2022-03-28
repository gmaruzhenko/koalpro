import numpy as np
import pandas as pd

data = np.random.randint(100,50000,size=(499,1))
df = pd.DataFrame(data, columns=['Number of Sticks Sold'])
csv_name ="../../resources/Region 2 Alberta Current purchased sticks.csv"
df_old = pd.read_csv(csv_name)
df_old['Number of Sticks Sold'] = df['Number of Sticks Sold']
df_old.to_csv(csv_name)
print(csv_name+"  written up")

data = np.random.randint(100,90090,size=(499,1))
df = pd.DataFrame(data, columns=['Number of Sticks Sold'])
csv_name ="../../resources/Region 1 British Columbia Current purchased sticks.csv"
df_old = pd.read_csv(csv_name)
df_old['Number of Sticks Sold'] = df['Number of Sticks Sold']
df_old.to_csv(csv_name)
print(csv_name+"  written up")

data = np.random.randint(1000,999999,size=(499,1))
df = pd.DataFrame(data, columns=['Budget Stick Sales'])
csv_name ="../../resources/Worldwide Current purchased sticks.csv"
df_old = pd.read_csv(csv_name)
df_old['Budget Stick Sales'] = df['Budget Stick Sales']
df_old.to_csv(csv_name)
print(csv_name+"  written up")