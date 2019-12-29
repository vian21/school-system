<?php

if (
    isset($_POST['id'])
) {
    include ("../../../config.php");

    $email = $_POST['email'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET email='$email' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}