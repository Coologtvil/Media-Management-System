# TODO execute sql script from py
from SQLDB import SQLiteDB
from datetime import datetime
import sys
import json

op = SQLiteDB('./db/main.db')

def add_user(name,mail,pswd):
    op.execute_query('INSERT INTO "user" (Name,email,password,created_at) VALUES (?,?,?,?)',(name,mail,pswd,datetime.now()))
   
if __name__ == "__main__":
    # Receive command-line input from Node.js
    command = sys.argv[1]
    if command == "fetch":
        media_items = op.fetch_media_items()
        keys = ("id","name","type","path")
        media_items_dict = [
                    dict(zip(keys,values))
                    for values in media_items
                ]
        print(json.dumps((media_items_dict)))  # Output JSON to Node.js

