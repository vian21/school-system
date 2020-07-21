<?php
if (
    isset($_POST['student'])
) {
    include("../../config.php");
    include("../../functions.php");

    $student = sanitize($_POST['student']);
    $comment = sanitize($_POST['comment']);
    $educator = sanitize($_POST['educator']);
    $period = sanitize($_POST['period']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);

    $date = date('Y-m-d');

    $comment = $connect->query("INSERT INTO comments(student_id,date,comment,educator,period,start,end) VALUES($student,'$date','$comment',$educator,$period,$start,$end)");


    if ($comment) {
        echo "ok";
    } else {
        echo "ko";
    }
}
