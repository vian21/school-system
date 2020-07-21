<?php
if (
    isset($_POST['student']) &&
    isset($_POST['subject']) &&
    isset($_POST['period'])

) {
    include("../../config.php");
    include("../../functions.php");

    $student = sanitize($_POST['student']);
    $subject = sanitize($_POST['subject']);
    $period = sanitize($_POST['period']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);

    $enroll = $connect->query("INSERT INTO enrollment(student_id,subject,period,start,end) VALUES($student,$subject,$period,$start,$end)");

    if ($enroll) {
        echo "ok";
    } else {
        echo "ko";
    }
}
