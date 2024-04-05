# controllers/user_controller.py

from models.user import User
from services.event_service import get_events_by_user_id as service_get_events_by_user_id
from services.event_service import get_createdEvents_by_user_id as service_get_createdEvents_by_user_id
from services.user_service import get_all_users as service_get_all_users
from services.user_service import get_user_by_user_id as service_get_user_by_user_id

def get_all_users():
    return service_get_all_users()

def get_user_by_user_id(userId):
    user = service_get_user_by_user_id(userId)
    if (user is None):
        return None
    else:
        return user

def get_events_by_user_id(user_id):
    events = service_get_events_by_user_id(user_id)
    return events

def get_createdEvents_by_user_id(user_id):
    events = service_get_createdEvents_by_user_id(user_id)
    return events