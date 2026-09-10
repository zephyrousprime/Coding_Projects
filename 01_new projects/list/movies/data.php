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

require_login_json();
$uid = current_user_id();

$stmt = $conn->prepare('SELECT * FROM movies WHERE user_id = ? ORDER BY title ASC');
$stmt->bind_param('i', $uid);
$stmt->execute();
$result = $stmt->get_result();

$rows = [];
while ($row = $result->fetch_assoc()) {
    $row['id']       = (int) $row['id'];
    $row['year']     = $row['year']  !== null ? (int) $row['year']  : null;
    $row['watched']  = (int) $row['watched'];
    $row['rating']   = $row['rating'] !== null ? (int) $row['rating'] : null;
    unset($row['user_id']);
    $rows[] = $row;
}

$conn->close();
echo json_encode($rows, JSON_PRETTY_PRINT);
?>
