# routes/user_route.py

from flask import Blueprint, jsonify
from controllers.user_controller import get_all_users, get_user_by_user_id, get_events_by_user_id, get_createdEvents_by_user_id

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/api/users', methods=['GET'])
def api_get_all_users():
    users = get_all_users()
    return jsonify(users)

@user_routes.route('/api/users/<user_id>', methods=['GET'])
def api_get_user_by_user_id(user_id):
    user = get_user_by_user_id(user_id)
    return user

@user_routes.route('/api/users/<user_id>/events', methods=["GET"])
def api_get_events_by_user_id(user_id):
    events = get_events_by_user_id(user_id)
    return events

@user_routes.route('/api/users/<user_id>/createdEvents', methods=["GET"])
def api_get_createdEvents_by_user_id(user_id):
    events = get_createdEvents_by_user_id(user_id)
    return events