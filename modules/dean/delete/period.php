<?php
//delete period
if (
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../config.php");
    include("../../functions.php");

    $id = sanitize($_POST['id']);

    $delete = $connect->query("DELETE FROM academic_periods WHERE id=$id");
    $delete = $connect->query("DELETE FROM marks WHERE period=$id");
    $delete = $connect->query("DELETE FROM enrollment WHERE period=$id");


    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
