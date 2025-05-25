from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__,static_folder='../frontend')
CORS(app)  # Enable CORS for frontend to call API

@app.route('/')
def serve_home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/designers')
def get_designers():
    # Load designers from the external JSON file
    json_path = os.path.join(os.path.dirname(__file__), 'designers.json')
    with open(json_path, 'r') as file:
        designers = json.load(file)
    return jsonify(designers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
