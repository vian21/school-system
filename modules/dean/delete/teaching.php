<?php
//delete grade
if (
    isset($_POST['teacher']) and
    isset($_POST['subject']) and
    isset($_POST['year']) and
    is_numeric($_POST['teacher'])
) {
    include("../../config.php");

    $teacher = $_POST['teacher'];
    $subject = $_POST['subject'];

    $year = $_POST['year'];


    $delete = $connect->query("DELETE FROM teaches WHERE teacher=$teacher and subject=$subject and year=$year");

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
