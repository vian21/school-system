<?php
if (
    isset($_POST['teacher']) &&
    isset($_POST['subject']) &&
    isset($_POST['year'])

) {
    include("../../config.php");

    $teacher = $_POST['teacher'];
    $subject = $_POST['subject'];
    $year=$_POST['year'];

    $enroll = $connect->query("INSERT INTO teaches(teacher,subject,year) VALUES($teacher,$subject,$year)");

    if ($enroll) {
        echo "ok";
    } else {
        echo "ko";
    }
}
