<?php

if (
    $_POST['grade'] != "" and
    is_numeric($_POST['grade']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $id = $_POST['id'];
    $grade = $_POST['grade'];
    $period = mysqli_real_escape_string($connect, $_POST['period']);

    $start = $_POST['start'];
    $end = $_POST['end'];

    $change_grade = $connect->query("UPDATE students SET grade=$grade WHERE id=$id");
    if (!$change_grade) {
        echo "ko";
    } else {
        echo "ok";
    }

    $compulsary_courses = fetchCompulsarySubjects($grade);

    foreach ($compulsary_courses as $subject) {
        $connect->query("INSERT INTO enrollment(student_id,subject,period,start,end) VALUES($id,$subject,$period,$start,$end)");
    }
}
