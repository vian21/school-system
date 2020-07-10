<?php
//delete subject
if (
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../config.php");

    $id = $_POST['id'];

    $delete = $connect->query("DELETE FROM accounting WHERE id=$id");

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
