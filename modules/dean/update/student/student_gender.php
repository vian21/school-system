<?php


if (
    $_POST['gender'] !== '' and
    is_numeric($_POST['gender']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");


    $id = sanitize($_POST['id']);
    $gender = sanitize($_POST['gender']);

    $change_gender = $connect->query("UPDATE students SET gender=$gender WHERE id=$id");

    if (!$change_gender) {
        echo "ko";
    } else {
        echo "ok";
    }
}
