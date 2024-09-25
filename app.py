from flask import Flask, jsonify, render_template, request
import datetime

app = Flask(__name__)

# Dummy data storage for demonstration purposes
device_states = {'light': False, 'fan': False}
scheduled_tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    # Fixed dummy data for testing
    temperature = 25.5  # Fixed temperature in °C
    humidity = 60.0     # Fixed humidity in %
    current = 5.0       # Fixed current in A
    prediction = "No Rain"  # Fixed prediction
    ai_prediction = "No significant weather changes"  # Example AI prediction

    return jsonify({
        'temperature': temperature,
        'humidity': humidity,
        'current': current,
        'prediction': prediction,
        'aiPrediction': ai_prediction
    })

@app.route('/historical_data')
def historical_data():
    # Replace with your actual data retrieval logic
    data = [
        {'timestamp': '2023-09-21 10:00', 'temperature': 24.5, 'humidity': 55},
        {'timestamp': '2023-09-21 11:00', 'temperature': 25.0, 'humidity': 60},
        # More entries...
    ]
    return jsonify(data)

@app.route('/toggle_device')
def toggle_device():
    device = request.args.get('device')
    if device in device_states:
        device_states[device] = not device_states[device]
        return jsonify({'status': 'success', 'device': device, 'state': device_states[device]})
    return jsonify({'status': 'error', 'message': 'Device not found.'})

@app.route('/set_fan_speed')
def set_fan_speed():
    speed = request.args.get('speed')
    # Implement fan speed logic here (store in a variable or control a device)
    return jsonify({'status': 'success', 'speed': speed})

@app.route('/schedule_device')
def schedule_device():
    schedule_time = request.args.get('scheduleTime')
    scheduled_tasks.append(schedule_time)
    return jsonify({'status': 'success', 'scheduledTime': schedule_time})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
