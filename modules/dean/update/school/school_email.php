<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $email = sanitize($_POST['email']);
    $id = sanitize($_POST['id']);

    $change = $connect->query("UPDATE schools SET email='$email' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
