<?php

if (
    isset($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $id = sanitize($_POST['id']);
    $max = sanitize($_POST['max']);
    $min = sanitize($_POST['min']);
    $grade = sanitize($_POST['grade']);
    $gpa = sanitize($_POST['gpa']);

    $update = $connect->query("UPDATE grading SET max=$max, min=$min, grade='$grade', gpa=$gpa WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
