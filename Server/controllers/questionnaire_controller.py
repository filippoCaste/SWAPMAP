# controllers/questionnaire_controller.py

from flask import abort

from services.questionnaire_service import get_questionnaire_by_topic_id as service_get_questionnaire_by_topic_id
from services.questionnaire_service import post_experience_user as service_post_experience_user
from services.questionnaire_service import post_user_topic as service_post_user_topic

def get_questionnaire_by_topic_id(topic_id):
    questionnaire = service_get_questionnaire_by_topic_id(topic_id)
    if(questionnaire is None):
        return None
    else:
        return questionnaire
    
def post_experience_user(user_id, experience):
    userExperience = service_post_experience_user(user_id, experience)
    return userExperience

def post_user_topic(user_id, topic_id):
    user_topic = service_post_user_topic(user_id, topic_id)
    return True