<?php

//insert stream | grade
if (
    isset($_POST['grade'])
    && isset($_POST['stream'])

    && !empty($_POST['grade'])
    && !empty($_POST['stream'])

) {
    include("../../config.php");
    include("../../functions.php");


    $school = sanitize($_POST['school']);
    $grade = sanitize($_POST['grade']);
    $stream = sanitize($_POST['stream']);


    $insert = $connect->query("INSERT INTO streams(grade,stream,school) VALUES($grade,'$stream',$school)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}
