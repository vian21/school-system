<?php
if (
    isset($_POST['student'])
) {
    include("../../config.php");
    include("../../functions.php");


    $student = sanitize($_POST['student']);
    $type = sanitize($_POST['type']);
    $marks = sanitize($_POST['marks']);
    $educator = sanitize($_POST['educator']);
    $comment = sanitize($_POST['comment']);
    $period = sanitize($_POST['period']);
    $period = sanitize($_POST['period']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);

    $date = date('Y-m-d');

    $discipline = $connect->query("INSERT INTO discipline(student_id,date,type,marks,comment,educator,period,start,end) VALUES($student,'$date',$type,$marks,'$comment',$educator,$period,$start,$end)");


    if ($discipline) {
        echo "ok";
    } else {
        echo "ko";
    }
}
