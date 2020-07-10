<?php

if (
    isset($_POST['id'])
) {
    include("../../config.php");

    $reports = $_POST['reports'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET reports='$reports' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
