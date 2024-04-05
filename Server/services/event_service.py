import sqlite3
import json
from models.event import Event, EventEncoder

def get_all_events():
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM events WHERE status = ?"
        cursor.execute(query, ('approved',))
        results = cursor.fetchall()
        events = [Event(*result) for result in results]
        return json.dumps(events, cls=EventEncoder)
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()


def get_event_by_id(event_id):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = """
        SELECT ae.id_event, e.Description as eventDescription, ae.Description as activityDescription, ae.TITLE as activityTitle, a.Title as categoryTitle
        FROM `activities-events` ae
        INNER JOIN activities a ON a.id = ae.id_category
        INNER JOIN events e ON e.id = ae.id_event
        WHERE ae.id_event = ?
        """
        cursor.execute(query, (event_id,))
        result = cursor.fetchall()
        field_names = [description[0] for description in cursor.description]
        if result:
            eventDetails = [dict(zip(field_names, row)) for row in result]
            return json.dumps(eventDetails)
        else:
            return None
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()


def get_events_by_user_id(user_id): 
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT e.id, e.user_id, e.title, e.description, e.location, e.date, e.startTime, e.level, e.status FROM events e, `users-events` ue WHERE e.id = ue.id_event AND ue.id_user = ?"
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        events = [Event(*result) for result in results]
        return json.dumps(events, cls=EventEncoder)
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()

def get_createdEvents_by_user_id(user_id): 
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "SELECT e.id, e.user_id, e.title, e.description, e.location, e.date, e.startTime, e.level, e.status FROM events e WHERE e.user_id = ?"
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        events = [Event(*result) for result in results]
        return json.dumps(events, cls=EventEncoder)
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()



def join_event(user_id, event_id):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "INSERT INTO `users-events` (id_user, id_event) VALUES (?, ?)"
        cursor.execute(query, (user_id, event_id))
        connection.commit()
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()

def create_event(user_id, eventData):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "INSERT INTO `events` (user_id, Title, Description, Location, Date, StartTime, Level, Status) VALUES (?, ?,?,?,?,?,?,'pending')"
        cursor.execute(query, (user_id, eventData['name'], eventData['desc'], eventData['location'], eventData['date'],eventData['hour'],eventData['minLevel']))
        connection.commit()
        last_id = cursor.lastrowid
        return json.dumps(last_id)
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()


def create_activities(eventId,activityData):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = "INSERT INTO `activities-events` (id_event, id_category, Description, TITLE) VALUES (?, ?,?,?)"
        cursor.execute(query, (eventId, activityData['code'], activityData['desc'], activityData['title']))
        connection.commit()
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()
