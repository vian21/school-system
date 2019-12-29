<?php

if (
    isset($_POST['id'])
) {
    include ("../../../config.php");

    $website = $_POST['website'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET website='$website' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}