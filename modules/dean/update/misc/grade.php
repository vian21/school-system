<?php
if (
    isset($_POST['id']) and
    isset($_POST['grade']) and
    isset($_POST['stream']) and
    is_numeric($_POST['id']) and
    is_numeric($_POST['grade'])
) {
    include("../../../config.php");

    $id = $_POST['id'];
    $grade = $_POST['grade'];
    $stream = $_POST['stream'];

    $update = $connect->query("UPDATE streams SET grade=$grade, stream='$stream' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
