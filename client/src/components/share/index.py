from flask import Flask, request,render_template
import pandas as pd
import pickle
import numpy as np

import joblib
# Load the trained model and vectorizer
model = joblib.load(open("client/src/components/share/clf.pkl", "rb"))
vectorizer = joblib.load(open("client/src/components/share/cv.pkl", "rb"))
app = Flask(__name__)

@app.route("/")
def home():
    return render_template ("ind.html")
@app.route('/predict',methods=['GET','POST'])
def predict():
    # Get the text input from the API request
    #text = "Bitch Fucker MOtherfucker racist"
    text = str(request.form["text"])


    # Convert the text input to a vector using the trained vectorizer
    vector = vectorizer.transform([text]).toarray()

    # Use the trained model to make a prediction
    prediction = model.predict(vector)
    print(prediction[0])
    # Return the prediction as a JSON response
    # response = {'prediction': prediction}
    if prediction[0]=="Neither":
        return {
            "text":"OK"
        }

    return {
        "text":str(prediction[0])
        }
#render_template("predict.html",pred = "Answer is " + str(prediction[0]),msg=str(text))
if __name__ == "__main__":
    app.run(port=5002, debug=True)