<?php

if (
    isset($_POST['id']) and
    isset($_POST['name']) and
    isset($_POST['grade']) and
    isset($_POST['type']) and
    isset($_POST['hours'])
) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $grade = $_POST['grade'];
    $type = $_POST['type'];
    $hours = $_POST['hours'];

    include ("../../../config.php");

    $update = $connect->query("UPDATE subjects SET subject_name='$name', stream=$grade, hours=$hours, type=$type WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}