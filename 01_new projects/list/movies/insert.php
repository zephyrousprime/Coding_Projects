<?php
require_once 'connection.php';
require_once 'auth.php';

require_login_json();
$uid = current_user_id();

$title  = trim($_POST['title'] ?? '');
$year   = $_POST['year'] ?? '';
$genre  = trim($_POST['genre'] ?? '');
$watched= isset($_POST['watched']) && $_POST['watched'] === '1' ? 1 : 0;
$reason = trim($_POST['reason'] ?? '');
$notes  = trim($_POST['notes'] ?? '');
$link   = trim($_POST['link'] ?? '');
$rating = $_POST['rating'] ?? '';

if ($title === '') {
    http_response_code(400);
    echo 'Error: Title is required';
    exit;
}

if ($year === '' || !ctype_digit($year)) {
    $year = null;
} else {
    $year = (int) $year;
}

if ($rating === '' || !is_numeric($rating)) {
    $rating = null;
} else {
    $rating = (int) $rating;
}

$stmt = $conn->prepare(
    'INSERT INTO movies (user_id, title, year, genre, watched, reason, notes, link, rating)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
if (!$stmt) {
    http_response_code(500);
    echo 'Error: ' . $conn->error;
    exit;
}

$stmt->bind_param('isisisssi', $uid, $title, $year, $genre, $watched, $reason, $notes, $link, $rating);
if (!$stmt->execute()) {
    http_response_code(500);
    echo 'Error: ' . $stmt->error;
    exit;
}

$stmt->close();
$conn->close();
header('Location: index.html');
exit;
?>
