<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if temperature, humidity, and current data are received
    if (isset($_POST['temperature']) && isset($_POST['humidity']) && isset($_POST['current'])) {
        // Sanitize the input to prevent XSS attacks
        $_SESSION['temperature'] = htmlspecialchars($_POST['temperature']);
        $_SESSION['humidity'] = htmlspecialchars($_POST['humidity']);
        $_SESSION['current'] = htmlspecialchars($_POST['current']);
        
        // Return a success message with the received data
        echo json_encode([
            "message" => "Data received successfully.",
            "data" => [
                "temperature" => $_SESSION['temperature'],
                "humidity" => $_SESSION['humidity'],
                "current" => $_SESSION['current']
            ]
        ]);
    } else {
        // Handle missing data
        echo json_encode(["error" => "Temperature, Humidity, or Current data not received."]);
    }
} // No closing tag
