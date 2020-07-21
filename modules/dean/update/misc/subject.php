<?php

if (
    isset($_POST['id']) and
    isset($_POST['name']) and
    isset($_POST['grade']) and
    isset($_POST['type']) and
    isset($_POST['hours'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $id = sanitize($_POST['id']);
    $name = sanitize($_POST['name']);
    $grade = sanitize($_POST['grade']);
    $type = sanitize($_POST['type']);
    $hours = sanitize($_POST['hours']);


    $update = $connect->query("UPDATE subjects SET subject_name='$name', stream=$grade, hours=$hours, type=$type WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
