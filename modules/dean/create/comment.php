<?php
if (
    isset($_POST['student'])
) {
    include("../../config.php");

    $student = $_POST['student'];
    $comment = $_POST['comment'];
    $educator = $_POST['educator'];
    $period = $_POST['period'];
    $start = $_POST['start'];
    $end = $_POST['end'];

    $date = date('Y-m-d');

    $comment = $connect->query("INSERT INTO comments(student_id,date,comment,educator,period,start,end) VALUES($student,'$date','$comment',$educator,$period,$start,$end)");


    if ($comment) {
        echo "ok";
    } else {
        echo "ko";
    }
}
