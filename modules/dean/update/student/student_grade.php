<?php

if (
    $_POST['grade'] != "" and
    is_numeric($_POST['grade']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include("../../../config.php");
    include("../../../functions.php");

    $school = $_POST['school'];

    $id = $_POST['id'];
    $grade = $_POST['grade'];
    $period = mysqli_real_escape_string($connect, $_POST['period']);

    $start = $_POST['start'];
    $end = $_POST['end'];

    //check if the student is enrolled in the desired year
    if (mysqli_num_rows($connect->query("SELECT* FROM academic_enrollments WHERE student=$id and year=$period and start=start and end=$end")) !== 0) {
        //if he is enrolled the grade will be changed
        $change_grade = $connect->query("UPDATE academic_enrollments SET grade=$grade WHERE student=$id and start=start and end=$end");
    } else {
        //if he is not enrolled a new record willl created 
        $change_grade = $connect->query("INSERT INTO academic_enrollments(student,grade,year,start,end,school) VALUES($id,$grade,$period,$start,$end,$school)");
    }

    if (!$change_grade) {
        echo "ko";
    } else {
        echo "ok";
    }

    //delete subjects taken in that period only
    $delete = $connect->query("DELETE FROM enrollment WHERE student_id=$id and start=$start and end=$end and period=$period");

    //enroll student in the composulsary subjects in his/her new grade
    $compulsary_courses = fetchCompulsarySubjects($grade, $school);

    foreach ($compulsary_courses as $subject) {
        $connect->query("INSERT INTO enrollment(student_id,subject,period,start,end) VALUES($id,$subject,$period,$start,$end)");
    }
}
