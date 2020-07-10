<?php
//Authentication page
if (isset($_POST['email']) and $_POST['password']) {
    include 'modules/config.php';
    
    $student=false;

    //Avoid SQL injection by escaping SQL characters sent
    $email = mysqli_real_escape_string($connect, $_POST['email']);
    $password = mysqli_real_escape_string($connect, $_POST['password']);

    //Fetch the user corresponding to the email received in an array
    $fetchUser = mysqli_fetch_array($connect->query("SELECT*FROM users where email='$email'  LIMIT 1"));

    if (empty($fetchUser)) {
        $fetchUser = mysqli_fetch_array($connect->query("SELECT*FROM students where email='$email'  LIMIT 1"));
        $student = true;
    }

    $hashedPassword = $fetchUser['password'];

    //Authenticate
    if (password_verify($password, $hashedPassword)) {
        session_start();

        //Create a session containing the id and account type of the user and then redirect to main page
        $_SESSION['id'] = $fetchUser['id'];

        if ($student == true) {
            $_SESSION['type'] = 4;
        } else {
            $_SESSION['type'] = $fetchUser['type'];
        }

        header("location:index.php");
    } else {
        header("location:login.php");   //Redirect back to login page if authentication fails
    }
} else {
    header("location:login.php");   //Redirect back to login page if no data was sent
}
