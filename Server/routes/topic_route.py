from flask import Blueprint
from controllers.topics_controller import get_all_topics
from controllers.topics_controller import get_user_topics

topic_routes = Blueprint('topic_routes', __name__)

@topic_routes.route('/api/topics', methods=['GET'])
def api_get_all_topics():
    topics = get_all_topics()
    return topics

@topic_routes.route('/api/topics/<user_id>', methods=['GET'])
def api_get_user_topics(user_id):
    topics = get_user_topics(user_id)
    return topics