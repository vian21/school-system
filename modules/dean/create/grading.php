<?php


//insert subject
if (
    isset($_POST['school'])
) {

    $school = sanitize($_POST['school']);
    $max = sanitize($_POST['max']);
    $min = sanitize($_POST['min']);
    $grade = sanitize($_POST['grade']);
    $gpa = sanitize($_POST['gpa']);

    include("../../config.php");
    include("../../functions.php");

    $insert = $connect->query("INSERT INTO grading(max,school_id,min,grade,gpa) VALUES($max,$school,$min,'$grade',$gpa)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}
