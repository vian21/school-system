<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $type = sanitize($_POST['type']);
    $id = sanitize($_POST['id']);

    $change = $connect->query("UPDATE schools SET type='$type' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}
