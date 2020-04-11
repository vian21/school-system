<?php

if (

    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['gender'] != "") {
        include("../../../config.php");
        $gender = strip_tags(mysqli_real_escape_string($connect, $_POST['gender']));
        $id = $_POST['id'];
        $change_gender = $connect->query("UPDATE users SET gender='$gender' WHERE id=$id");
        if (!$change_gender) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
