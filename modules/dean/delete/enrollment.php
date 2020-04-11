<?php
if (
    isset($_POST['student']) &&
    isset($_POST['subject'])

) {
    include("../../config.php");

    $student = $_POST['student'];
    $subject = $_POST['subject'];

    $disenroll = $connect->query("DELETE FROM enrollment WHERE student_id=$student AND subject=$subject");

    if ($disenroll) {
        echo "ok";
    } else {
        echo "ko";
    }
}
