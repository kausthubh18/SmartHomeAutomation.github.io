<?php
header('Content-Type: application/json');

// Simulated anomalies
$anomalies = [
    ['timestamp' => '2024-09-22 10:00', 'temperature' => 35],
    ['timestamp' => '2024-09-22 10:05', 'temperature' => 28],
];

echo json_encode(['anomalies' => $anomalies]); // No closing tag
