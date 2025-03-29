import pickle
import pandas as pd

# Load the trained model
with open("ip_valuation_model.pkl", "rb") as file:
    model = pickle.load(file)

# Accept input dynamically
text_length = int(input("Enter text length: "))
num_keywords = int(input("Enter number of keywords: "))
citation_counts = int(input("Enter citation counts: "))
category = input("Enter category (Copyright, Patent, Trademark): ")

# Create a DataFrame for the input
new_data = pd.DataFrame({
    "text_length": [text_length],
    "num_keywords": [num_keywords],
    "citation_counts": [citation_counts],
    "category": [category]
})

# Convert categorical feature "category" into one-hot encoding
new_data = pd.get_dummies(new_data)

# Ensure column alignment with training data
expected_columns = ['text_length', 'num_keywords', 'citation_counts', 'category_Copyright', 'category_Patent', 'category_Trademark']
for col in expected_columns:
    if col not in new_data.columns:
        new_data[col] = 0  # Add missing columns with 0 values

# Reorder columns to match model training order
new_data = new_data[expected_columns]

# Predict price
predicted_price = model.predict(new_data)
print(f"Predicted Price: ${predicted_price[0]:.2f}")
