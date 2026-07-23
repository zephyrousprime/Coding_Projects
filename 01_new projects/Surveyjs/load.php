<?php
require_once 'connection.php';

header('Content-Type: application/json');

$result = $conn->query('SELECT * FROM survey_responses ORDER BY submitted_at DESC');

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => $conn->error]);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

$conn->close();

echo json_encode($rows);
