<?php
// connection.php — create $conn (mysqli) with no HTML output
$servername = "localhost";
$username = "wcc_106282";
$password = ",8(bN3^<D:zr";
$dbname = "wcc_106282";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// If connection failed, throw an exception so callers can handle it
if ($conn->connect_error) {
    throw new RuntimeException('DB connection failed: ' . $conn->connect_error);
}

// Set utf8mb4 for correct JSON encoding of text
$conn->set_charset('utf8mb4');
?>
