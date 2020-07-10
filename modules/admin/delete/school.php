<?php
//delete period
if (
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../config.php");

    $id = $_POST['id'];

    $delete = $connect->query("DELETE FROM schools WHERE id=$id");
    $delete = $connect->query("DELETE FROM academic_enrollments WHERE school=$id");
    $delete = $connect->query("DELETE FROM academic_periods WHERE school=$id");
    $delete = $connect->query("DELETE FROM assessments WHERE school=$id");
    $delete = $connect->query("DELETE FROM grading WHERE school_id=$id");
    $delete = $connect->query("DELETE FROM streams WHERE school=$id");
    $delete = $connect->query("DELETE FROM students WHERE school=$id");
    $delete = $connect->query("DELETE FROM subjects WHERE school=$id");
    $delete = $connect->query("DELETE FROM transactions WHERE school=$id");
    $delete = $connect->query("DELETE FROM users WHERE school=$id");






    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
