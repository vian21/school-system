<?php

//insert stream | grade
if (
    isset($_POST['grade'])
    && isset($_POST['stream'])

    && !empty($_POST['grade'])
    && !empty($_POST['stream'])

) {
    $grade = $_POST['grade'];
    $stream = $_POST['stream'];

    include 'config.php';

    $insert = $connect->query("INSERT INTO streams(grade,stream) VALUES($grade,'$stream')");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}