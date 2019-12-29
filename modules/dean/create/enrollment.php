<?php
if (
    isset($_POST['student']) &&
    isset($_POST['subject']) &&
    isset($_POST['period'])

) {
    include("../../config.php");

    $student = $_POST['student'];
    $subject = $_POST['subject'];
    $period=$_POST['period'];
    $start=$_POST['start'];
    $end=$_POST['end'];

    $enroll = $connect->query("INSERT INTO enrollment(student_id,subject,period,start,end) VALUES($student,$subject,$period,$start,$end)");

    if ($enroll) {
        echo "ok";
    } else {
        echo "ko";
    }
}
