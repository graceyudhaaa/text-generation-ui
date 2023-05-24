import json
import numpy as np
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from tensorflow import keras

from .utils import generate_text

api = Blueprint(
    "api", __name__, template_folder="templates", static_folder="static"
)

@api.route('/api/test')
@cross_origin()
def api_test():
    return jsonify('hello world')

@api.route('/api/generate', methods=['POST'])
@cross_origin()
def generate():
    model_name = "ceritarakyat_lstm.h5"
    model_path = f"app/app/models/{model_name}"

    model = keras.models.load_model(model_path)

    data = request.json                         # get data from request

    start_string = data['start_text']
    num_generate = int(data['num_generate'])                
    temperature = float(data['temperature'])                

    generated_text = generate_text(model, start_string=start_string, num_generate=num_generate, temperature=temperature)

    res = {
        'generated_text': generated_text
    }

    return jsonify(res)