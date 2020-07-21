<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $name = sanitize($_POST['name']);
    $id = sanitize($_POST['id']);

    $change = $connect->query("UPDATE schools SET name='$name' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
