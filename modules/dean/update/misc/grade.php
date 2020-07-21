<?php
if (
    isset($_POST['id']) and
    isset($_POST['grade']) and
    isset($_POST['stream']) and
    is_numeric($_POST['id']) and
    is_numeric($_POST['grade'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $id = sanitize($_POST['id']);
    $grade = sanitize($_POST['grade']);
    $stream = sanitize($_POST['stream']);

    $update = $connect->query("UPDATE streams SET grade=$grade, stream='$stream' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
