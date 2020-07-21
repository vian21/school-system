<?php

if (

    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");


    $tel = sanitize($_POST['tel']);
    if ($tel == '') {
        $tel = ' ';
    }
    $id = sanitize($_POST['id']);
    $change_tel = $connect->query("UPDATE users SET tel='$tel' WHERE id=$id");
    if (!$change_tel) {
        echo "ko";
    } else {
        echo "ok";
    }
}
