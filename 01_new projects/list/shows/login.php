<?php
require_once 'connection.php';

$name_id = trim($_POST['name_id'] ?? '');
$password = $_POST['password'] ?? '';

if ($name_id !== '' && $password !== '') {
    $stmt = $conn->prepare('SELECT id, name_id, password FROM users WHERE name_id = ?');
    $stmt->bind_param('s', $name_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if ($user && password_verify($password, $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $user['id'];
        $_SESSION['name_id'] = $user['name_id'];
        header('Location: index.html');
        exit;
    }
    $error = 'Invalid name or password.';
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Login - Shows</title>
</head>
<body>
    <h1>Log In</h1>
    <?php if (isset($error)): ?><p style="color:red"><?php echo htmlspecialchars($error); ?></p><?php endif; ?>
    <form action="login.php" method="post">
        <label>Name <input type="text" name="name_id" required></label>
        <label>Password <input type="password" name="password" required></label>
        <button type="submit">Log In</button>
    </form>
    <p><a href="register.php">New here? Register</a></p>
</body>
</html>
