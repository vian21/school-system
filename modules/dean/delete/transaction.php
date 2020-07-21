<?php
//delete subject
if (
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../config.php");
    include("../../functions.php");

    $id = sanitize($_POST['id']);

    $delete = $connect->query("DELETE FROM accounting WHERE id=$id");

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
