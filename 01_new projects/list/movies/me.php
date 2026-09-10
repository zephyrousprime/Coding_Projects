<?php
header('Content-Type: application/json; charset=utf-8');
try {
    require_once 'connection.php';
    require_once 'auth.php';
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

if (!is_logged_in()) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

echo json_encode(['name_id' => current_user_name()]);
?>
