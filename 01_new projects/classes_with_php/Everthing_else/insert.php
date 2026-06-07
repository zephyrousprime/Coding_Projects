<?php
require_once 'connection.php';

$class = trim($_POST['class'] ?? '');
$year_level = trim($_POST['year_level'] ?? '');
$size = trim($_POST['size'] ?? '');
$lowest_grade = trim($_POST['lowest_grade'] ?? '');
$av_grade = trim($_POST['av_grade'] ?? '');
$highest_grade = trim($_POST['highest_grade'] ?? '');

if ($class === '' || $year_level === '' || $size === '' || $lowest_grade === '' || $av_grade === '' || $highest_grade === '') {
    http_response_code(400);
    echo 'Error: All fields are required';
    exit;
}

$stmt = $conn->prepare(
    'INSERT INTO Class_Numbers (class, year_level, size, lowest_grade, av_grade, highest_grade) VALUES (?, ?, ?, ?, ?, ?)'
);
if (!$stmt) {
    http_response_code(500);
    echo 'Error: ' . $conn->error;
    exit;
}

$stmt->bind_param('siisss', $class, $year_level, $size, $lowest_grade, $av_grade, $highest_grade);
if (!$stmt->execute()) {
    http_response_code(500);
    echo 'Error: ' . $stmt->error;
    exit;
}

$stmt->close();
$conn->close();

header('Location: Stats.html');
exit;
  
