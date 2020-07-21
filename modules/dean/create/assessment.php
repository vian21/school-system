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
    $grade = sanitize($_POST['grade']);

    $subject = sanitize($_POST['subject']);
    $type = sanitize($_POST['type']);
    $period_id = sanitize($_POST['period']);
    $assessment_name = sanitize($_POST['name']);
    $students_taking_that_subject = fetchStudentsTaking($subject, $period_id);
    $month = " ";
    // 1 for test
    if ($type == 1) {
        $month = sanitize($_POST['month']) + 1;

        $create_assessment = $connect->query("INSERT INTO assessments(school,period,name,month,type,subject,grade) VALUES($school_id,$period_id,'$assessment_name',$month,$type,$subject,$grade)");
    }
    //if exam remove month field on query
    elseif ($type == 2) {
        $create_assessment = $connect->query("INSERT INTO assessments(school,period,name,type,subject,grade) VALUES($school_id,$period_id,'$assessment_name',$type,$subject,$grade)");
    }



    //get id of newly created test
    //if test type is an exam dont check with month
    if ($type == 2) {
        $test_id_query = mysqli_fetch_assoc($connect->query("SELECT id FROM assessments WHERE school = $school_id AND period = $period_id AND name = '$assessment_name' AND type = $type AND subject = $subject and grade=$grade"));
    }
    //if test check assessment id with month
    else {
        $test_id_query = mysqli_fetch_assoc($connect->query("SELECT id FROM assessments WHERE school = $school_id AND period = $period_id AND name = '$assessment_name' AND month = $month AND type = $type AND subject = $subject and grade=$grade"));
    }

    $test_id = $test_id_query['id'];

    if ($create_assessment) {
        echo "ok";
    } else {
        echo "ko";
    }


    foreach ($students_taking_that_subject as $student) {
        //$stream = getStudentInfo($student['id'])['stream'];
        $insert = $connect->query("INSERT INTO marks(student_id,stream,test_id,subject,type,period) VALUES($student,$subject,$test_id,$subject,$type,$period_id)");
    }
}
