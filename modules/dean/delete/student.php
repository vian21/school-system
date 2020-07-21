<?php
//delete student
if (isset($_GET['student']) and is_numeric($_GET['student'])) {
    include("../../config.php");
    include("../../functions.php");

    $id = sanitize($_GET['student']);

    $delete = $connect->query("DELETE FROM students WHERE id =$id");

    $deleteEnrollemnts = $connect->query("DELETE FROM enrollment  WHERE student_id=$id");
    $deleteAcademicEnrollemnts = $connect->query("DELETE FROM academic_enrollments  WHERE student=$id");
    $deleteMarks = $connect->query("DELETE FROM marks WHERE student_id =$id");


    if ($delete and $deleteEnrollemnts) {
        echo "ok";
    } else {
        echo "ko";
    }
}
