<?php
include("../../functions.php");
//Creating a student
//if (isset($_GET['student'])) {
if (
    isset($_POST['name']) and
    isset($_POST['grade']) and $_POST['name'] != "" and
    $_POST['grade'] != "" and
    is_numeric($_POST['grade'])
) {
    //echo "ok";
    include("../../config.php");

    $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
    $gender = mysqli_real_escape_string($connect, $_POST['gender']);
    $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
    $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
    $grade = mysqli_real_escape_string($connect, $_POST['grade']);
    $DOB = $_POST['DOB'];
    $year = mysqli_real_escape_string($connect, $_POST['year']);
    $school = mysqli_real_escape_string($connect, $_POST['school']);


    $start = $_POST['start'];
    $end = $_POST['end'];

    $insert = $connect->query("INSERT INTO students(name,gender,email,tel,DOB,school) VALUES('$name',$gender,'$email','$tel','$DOB',$school)");

    if (!$insert) {
        echo "ko";
    }
    if ($insert) {
        echo "ok";
    }

    //id of newly created student
    $id = $connect->insert_id;

    //enroll student in academic year
    $insert = $connect->query("INSERT INTO academic_enrollments(student,grade,year,start,end,school) VALUES($id,$grade,$year,$start,$end,$school)");

    $compulsary_courses = fetchCompulsarySubjects($grade, $school);

    foreach ($compulsary_courses as $subject) {
        $connect->query("INSERT INTO enrollment(student_id,subject,period,start,end) VALUES($id,$subject,$year,$start,$end)");
    }
}
//}
