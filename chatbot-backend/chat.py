import random
# import pyttsx3
import pickle
from colorama import Fore, Style, Back
import json
import numpy as np
from tensorflow import keras
# import tensorflow_hub as th
from sklearn.preprocessing import LabelEncoder
# import speech_recognition as sr

import colorama
colorama.init()

# engine = pyttsx3.init('sapi5')
# voices = engine.getProperty('voices')
# engine.setProperty('voice', voices[0].id)


# def speak(audio):
#     engine.say(audio)
#     engine.runAndWait()


with open("intents.json") as file:
    data = json.load(file)


# def takecommand():
#     r = sr.Recognizer()
#     with sr.Microphone() as source:
#         print("Listening...")
#         r.pause_threshold = 0.5
#         audio = r.listen(source)
#         query = r.recognize_google(audio, language="en-IN")

#     try:
#         print("Recognizing....")
#         query = r.recognize_google(audio, language="en-IN")
#         print(f"user said: {query}\n")

#     except Exception as e:
#         # print(e)
#         print("say that again please...")
#         return "None"
#     return query


def chat():
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
        print(Fore.LIGHTBLUE_EX + "User: " + Style.RESET_ALL, end="")
        inp = input()
        if inp.lower() == "quit":
            print("signing off sir! have a nice day")
            break
        result = model.predict(keras.preprocessing.sequence.pad_sequences(tokenizer.texts_to_sequences([inp]),
                                                                          truncating='post', maxlen=max_len))
        tag = lbl_encoder.inverse_transform([np.argmax(result)])

        for i in data['intents']:
            if i['tag'] == tag:
                b = Style.RESET_ALL
                a = np.random.choice(i['responses'])
                print(Fore.GREEN+"chatbot:"+b)
                print(f"{a}")
                # speak(f"{a}")
                # speak(f"chatbot: {a}")

        # print(Fore.GREEN + "ChatBot:" + Style.RESET_ALL,random.choice(responses))


# print(Fore.YELLOW + "Start messaging with the bot (type quit to stop)!" + Style.RESET_ALL)
# if __name__ == '__main__':
chat()
