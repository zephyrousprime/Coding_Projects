<?php
require_once 'connection.php';
require_once 'auth.php';

require_login_json();
$uid = current_user_id();

$id = $_POST['id'] ?? '';
if (!ctype_digit($id)) {
    http_response_code(400);
    echo 'Error: Invalid id';
    exit;
}

$stmt = $conn->prepare('DELETE FROM shows WHERE id = ? AND user_id = ?');
if (!$stmt) {
    http_response_code(500);
    echo 'Error: ' . $conn->error;
    exit;
}

$stmt->bind_param('ii', $id, $uid);
if (!$stmt->execute()) {
    http_response_code(500);
    echo 'Error: ' . $stmt->error;
    exit;
}

echo 'OK';
$stmt->close();
$conn->close();
?>
