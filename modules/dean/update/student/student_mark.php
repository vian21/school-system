<?php
if (isset($_POST['student_id']) and isset($_POST['mark']) and is_numeric($_POST['mark']) and is_numeric($_POST['student_id'])) {
    //echo "ok";
    include("../../../config.php");
    $student_id = mysqli_real_escape_string($connect, $_POST['student_id']);
    $mark = mysqli_real_escape_string($connect, $_POST['mark']);
    $test = mysqli_real_escape_string($connect, $_POST['test']);
    $update_marks = $connect->query("UPDATE marks SET marks=$mark where student_id=$student_id AND test_id=$test");
    if ($update_marks) {
        echo "ok";
    } else {
        echo "ko";
    }
}
