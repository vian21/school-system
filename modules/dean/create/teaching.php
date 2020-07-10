<?php
if (
    isset($_POST['teacher']) &&
    isset($_POST['subject'])
) {
    include("../../config.php");

    $teacher = $_POST['teacher'];
    $subject = $_POST['subject'];
    $start = $_POST['start'];
    $end = $_POST['end'];

    $enroll = $connect->query("INSERT INTO teaches(teacher,subject,start,end) VALUES($teacher,$subject,$start,$end)");

    if ($enroll) {
        echo "ok";
    } else {
        echo "ko";
    }
}
