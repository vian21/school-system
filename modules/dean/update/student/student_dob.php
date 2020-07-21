<?php


if (
    $_POST['dob'] != "" and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $id = sanitize($_POST['id']);
    $dob = sanitize($_POST['dob']);
    $change_dob = $connect->query("UPDATE students SET DOB='$dob' WHERE id=$id");
    if (!$change_dob) {
        echo "ko";
    } else {
        echo "ok";
    }
}
