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
$id = (int) $id;

$allowed = ['watched', 'rating', 'reason', 'notes', 'link', 'year', 'genre'];
$field   = $_POST['field'] ?? '';
$value   = $_POST['value'] ?? '';

if (!in_array($field, $allowed, true)) {
    http_response_code(400);
    echo 'Error: Invalid field';
    exit;
}

if ($field === 'rating' || $field === 'year') {
    if ($value === '' || $value === 'null') {
        $value = null;
    } else {
        $value = (int) $value;
    }
}

$sql = "UPDATE shows SET `$field` = ? WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo 'Error: ' . $conn->error;
    exit;
}

$stmt->bind_param('sii', $value, $id, $uid);
if (!$stmt->execute()) {
    http_response_code(500);
    echo 'Error: ' . $stmt->error;
    exit;
}

echo 'OK';
$stmt->close();
$conn->close();
?>
