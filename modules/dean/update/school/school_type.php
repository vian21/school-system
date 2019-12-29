<?php

if (
    isset($_POST['id'])
) {
    include ("../../../config.php");

    $type = $_POST['type'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET type='$type' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}