<?php

//insert period
if (
    isset($_POST['id']) and
    isset($_POST['name'])
) {
    include("../../config.php");

    $school_id = $_POST['id'];
    $start = $_POST['start'];
    $end = $_POST['end'];

    $name = $_POST['name'];

    $insert = $connect->query("INSERT INTO academic_periods(start,end,school,name) VALUES($start,$end,$school_id,'$name')");

    if ($insert) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
