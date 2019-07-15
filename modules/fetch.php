<?php
session_start();
if (isset($_GET['form_options'])) {
    include 'config.php';
    include 'functions.php';
    $id = $_SESSION['id'];
    $subjects_ids = fetchSubjectsTaughtId($id);

    //print_r($subjects_ids,true);
    $form_Data = array();
    foreach ($subjects_ids as $row) {
        $sub_form_data = array();
        $sub_form_Data['id'] = $row;  //The id of the subject taught
        $sub_form_Data['name'] = fetchSubjectName($row);    //The name of the subject taught
        $sub_form_Data['stream_id'] = fetchStreamsId($row);  //The id of the streams taught your subject
        $stream_ids = fetchStreamsId($row);

        $stream_names = fetchStreamName($stream_ids);

        $sub_form_Data['stream_name'] = $stream_names;
        $sub_form_Data['test_id'] = fetchTestsDone($row);
        $tests_done = fetchTestsDone($row);  //The ids of the tests done
        if ($tests_done != 0) {
            $test_names = fetchTestNames($tests_done);
        } else {
            $test_names = "";
        }


        $sub_form_Data['test_name'] = $test_names;
        $form_Data[] = $sub_form_Data;
        //echo $row;
        unset($sub_form_Data);  //Reset the array to avoid double entries
        //echo print_r($sub_form_Data);
        //echo $row;
    }
    echoJson($form_Data);
    //echo print_r($stream_ids);
}
if (isset($_POST['test'])) {
    if ($_POST['test'] !== "" and is_numeric($_POST['test'])) {
        include 'functions.php';
        $test_id = $_POST['test'];
        $result = fetchStudentsMarks($test_id);
        $form_data = array();
        while ($column = mysqli_fetch_assoc($result)) {
            $student_id = $column['student_id'];
            $sub_form_Data['id'] = $student_id;
            $sub_form_Data['name'] = fetchName(2, $student_id);
            $sub_form_Data['marks'] = $column['marks'];
            $form_Data[] = $sub_form_Data;
        }
        echoJson($form_Data);
    }
}

if (isset($_GET['allStudents'])) {
    include 'functions.php';
    $students = array();
    $students_array = fetchAllStudents();
    //print_r($students_array);
    foreach ($students_array as $column) {
        $students_sub_array = array();
        $students_sub_array['id'] = $column['id'];
        $students_sub_array['name'] = $column['name'];
        $students_sub_array['image'] = $column['image'];
        $students_sub_array['email'] = $column['email'];
        $students_sub_array['tel'] = $column['tel'];
        //$students_sub_array['stream_id'] = $column['grade'];
        $students_sub_array['stream'] = fetchStreamName($column['grade']);
        $students_sub_array['DOB'] = $column['DOB'];
        $students_sub_array['status'] = $column['status'];
        $students_sub_array['account_status'] = $column['account_status'];
        $students[] = $students_sub_array;
        //unset($students_sub_array);
    }
    echoJson($students);
}
if (isset($_GET['allteachers'])) {
    include 'functions.php';
    $teachers = array();
    $teachers_array = fetchAllTeachers();
    foreach ($teachers_array as $column) {
        $teachers_sub_array = array();
        $teachers_sub_array['id'] = $column['id'];
        $teachers_sub_array['name'] = $column['name'];
        $teachers_sub_array['email'] = $column['email'];
        $teachers_sub_array['tel'] = $column['tel'];
        $teachers_sub_array['image'] = $column['image'];
        $teachers_sub_array['subjects'] = array(fetchSubjectsTaughtId($column['id']));
        $teachers_sub_array['type'] = $column['type'];
        $teachers[] = $teachers_sub_array;
    }
    echoJson($teachers);
}
if (isset($_GET['streams'])) {
    include "functions.php";
    echoJson(fetchAllStreams());
}
if (isset($_GET['subjects'])) {
    include 'functions.php';
    echoJson(fetchAllSubjects());
}
if (isset($_GET['tests'])) {
    include 'functions.php';
    echoJson(fetchTestsDone('all'));
}
if(isset($_GET['all_academic_years'])){
    include 'functions.php';
    $academic_years=fetchAcademicYears();
    $years=array();
    while($row=mysqli_fetch_assoc($academic_years)){
        $year_sub_array=array();
        $year_sub_array['id']=$row['id'];
        $year_sub_array['year']=$row['time'];
        $years[]=$year_sub_array;
    }
    echoJson($years);
}
if (isset($_GET['periods'])) {
    include 'functions.php';
    $academic_years=fetchAcademicYears();
   while($row=mysqli_fetch_assoc($academic_years)){

   }
}
