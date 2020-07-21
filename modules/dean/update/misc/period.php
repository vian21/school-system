<?php
if (
    isset($_POST['period']) and
    isset($_POST['name']) and
    isset($_POST['start']) and
    isset($_POST['end'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $period = sanitize($_POST['period']);
    $school = sanitize($_POST['school']);
    $name = sanitize($_POST['name']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);


    $update = $connect->query("UPDATE academic_periods SET start=$start , end=$end , name='$name' WHERE id=$period");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
