from flask import Blueprint, request
from controllers.questionnaire_controller import get_questionnaire_by_topic_id
from controllers.questionnaire_controller import post_experience_user
from controllers.questionnaire_controller import post_user_topic

questionnaire_routes = Blueprint('questionnaire_routes', __name__)

@questionnaire_routes.route('/api/questionnaire/<topic_id>', methods=['GET'])
def api_get_questionnaire_by_topic_id(topic_id):
    questionnaire = get_questionnaire_by_topic_id(topic_id)
    return questionnaire

@questionnaire_routes.route('/api/questionnaire/<user_id>', methods=['POST'])
def api_add_experience(user_id):
    experience = request.json.get('experience')
    topicId = request.json.get('topicId')
    newExperience = post_experience_user(user_id,experience)
    user_topic = post_user_topic(user_id,topicId)
    return newExperience