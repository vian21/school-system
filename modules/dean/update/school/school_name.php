<?php

if (
    isset($_POST['id'])
) {
    include ("../../../config.php");

    $name = $_POST['name'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET name='$name' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}