<?php
if (
    isset($_POST['student']) &&
    isset($_POST['amount'])
) {
    include("../../config.php");
    include("../../functions.php");


    $student = sanitize($_POST['student']);
    $item = sanitize($_POST['item']);
    $amount = sanitize($_POST['amount']);
    $type = sanitize($_POST['type']);
    $date = date('Y-m-d');

    $transact = $connect->query("INSERT INTO accounting(student_id,date,item,amount,type) VALUES($student,'$date','$item',$amount,$type)");


    if ($transact) {
        echo "ok";
    } else {
        echo "ko";
    }
}
