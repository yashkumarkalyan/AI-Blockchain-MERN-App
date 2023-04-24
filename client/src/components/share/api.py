# Dependencies
from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
import numpy as np
from flask_cors import CORS

# Your API definition
app = Flask(__name__)
CORS(app)
@app.route('/predict', methods=['POST'])
def predict():
    if lr:
        try:
            json_ = request.json
            print(json_)
            #query = pd.get_dummies(pd.DataFrame(json_))
            #query = query.reindex(columns=model_columns, fill_value=0)
            text = json_[0]["text"]
            vector = cv.transform([text]).toarray()
            prediction = lr.predict(vector)
            if prediction[0]=="Neither":return {"text":"OK"}
            return {"text":str(prediction[0])}
        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 9000 # If you don't provide any port the port will be set to 12345

    lr = joblib.load("clf.pkl") # Load "model.pkl"
    print ('Model loaded')
    cv = joblib.load("cv.pkl") # Load "model_columns.pkl"
    print ('Model columns loaded')

    app.run(port=port, debug=True)