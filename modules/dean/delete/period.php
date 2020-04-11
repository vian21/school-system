<?php

//insert period
if (
    isset($_POST['id']) and
    isset($_POST['year']) and
    isset($_POST['name'])
) {
    include("../../config.php");

    $school_id = $_POST['id'];
    $year = $_POST['year'];
    $name = $_POST['name'];

    $insert = $connect->query("INSERT INTO academic_periods(academic_year,school,name) VALUES('$year',$school_id,'$name')");

    if ($insert) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
