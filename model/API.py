from flask import Flask, request, jsonify
import pickle
import numpy as np
from tensorflow import keras
import json
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

with open("intents.json") as file:
    data = json.load(file)


app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:3000"])

@app.route('/chatbot', methods=['post'])
def chat():
    userData = request.get_json()
    inp = userData['user_input']
    # load trained model
    model = keras.models.load_model('chat_model')

    # load tokenizer object
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # load label encoder object
    with open('label_encoder.pickle', 'rb') as enc:
        lbl_encoder = pickle.load(enc)

    # parameters
    max_len = 20

    while True:
        # print(Fore.LIGHTBLUE_EX + "User: " + Style.RESET_ALL, end="")
        # inp = input()
        result = model.predict(keras.preprocessing.sequence.pad_sequences(tokenizer.texts_to_sequences([inp]),
                                                                          truncating='post', maxlen=max_len))
        tag = lbl_encoder.inverse_transform([np.argmax(result)])

        for i in data['intents']:
            if i['tag'] == tag:
                a = np.random.choice(i['responses'])
                return jsonify({'response': a})


if __name__ == '__main__':
    app.run(debug=True)
