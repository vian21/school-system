<?php
if (
    isset($_POST['school']) and
    isset($_POST['months'])
) {
    include("../../config.php");

    $school = $_POST['school'];
    $name = $_POST['name'];
    $months = $_POST['months'];
    if ($_POST['end'] == "") {
        $date = date('Y-m-d');
    } else {
        $date = $_POST['end'];
    }


    $end = date('Y-m-d', strtotime($date . "+$months month"));

    $insert = $connect->query("INSERT INTO transactions(school_id,school_name,date,period,end) VALUES($school,'$name','$date',$months,'$end')");

    //school table
    $update = $connect->query("UPDATE schools SET last_paid='$date', end='$end',time=$months WHERE id=$school");

    if ($insert && $update) {
        echo "ok";
    } else {
        echo "ko";
    }
}