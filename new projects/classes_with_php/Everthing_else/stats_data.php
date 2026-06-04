<?php
/**
 * stats_data.php
 * Returns all rows from Class_Numbers as a JSON array.
 * This endpoint returns pure JSON with the correct headers.
 */

header('Content-Type: application/json; charset=utf-8');

try {
    require_once 'connection.php'; // connection.php now returns $conn or throws
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Query
$sql    = "SELECT class, year_level, size, lowest_grade, av_grade, highest_grade
           FROM Class_Numbers
           ORDER BY year_level ASC, class ASC";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => $conn->error]);
    $conn->close();
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $row['year_level'] = (int) $row['year_level'];
    $row['size']       = (int) $row['size'];
    $rows[] = $row;
}

$conn->close();

echo json_encode($rows, JSON_PRETTY_PRINT);

?>