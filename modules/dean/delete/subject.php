<?php
//delete subject
if (
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../config.php");

    $id = $_POST['id'];

    $delete = $connect->query("DELETE FROM subjects WHERE id=$id");
    $delete = $connect->query("DELETE FROM enrollment WHERE subject=$id");


    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
