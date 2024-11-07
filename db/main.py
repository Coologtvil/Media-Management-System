# TODO execute sql script from py
from SQLDB import SQLiteDB
from datetime import datetime
op = SQLiteDB('main.db')

def add_user(name,mail,pswd):
    op.execute_query('INSERT INTO "user" (Name,email,password,created_at) VALUES (?,?,?,?)',(name,mail,pswd,datetime.now()))
   
add_user('Shravan','xyz@mail.com','hello@123')

users = op.fetch_query("SELECT * FROM user")
print(users)
op.close()
