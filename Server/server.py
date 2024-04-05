from flask import Flask,send_from_directory
from flask_cors import CORS
import os

from routes.user_route import user_routes
from routes.event_route import event_routes
from routes.topic_route import topic_routes
from routes.questionnaire_route import questionnaire_routes

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


video_folder = os.path.join(os.path.dirname(__file__),'public')

@app.route('/video/<filename>')
def serve_video(filename):
    return send_from_directory(video_folder,filename)

app.register_blueprint(user_routes)
app.register_blueprint(event_routes)
app.register_blueprint(topic_routes)
app.register_blueprint(questionnaire_routes)

if __name__ == "__main__":
    app.run(host="172.22.16.114", port=5000)
