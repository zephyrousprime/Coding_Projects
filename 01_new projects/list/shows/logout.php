<?php
require_once 'connection.php';
$_SESSION = [];
session_destroy();
header('Location: login.php');
exit;
?>
