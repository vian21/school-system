<?php
if (isset($_POST['student_id']) and isset($_POST['mark']) and is_numeric($_POST['mark']) and is_numeric($_POST['student_id'])) {
    include("../../../config.php");
    include("../../../functions.php");

    $student_id = sanitize($_POST['student_id']);
    $mark = sanitize($_POST['mark']);
    $test = sanitize($_POST['test']);
    $update_marks = $connect->query("UPDATE marks SET marks=$mark where student_id=$student_id AND test_id=$test");
    if ($update_marks) {
        echo "ok";
    } else {
        echo "ko";
    }
}
