from flask import abort

from services.topics_service import get_all_topics as get_all_topics_service
from services.topics_service import get_user_topics as get_user_topics_service

def get_all_topics():
    topics = get_all_topics_service()
    if(topics is None):
        abort(404, "Topics not found")
    else:
        return topics
    
def get_user_topics(user_id):
    topics = get_user_topics_service(user_id)
    return topics
