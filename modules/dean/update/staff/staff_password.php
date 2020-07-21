<?php

if (

    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['password'] != "") {
        include("../../../config.php");
        include("../../../functions.php");

        $password = sanitize($_POST['password']);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $id = sanitize($_POST['id']);
        $change_email = $connect->query("UPDATE users SET password='$hashedPassword' WHERE id=$id");
        if (!$change_email) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
