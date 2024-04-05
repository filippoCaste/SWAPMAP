# controllers/event_controller.py

from flask import jsonify, abort
from models.event import Event
from services.event_service import get_event_by_id as service_get_event_by_id
from services.event_service import get_all_events as service_get_all_events
from services.event_service import join_event as service_join_event
from services.event_service import create_event as service_create_event
from services.event_service import create_activities as service_create_activities
from services.user_service import get_user_by_user_id as service_get_user_by_id

def get_all_events():
    events = service_get_all_events()
    return events

def get_event_by_id(event_id):
    event = service_get_event_by_id(event_id)
    if(event is None):
        return None
    else:
        return event

def join_event(user_id, event_id):
    if(service_get_event_by_id(event_id) is None or service_get_user_by_id(user_id) is None):
        abort(404, "Event or user not found")
    service_join_event(user_id, event_id)
    return True

def create_event(user_id, event_data):
    lastid = service_create_event(user_id,event_data)
    print(lastid)
    #for learningInput in event_data['learningInput']:
     #   if int(learningInput["code"]) < 0 or int(learningInput["code"] > 4) :
      #      return jsonify({'error': 'Dati non validi'}), 400
    for learningInput in event_data['learningInput']:
        service_create_activities(lastid, learningInput)

    return lastid# controllers/event_controller.py
