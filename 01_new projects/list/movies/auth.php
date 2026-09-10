<?php
// auth.php - session helpers. Requires connection.php already included.
// connection.php starts the session. Requires login for data endpoints.

function current_user_id() {
    return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
}

function current_user_name() {
    return isset($_SESSION['name_id']) ? $_SESSION['name_id'] : null;
}

function is_logged_in() {
    return current_user_id() !== null;
}

// Redirect to login if not logged in (for HTML pages).
function require_login_page() {
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

// Return JSON error + exit if not logged in (for data endpoints).
function require_login_json() {
    if (!is_logged_in()) {
        http_response_code(401);
        echo json_encode(['error' => 'Not logged in']);
        exit;
    }
}
?>
