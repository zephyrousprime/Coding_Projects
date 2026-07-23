<?php
require_once 'connection.php';

header('Content-Type: application/json');

// Read the JSON body sent by SurveyJS
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['responses'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
    exit;
}

$r = $data['responses'];

// Extract fields – coalesce to empty string so the statement never gets null
$first_name      = trim($r['firstName']      ?? '');
$last_name       = trim($r['lastName']       ?? '');
$email           = trim($r['email']          ?? '');
$phone           = trim($r['phone']          ?? '');
$contact_method  = trim($r['contactMethod']  ?? '');
$department      = trim($r['department']     ?? '');
$newsletter      = isset($r['newsletter']) ? (int)$r['newsletter'] : 0;
$satisfaction    = trim($r['satisfaction']   ?? '');
$comments        = trim($r['comments']       ?? '');

// Validate required fields
if ($first_name === '' || $last_name === '' || $email === '' || $contact_method === '') {
    http_response_code(400);
    echo json_encode(['error' => 'All required fields must be filled']);
    exit;
}

// Insert into the database
$stmt = $conn->prepare(
    'INSERT INTO survey_responses
        (first_name, last_name, email, phone, contact_method, department, newsletter, satisfaction, comments)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => $conn->error]);
    exit;
}

$stmt->bind_param(
    'ssssssiss',
    $first_name,
    $last_name,
    $email,
    $phone,
    $contact_method,
    $department,
    $newsletter,
    $satisfaction,
    $comments
);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => $stmt->error]);
    exit;
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
