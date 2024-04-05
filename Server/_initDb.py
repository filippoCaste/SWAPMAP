import sqlite3
#from initialData.prova import provaRows
from initialData.activities import activities
from initialData.activitiesEvents import activitiesEvents
from initialData.events import events
from initialData.questionnaires import questionnaires
from initialData.topics import topics
from initialData.usersEvents import usersEvents
from initialData.users import users
from initialData.usersTopics import usersTopics


def deleteCollection(tableName):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = f"DELETE FROM \"{tableName}\";"
        cursor.execute(query)
        connection.commit()
        return 0
    except sqlite3.Error as e:
        # handle properly the error return
        print(f"SQLite error: {e}")
    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

def populateCollection(tableName, jsonData):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        columns = ', '.join(jsonData[0].keys())
        
        query = f"INSERT INTO \"{tableName}\" ({columns}) VALUES {', '.join(['(' + ', '.join(['?']*len(data)) + ')' for data in jsonData])};"
        cursor.execute(query, [value for data in jsonData for value in data.values()])
        connection.commit()
        return 0
    except sqlite3.Error as e:
        # handle properly the error return
        print(f"SQLite error: {e}")
    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

#Delete All
#deleteCollection('Prova')
deleteCollection('activities')
deleteCollection('activities-events')
deleteCollection('events')
deleteCollection('questionnaires')
deleteCollection('topics')
deleteCollection('users')
deleteCollection('users-events')
deleteCollection('users-topics')
        
#Populate all
#populateCollection('Prova', provaRows)
populateCollection('activities', activities)
populateCollection('activities-events', activitiesEvents)
populateCollection('events', events)
populateCollection('questionnaires', questionnaires)
populateCollection('topics', topics)
populateCollection('users', users)
populateCollection('users-events', usersEvents)
populateCollection('users-topics', usersTopics)