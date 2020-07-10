<?php
if (!isset($_GET['id'])) {
    include '../modules/config.php';

    header("location:" . $app_url . "index.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php include '../modules/config.php' ?>

    <?php include '../modules/staticFiles.php' ?>

    <title>Set Password</title>
</head>
<style>
    body {
        margin: 0;
        background-color: #ffff;
        font-family: Arial, Helvetica, sans-serif;
    }

    form {
        width: 250px;
        text-align: center;
        padding-top: 200px;
    }

    form input {
        width: 100%;
        height: 45px;
        font-family: Montserrat-Bold;

    }

    button {
        border: 0;
    }

    #set {
        width: 100%;
        color: white;
        height: 45px;

        background-color: #428bca;
    }
</style>

<body>
    <center>
        <form action="" method="post">

            <input type="password" name='password' placeholder="Enter new password"><br><br>

            <button type='submit' id='set'>Save Password</button>
        </form>
    </center>
</body>

</html>

<?php

if (isset($_POST['password'])) {
    include '../modules/config.php';

    $id = $_GET['id'];

    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    //Fetch the user corresponding to the email received in an array
    $fetchUser = mysqli_fetch_array($connect->query("SELECT*FROM users where uniqueID='$id'  LIMIT 1"));

    //student
    if (empty($fetchUser)) {
        $fetchUser = mysqli_fetch_array($connect->query("SELECT*FROM students where uniqueID='$id'  LIMIT 1"));

        if (!empty($fetchUser)) {

            $update = $connect->query("UPDATE students SET password='$password' where uniqueID='$id'");

            if (!$update) {
                echo "<script>alert('Failed to set password!')<script>";
            } else {
                echo "<script>alert('Password set successfully!')<script>";
                header("location:" . $app_url . "login.php");
            }
        }
    }

    //staff 
    else {
        $update = $connect->query("UPDATE users SET password='$password' where uniqueID='$id'");

        if (!$update) {
            echo "<script>alert('Failed to set password!')<script>";
        } else {
            header("location:" . $app_url . "login.php");
        }
    }
}
