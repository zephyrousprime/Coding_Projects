<?php
require_once 'connection.php';

$name_id = trim($_POST['name_id'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm'] ?? '';

if ($name_id === '' || $password === '') {
    $error = 'Name and password are required.';
} elseif ($password !== $confirm) {
    $error = 'Passwords do not match.';
} elseif (strlen($password) < 4) {
    $error = 'Password must be at least 4 characters.';
} else {
    // Check if name_id is already taken
    $stmt = $conn->prepare('SELECT id FROM users WHERE name_id = ?');
    $stmt->bind_param('s', $name_id);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $error = 'That name is already taken.';
    } else {
        $password = password_hash($password, PASSWORD_DEFAULT);
        $hash_code = bin2hex(random_bytes(16));
        $stmt->close();

        $stmt = $conn->prepare('INSERT INTO users (name_id, password, hash_code) VALUES (?, ?, ?)');
        $stmt->bind_param('sss', $name_id, $password, $hash_code);
        if ($stmt->execute()) {
            $uid = $conn->insert_id;
            $_SESSION['user_id'] = (int) $uid;
            $_SESSION['name_id'] = $name_id;
            header('Location: index.html');
            exit;
        } else {
            $error = 'Registration failed: ' . $stmt->error;
        }
    }
    $stmt->close();
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Register - Movies</title>
</head>
<body>
    <h1>Register</h1>
    <?php if (isset($error)): ?><p style="color:red"><?php echo htmlspecialchars($error); ?></p><?php endif; ?>
    <form action="register.php" method="post">
        <label>Name <input type="text" name="name_id" required></label>
        <label>Password <input type="password" name="password" required></label>
        <label>Confirm Password <input type="password" name="confirm" required></label>
        <button type="submit">Register</button>
    </form>
    <p><a href="login.php">Already have an account? Log in</a></p>
</body>
</html>
