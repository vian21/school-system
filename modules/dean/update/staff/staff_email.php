<?php

if (
   
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['email'] != "") {
        include ("../../../config.php");
        $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
        $id = $_POST['id'];
        $change_email = $connect->query("UPDATE users SET email='$email' WHERE id=$id");
        if (!$change_email) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}