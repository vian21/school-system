<?php

if (isset($_POST['id']) and is_numeric($_POST['id'])) {
    if ($_POST['email'] != "") {
        include("../../../config.php");
        include("../../../functions.php");


        $email = sanitize($_POST['email']);
        $id = sanitize($_POST['id']);

        $change_email = $connect->query("UPDATE students SET email='$email' WHERE id=$id");
        if (!$change_email) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
