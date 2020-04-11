<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");

    $motto = $_POST['motto'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET motto='$motto' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
