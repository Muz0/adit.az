<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Change this to your email
    $to = "game.hacker.1990@mail.ru";

    // Collect form data safely
    $name    = trim($_POST["name"] ?? "");
    $surname = trim($_POST["surname"] ?? "");
    $email   = trim($_POST["email"] ?? "");
    $subject = trim($_POST["subject"] ?? "No subject");
    $message = trim($_POST["message"] ?? "");

    // Validate required fields
    if ($name === "" || $surname === "" || $email === "" || $message === "") {
        echo "fail";
        exit;
    }

    // Build the email
    $fullName = $name . " " . $surname;
    $body  = "You have received a new message from your website contact form.\n\n";
    $body .= "Name: $fullName\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    $headers  = "From: $fullName <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Try to send
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "fail";
    }
} else {
    // Not a POST request
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
