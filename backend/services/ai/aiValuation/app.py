from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd  # Import pandas for DataFrame handling
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow CORS for the frontend

# Load trained model and scaler
model = joblib.load("ip_valuation_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict-price", methods=["POST"])
def predict_price():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debugging log

        # Extract fields
        raw_description = data.get("raw_description")
        cleaned_description = data.get("cleaned_description")
        text_length = data.get("text_length")
        num_keywords = data.get("num_keywords")
        citation_counts = data.get("citation_counts", 0)  # Default to 0 if not provided
        category_Copyright = data.get("category_Copyright", 0)  # Default to 0
        category_Patent = data.get("category_Patent", 0)  # Default to 0
        category_Trademark = data.get("category_Trademark", 0)  # Default to 0

        # Validate inputs
        if not raw_description or not isinstance(raw_description, str):
            return jsonify({"error": "Invalid or missing raw_description"}), 400
        if not cleaned_description or not isinstance(cleaned_description, str):
            return jsonify({"error": "Invalid or missing cleaned_description"}), 400
        if not isinstance(text_length, int) or text_length <= 0:
            return jsonify({"error": "Invalid or missing text_length"}), 400
        if not isinstance(num_keywords, int) or num_keywords < 0:
            return jsonify({"error": "Invalid or missing num_keywords"}), 400
        if not isinstance(citation_counts, int) or citation_counts < 0:
            return jsonify({"error": "Invalid citation_counts"}), 400
        if not all(isinstance(i, int) and i in [0, 1] for i in [category_Copyright, category_Patent, category_Trademark]):
            return jsonify({"error": "Invalid category values"}), 400

        # Prepare input for model (match dataset structure)
        input_data = pd.DataFrame([{
            "text_length": text_length,
            "num_keywords": num_keywords,
            "citation_counts": citation_counts,
            "category_Copyright": category_Copyright,
            "category_Patent": category_Patent,
            "category_Trademark": category_Trademark,
        }])

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)

        # Predict price
        predicted_price = model.predict(input_data_scaled)[0]

        return jsonify({
            "description": raw_description,
            "estimated_price": round(float(predicted_price), 2)
        })

    except Exception as e:
        print("Error:", str(e))  # Debugging log
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)