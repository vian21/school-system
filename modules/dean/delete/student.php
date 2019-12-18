<?php
//delete student
if (isset($_GET['student']) and is_numeric($_GET['student'])) {
    include("../../config.php");

    $id = $_GET['student'];

    $delete = $connect->query("DELETE FROM students WHERE id =$id");

    $deleteEnrollemnts = $connect->query("DELETE FROM enrollment  where student_id=$id");

    if ($delete and $deleteEnrollemnts) {
        echo "ok";
    } else {
        echo "ko";
    }
}
