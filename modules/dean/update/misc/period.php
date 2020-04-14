<?php
if (
    isset($_POST['period']) and
    isset($_POST['name']) and
    isset($_POST['start']) and
    isset($_POST['end'])
) {
    include("../../../config.php");
    $period = $_POST['period'];
    $school = $_POST['school'];
    $name = $_POST['name'];
    $start = $_POST['start'];
    $end = $_POST['end'];


    $update = $connect->query("UPDATE academic_periods SET start=$start , end=$end , name='$name' WHERE id=$period");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
