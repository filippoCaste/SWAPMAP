# models/event.py
import json
import json

class Event:
    def __init__(self, id, user_id, title, description, location, date, startTime, level, status):
        #NON METTETE LE VIRGOLE QUI ALTRIMENTI PYTHON RICONOSCE OGNI CAMPO DI EVENT COME UNA TUPLA E NON COME SINGOLO VALORE!!
        self.id = id
        self.user_id = user_id
        self.title = title
        self.description = description
        self.location = location
        self.date = date
        self.startTime = startTime
        self.level = level
        self.status = status

class EventEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Event):
            event_dict = {
                'id': obj.id,
                'user_id': obj.user_id,
                'title': obj.title,
                'description': obj.description,
                'location': obj.location,
                'date': obj.date,
                'startTime': obj.startTime,
                'level': obj.level,
                'status': obj.status
            }
            return event_dict
        return super().default(obj)
