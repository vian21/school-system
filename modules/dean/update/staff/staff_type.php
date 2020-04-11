<?php

if (

    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['title'] != "") {
        include("../../../config.php");
        $title = strip_tags(mysqli_real_escape_string($connect, $_POST['title']));
        $id = $_POST['id'];
        $change_title = $connect->query("UPDATE users SET type='$title' WHERE id=$id");
        if (!$change_title) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
