<?php
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
    include("../../functions.php");

    $name = sanitize($_POST['name']);
    $gender = sanitize($_POST['gender']);
    $email = sanitize($_POST['email']);
    $tel = sanitize($_POST['tel']);
    $grade = sanitize($_POST['grade']);
    $DOB = sanitize($_POST['DOB']);
    $year = sanitize($_POST['year']);
    $school = sanitize($_POST['school']);


    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);

    $uniqueID = uniqid('', true);

    $insert = $connect->query("INSERT INTO students(name,uniqueID,gender,email,tel,DOB,school) VALUES('$name','$uniqueID',$gender,'$email','$tel','$DOB',$school)");

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
