<?php
$servername = "localhost";
$username = "wcc_106282";
$password = ",8(bN3^<D:zr";
$dbname = "wcc_106282";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
