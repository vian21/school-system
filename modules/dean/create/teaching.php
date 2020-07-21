<?php
if (
    isset($_POST['teacher']) &&
    isset($_POST['subject'])
) {
    include("../../config.php");
    include("../../functions.php");

    $teacher = sanitize($_POST['teacher']);
    $subject = sanitize($_POST['subject']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);
    $period = sanitize($_POST['period']);


    $enroll = $connect->query("INSERT INTO teaches(teacher,subject,start,end,period) VALUES($teacher,$subject,$start,$end,$period)");

    if ($enroll) {
        echo "ok";
    } else {
        echo "ko";
    }
}
