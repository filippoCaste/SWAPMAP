import sqlite3
import json 
from models.user import User

def get_all_users():
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM users"
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except sqlite3.Error as e:
        # handle properly the error return
        print(f"SQLite error: {e}")
    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

def get_user_by_user_id(user_id):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM users WHERE id = ?"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        field_names = [description[0] for description in cursor.description]
        if result:
            user = dict(zip(field_names, result))
            return json.dumps(user)
        else:
            return None
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()
