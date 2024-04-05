# models/questionnaire.py
import json

class Questionnaire:
    def __init__(self, idTopic, id, questionText, answer1, answer2, answer3, answer4):
        #NON METTETE LE VIRGOLE QUI ALTRIMENTI PYTHON RICONOSCE OGNI CAMPO DI QUESTIONNAIRE COME UNA TUPLA E NON COME SINGOLO VALORE!!
        self.idTopic = idTopic
        self.id = id
        self.questionText = questionText
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3
        self.answer4 = answer4

class QuestionnaireEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Questionnaire):
            questionnaire_dict = {
                "idTopic": obj.idTopic,
                "id": obj.id,
                "questionText": obj.questionText,
                "answer1": obj.answer1,
                "answer2": obj.answer2,
                "answer3": obj.answer3,
                "answer4": obj.answer4
            }
            return questionnaire_dict
        return super().default(obj)
