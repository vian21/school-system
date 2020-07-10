<?php
if (
    isset($_POST['student'])
) {
    include("../../config.php");

    $student = $_POST['student'];
    $type = $_POST['type'];
    $marks = $_POST['marks'];
    $educator = $_POST['educator'];
    $comment = $_POST['comment'];
    $period = $_POST['period'];
    $period = $_POST['period'];
    $start = $_POST['start'];
    $end = $_POST['end'];

    $date = date('Y-m-d');

    $discipline = $connect->query("INSERT INTO discipline(student_id,date,type,marks,comment,educator,period,start,end) VALUES($student,'$date',$type,$marks,'$comment',$educator,$period,$start,$end)");


    if ($discipline) {
        echo "ok";
    } else {
        echo "ko";
    }
}
