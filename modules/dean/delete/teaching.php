<?php
//delete grade
if (
    isset($_POST['teacher']) and
    isset($_POST['subject']) and
    is_numeric($_POST['teacher'])
) {
    include("../../config.php");
    include("../../functions.php");

    $teacher = sanitize($_POST['teacher']);
    $subject = sanitize($_POST['subject']);

    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);
    $period = sanitize($_POST['period']);

    $delete = $connect->query("DELETE FROM teaches WHERE teacher=$teacher and subject=$subject and start=$start and end=$end and period=$period");

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
