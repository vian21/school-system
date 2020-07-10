<?php


//insert subject
if (
    isset($_POST['school'])
) {

    $school = $_POST['school'];
    $max = $_POST['max'];
    $min = $_POST['min'];
    $grade = $_POST['grade'];
    $gpa = $_POST['gpa'];

    include("../../config.php");

    $insert = $connect->query("INSERT INTO grading(max,school_id,min,grade,gpa) VALUES($max,$school,$min,'$grade',$gpa)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}
