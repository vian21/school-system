<?php

//Creating a new assessement and records in the marks table
if (
    isset($_POST['type']) and
    isset($_POST['subject']) and
    is_numeric($_POST['subject']) and
    is_numeric($_POST['type']) and
    isset($_POST['period']) and
    is_numeric($_POST['period']) and
    isset($_POST['name']) and
    is_numeric($_POST['subject'])
) {
    include("../../config.php");
    include("../../functions.php");

    $school_id = $_POST['school'];
    $subject = mysqli_real_escape_string($connect, $_POST['subject']);
    $type = mysqli_real_escape_string($connect, $_POST['type']);
    $period_id = mysqli_real_escape_string($connect, $_POST['period']);
    $period_name = mysqli_real_escape_string($connect, $_POST['name']);
    $students_taking_that_subject = fetchStudentsTaking($subject, $period_id);
    $month = "";

    if ($type == 1) {
        $month = mysqli_real_escape_string($connect, $_POST['month']) + 1;
    }

    $create_assessment = $connect->query("INSERT INTO assessments(school,period,name,month,type,subject) VALUES($school_id,$period_id,'$period_name',$month,$type,$subject)");

    //get id of newly created test
    $test_id_query = mysqli_fetch_assoc($connect->query("SELECT id FROM assessments WHERE school = $school_id AND period = $period_id AND name = '$period_name' AND month = $month AND type = $type AND subject = $subject"));
    $test_id = $test_id_query['id'];

    if ($create_assessment) {
        echo "ok";
    } else {
        echo "ko";
    }


    foreach ($students_taking_that_subject as $student) {
        //$stream = getStudentInfo($student['id'])['stream'];
        $insert = $connect->query("INSERT INTO marks(student_id,stream,test_id) VALUES($student,$subject,$test_id)");
    }
}