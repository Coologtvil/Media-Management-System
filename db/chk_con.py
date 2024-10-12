import sqlite3 as mdb

def chk_conn(conn):
     try:
        conn.cursor()
        return True
     except Exception as ex:
        return False

myconn = mdb.connect('main.db')
print(chk_conn(myconn))
