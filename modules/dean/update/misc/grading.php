<?php

if (
    isset($_POST['id'])
) {
    $id = $_POST['id'];
    $max = $_POST['max'];
    $min = $_POST['min'];
    $grade = $_POST['grade'];
    $gpa = $_POST['gpa'];

    include("../../../config.php");

    $update = $connect->query("UPDATE grading SET max=$max, min=$min, grade='$grade', gpa=$gpa WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
