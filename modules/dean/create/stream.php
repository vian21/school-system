<?php

//insert stream | grade
if (
    isset($_POST['grade'])
    && isset($_POST['stream'])

    && !empty($_POST['grade'])
    && !empty($_POST['stream'])

) {
    $school=$_POST['school'];
    $grade = $_POST['grade'];
    $stream = $_POST['stream'];

    include("../../config.php");

    $insert = $connect->query("INSERT INTO streams(grade,stream,school) VALUES($grade,'$stream',$school)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}
