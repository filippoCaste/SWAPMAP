import sqlite3
import json 

def get_all_topics():
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM topics"
        cursor.execute(query)
        result = cursor.fetchall()
        field_names = [description[0] for description in cursor.description]
        if result:
            topics = [dict(zip(field_names, row)) for row in result]
            return json.dumps(topics)
        else:
            return None

    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()

def get_user_topics(user_id):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM \"users-topics\" WHERE id_user = ?"
        cursor.execute(query, (user_id, ))
        result = cursor.fetchall()
        field_names = [description[0] for description in cursor.description]
        if result:
            topics = [dict(zip(field_names, row)) for row in result]
            return json.dumps(topics)
        else:
            return None

    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()
