<?php
if (isset($_GET['staff']) and is_numeric($_GET['staff'])) {
    include 'config.php';

    $id = $_GET['staff'];

    $delete = $connect->query("DELETE FROM users WHERE id =$id");

    if ($delete) {
        echo "ok";
    } else {
        echo "ko";
    }
}
