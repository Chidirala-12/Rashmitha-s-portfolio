<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input
    $name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST["subject"]) ? strip_tags(trim($_POST["subject"])) : '';
    $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : '';

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please enter a valid email address.";
        exit;
    }

    // Set recipient email address (replace with your actual email)
    $recipient = "sairashu123@gmail.com";
    
    // Set a more informative subject if none provided
    if (empty($subject)) {
        $subject = "New contact form submission from $name";
    }
    
    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Set email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($recipient, $subject, $email_content, $headers)) {
        // Success
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Failed to send
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
        // For debugging (remove in production)
        // echo " Mail server response: " . error_get_last()['message'];
    }
} else {
    // Not a POST request
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>