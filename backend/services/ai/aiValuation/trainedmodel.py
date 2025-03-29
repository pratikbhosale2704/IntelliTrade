import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
import pickle

# Load the dataset from CSV
df = pd.read_csv("your_dataset.csv")

# Define Features (drop text columns)
X = df.drop(columns=["raw_description", "cleaned_description", "price"])
y = df["price"]

# Feature scaling
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Save the trained model and scaler
model_path = "ip_valuation_model.pkl"
scaler_path = "scaler.pkl"
with open(model_path, "wb") as model_file, open(scaler_path, "wb") as scaler_file:
    pickle.dump(model, model_file)
    pickle.dump(scaler, scaler_file)
print(f"Model saved as {model_path}")
print(f"Scaler saved as {scaler_path}")
