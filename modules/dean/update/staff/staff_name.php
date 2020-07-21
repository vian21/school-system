<?php
if (

    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['name'] != "") {
        include("../../../config.php");
        include("../../../functions.php");

        $name = sanitize($_POST['name']);
        $id = sanitize($_POST['id']);
        $change_name = $connect->query("UPDATE users SET name='$name' WHERE id=$id");
        if (!$change_name) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
