<?php
if (
    isset($_POST['student']) &&
    isset($_POST['amount'])
) {
    include("../../config.php");

    $student = $_POST['student'];
    $item = $_POST['item'];
    $amount = $_POST['amount'];
    $type = $_POST['type'];
    $date=date('Y-m-d');

    $transact = $connect->query("INSERT INTO accounting(student_id,date,item,amount,type) VALUES($student,'$date','$item',$amount,$type)");


    if ($transact) {
        echo "ok";
    } else {
        echo "ko";
    }
}
