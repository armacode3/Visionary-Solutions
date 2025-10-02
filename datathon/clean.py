import pandas as pd

orders_file = 'orders.csv'
inv_file = 'inventory_forecasts.csv'
dict_file = 'data_dictionary.csv'

df_orders = pd.read_csv(orders_file)
df_inv = pd.read_csv(inv_file)
df_dict = pd.read_csv(dict_file)

df_orders.info()
df_inv.info()
df_dict.info()

for col in df_orders.columns:
  
  print(df_orders.at[row, col])