import sqlite3
from typing import List, Tuple, Any, Optional

class SQLiteDB:
    def __init__(self, db_name: str):
        """Initialize the database connection."""
        self.db_name = db_name
        self.connection = None
        self.cursor = None

    def connect(self):
        """Establish a connection to the SQLite database."""
        if not self.connection:
            self.connection = sqlite3.connect(self.db_name)
            self.cursor = self.connection.cursor()

    def create_db(self):
        try:
            db_schema = open("createdb.sql","r")   
        except:
            print("error opening the schema file")

        if(self.cursor.executescript(db_schema.read())):
            self.cursor.commit()
        else:
            print("Error reading/ executing sql file")
        self.close()

    def execute_query(self, query: str, params: Optional[Tuple[Any, ...]] = None) -> None:
        """
        Execute a single query (INSERT, UPDATE, DELETE) with optional parameters.
        :param query: SQL query to execute.
        :param params: Optional parameters for parameterized queries.
        """
        self.connect()
        if params:
            self.cursor.execute(query, params)
        else:
            self.cursor.execute(query)
        self.connection.commit()

    def fetch_query(self, query: str, params: Optional[Tuple[Any, ...]] = None) -> List[Tuple[Any, ...]]:
        """
        Execute a SELECT query and return all fetched results.
        :param query: SQL SELECT query to execute.
        :param params: Optional parameters for parameterized queries.
        :return: List of rows returned by the query.
        """
        self.connect()
        if params:
            self.cursor.execute(query, params)
        else:
            self.cursor.execute(query)
        return self.cursor.fetchall()

    def close(self):
        """Close the database connection."""
        if self.connection:
            self.cursor.close()
            self.connection.close()
            self.connection = None
            self.cursor = None

