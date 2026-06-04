<?php
$servername = "localhost";
$username = "wcc_106282";
$password = ",8(bN3^<D:zr";
$dbname = "wcc_106282";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
