<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit result</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="page-other">
    <main class="from" style="margin-top: 48px;">
<?php
include 'connection.php';

$class = $_POST['class'] ?? '';
$year_level = $_POST['year_level'] ?? '';
$size = $_POST['size'] ?? '';
$lowest_grade = $_POST['lowest_grade'] ?? '';
$av_grade = $_POST['av_grade'] ?? '';
$highest_grade = $_POST['highest_grade'] ?? '';

if (empty($class) || empty($year_level) || empty($size) || empty($lowest_grade) || empty($av_grade) || empty($highest_grade)) {
    echo '<p class="form-validation-hint">Error: All fields are required.</p>';
    echo '<p><a href="../pages/Form.html">Back to form</a></p>';
    $conn->close();
    exit();
}

$class = $conn->real_escape_string($class);
$year_level = $conn->real_escape_string($year_level);
$size = $conn->real_escape_string($size);
$lowest_grade = $conn->real_escape_string($lowest_grade);
$av_grade = $conn->real_escape_string($av_grade);
$highest_grade = $conn->real_escape_string($highest_grade);

$sql = "INSERT INTO Class_Numbers(class, year_level, size, lowest_grade, av_grade, highest_grade)
        VALUES ('$class','$year_level','$size','$lowest_grade','$av_grade','$highest_grade')";

if ($conn->query($sql) === TRUE) {
    echo '<p style="color:#173555;font-weight:700;">New record created successfully.</p>';
    echo '<p><a href="../pages/Form.html">Add another class</a> · <a href="../pages/Stats.html">View stats</a></p>';
} else {
    echo '<p class="form-validation-hint">Error: ' . htmlspecialchars($conn->error) . '</p>';
    echo '<p><a href="../pages/Form.html">Back to form</a></p>';
}

$conn->close();
?>
    </main>
</body>
</html>
