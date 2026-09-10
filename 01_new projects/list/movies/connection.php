<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$servername = "localhost";
$username = "wcc_106282";
$password = ",8(bN3^<D:zr";
$dbname = "wcc_106282";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    throw new RuntimeException('DB connection failed: ' . $conn->connect_error);
}

$conn->set_charset('utf8mb4');
?>
