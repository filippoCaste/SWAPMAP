import sqlite3
import json
from models.questionnaire import Questionnaire, QuestionnaireEncoder

def get_questionnaire_by_topic_id(topic_id):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = """
        SELECT q.id_topic as idTopic, q.id, q.question_text as questionText, q.answer_correct as answer1, q.answer2, q.answer3, q.answer4
        FROM `questionnaires` q
        WHERE q.id_topic = ?
        """
        cursor.execute(query, (topic_id,))
        results = cursor.fetchall()
        questionnaire = [Questionnaire(*result) for result in results]
        return json.dumps(questionnaire, cls=QuestionnaireEncoder)
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()

def post_experience_user(user_id, experience):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = """
        UPDATE users SET experience = experience + ? WHERE id = ?
        """
        cursor.execute(query, (experience, user_id))
        connection.commit()

        query2 = "SELECT experience FROM users WHERE id = ?"
        cursor.execute(query2, (user_id,))
        result = cursor.fetchone()
        field_names = [description[0] for description in cursor.description]
        if result:
            experience = dict(zip(field_names, result))
            return json.dumps(experience)
        else:
            return None
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()

def post_user_topic(user_id, topic_id):
    connection = sqlite3.connect('SwapMap.db')
    cursor = connection.cursor()
    try:
        query = """
        INSERT INTO `users-topics` (id_user, id_topic) VALUES (?,?)
        """
        cursor.execute(query, (user_id, topic_id))
        connection.commit()
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        cursor.close()
        connection.close()
