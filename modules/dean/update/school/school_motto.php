<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $motto = sanitize($_POST['motto']);
    $id = sanitize($_POST['id']);

    $change = $connect->query("UPDATE schools SET motto='$motto' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
