<?php

//insert period
if (
    isset($_POST['name']) and
    isset($_POST['type'])
) {
    include("../../config.php");

    $school= $_POST['name'];
    $type = $_POST['type'];

    $insert = $connect->query("INSERT INTO schools(name,type) VALUES('$school',$type)");

    if ($insert) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
