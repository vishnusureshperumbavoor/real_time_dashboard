from flask import Flask, jsonify
from flask_cors import CORS  
import random
import time

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Function to generate random temperature data
def generate_temperature():
    temperature = round(random.uniform(20, 30), 2)  # Random temperature between 20 and 30
    return temperature

# Endpoint to fetch temperature data
@app.route("/get-temperature")
def get_temperature():
    temperature = generate_temperature()
    return jsonify({"temperature": temperature})

# Function to generate random temperature data
def generate_moisture():
    moisture = round(random.uniform(20, 30), 2)  # Random moisture between 20 and 30
    return moisture

# Endpoint to fetch temperature data
@app.route("/get-moisture")
def get_moisture():
    moisture = generate_moisture()
    return jsonify({"moisture": moisture})

# Function to generate random humidity data
def generate_humidity():
    humidity = round(random.uniform(40, 60), 2)  # Random humidity between 40 and 60
    return humidity

# Endpoint to fetch humidity data
@app.route("/get-humidity")
def get_humidity():
    humidity = generate_humidity()
    return jsonify({"humidity": humidity})

if __name__ == "__main__":
    app.run(debug=True)
