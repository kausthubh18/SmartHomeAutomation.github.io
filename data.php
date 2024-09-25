<?php
header('Content-Type: application/json');

// Simulate sensor data
$sensorData = [
    'temperature' => rand(20, 30),
    'humidity' => rand(40, 70),
    'current' => rand(0, 10) / 10,
];

echo json_encode($sensorData); // No closing tag
