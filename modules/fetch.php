<?php
session_start();
if (isset($_GET['form_options'])) {
    include 'config.php';
    include 'functions.php';

    $id = $_SESSION['id'];

    $subjects_ids = fetchSubjectsTaughtId($id);
    $school_id=$_POST['id'];

    //print_r($subjects_ids,true);
    $form_Data = array();

    foreach ($subjects_ids as $row) {
        $sub_form_data = array();
        $sub_form_Data['id'] = $row;  //The id of the subject taught
        $sub_form_Data['name'] = fetchSubjectName($row);    //The name of the subject taught
        $sub_form_Data['stream_id'] = fetchStreamsId($row);  //The id of the streams taught your subject
        $stream_ids = fetchStreamsId($row);
        $period = mysqli_real_escape_string($connect, $_GET['teachers_period']);
        $stream_names = fetchStreamName($stream_ids);

        $sub_form_Data['stream_name'] = $stream_names;

        $tests_done = fetchTestsDone($row,$school_id, $period);  //The ids of the tests done

        $sub_form_Data['test_id'] = $tests_done;
        //echoJson($tests_done);
        $test_names = array();

        if (!empty($tests_done)) {
            foreach ($tests_done as $test) {
                $test_names[] = fetchTestNames($test);
                //echo $test;
                //echo fetchTestNames($test);
            }
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

        if (!empty($result)) {
            while ($column = mysqli_fetch_assoc($result)) {
                $student_id = $column['student_id'];
                $sub_form_Data['id'] = $student_id;
                $sub_form_Data['name'] = fetchName(2, $student_id);
                $sub_form_Data['marks'] = $column['marks'];
                $form_Data[] = $sub_form_Data;
            }

            if (!empty($form_Data)) {
                echoJson($form_Data);
            }
        }
    }
}

if (isset($_GET['allStudents'])) {
    include 'functions.php';

    $students = array();
    $students_array = fetchAllStudents('all');

    foreach ($students_array as $column) {
        $students_sub_array = array();
        $students_sub_array['id'] = $column['id'];
        $students_sub_array['name'] = $column['name'];
        $students_sub_array['gender'] = $column['gender'];
        $students_sub_array['image'] = $column['image'];
        $students_sub_array['email'] = $column['email'];
        $students_sub_array['tel'] = $column['tel'];
        $students_sub_array['stream'] = fetchStreamName($column['grade']);
        $students_sub_array['DOB'] = $column['DOB'];
        $students_sub_array['status'] = $column['status'];
        $students_sub_array['account_status'] = $column['account_status'];
        $students[] = $students_sub_array;
    }

    echoJson($students);
}

if (isset($_GET['allteachers'])) {
    include 'functions.php';

    $school_id = $_GET['school_id'];
    $teachers = array();
    $teachers_array = fetchAllTeachers($school_id);

    foreach ($teachers_array as $column) {
        $teachers_sub_array = array();
        $teachers_sub_array['id'] = $column['id'];
        $teachers_sub_array['name'] = $column['name'];
        $teachers_sub_array['email'] = $column['email'];
        $teachers_sub_array['gender'] = $column['gender'];
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

    $school_id = $_POST['id'];
    echoJson(fetchAllSubjects('all', $school_id));
}

//fetch tests done in a specific period
if (
    isset($_GET['tests']) and
    $_POST['period'] !== "" and
    is_numeric($_POST['period'])
) {
    include 'config.php';
    include 'functions.php';

    $school_id = $_POST['school'];
    $period = mysqli_real_escape_string($connect, $_POST['period']);

    echoJson(fetchTestsDone('all', $school_id, $period));
}

//fetching terms for specific school
if (
    isset($_GET['periods']) and
    isset($_POST['id'])
) {
    include 'functions.php';

    $school_id = $_POST['id'];

    /*$academic_years = fetchAcademicYears($school_id);

    while ($row = mysqli_fetch_assoc($academic_years)) {
        //fetch periods in that year
        $sub_array = array();
        $sub_array['id'] = $row['id'];
        $sub_array['year'] = $row['time'];
        $sub_array['periods'] = fetchPeriods($row['id']);
        $periods[] = $sub_array;
    }*/

    echoJson(fetchAcademicPeriods($school_id));
}

//fetching all school information i.e: name,email,website
if (
    isset($_GET['school_info']) and
    isset($_POST['user']) and
    is_numeric($_POST['user'])
) {
    include 'functions.php';
    $user_id = $_POST['user'];
    $school_id = getSchoolId($user_id);
    echoJson(fetchSchoolInfo($school_id));
}
