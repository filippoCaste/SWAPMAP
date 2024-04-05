# routes/event_route.py

from flask import Blueprint, request
from controllers.event_controller import get_all_events, get_event_by_id, join_event, create_event

event_routes = Blueprint('event_routes', __name__)

@event_routes.route('/api/events', methods=['GET'])
def api_get_all_events():
    events = get_all_events()
    return events

@event_routes.route('/api/events/<event_id>', methods=['GET'])
def api_get_event_by_id(event_id):
    event = get_event_by_id(event_id)
    return event

@event_routes.route('/api/events/<event_id>/join/<user_id>', methods=['POST'])
def api_join_event(user_id, event_id):
    if(join_event(user_id, event_id)):
        return "OK"
    else:
        return "KO"

@event_routes.route('/api/events/create/<user_id>', methods=['POST'])
def api_create_event(user_id):
    return (create_event(user_id, request.json))
    

