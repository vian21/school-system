<?php
session_start();
/*if (isset($_GET['subjects'])) {
    include 'config.php';
    include 'functions.php';
    $id = $_SESSION['id'];
    $subjects_taught = $connect->query("SELECT subject FROM teaches WHERE teacher=$id");
    $data = array();
    foreach ($subjects_taught as $column) {
        $data[] = $column['subject'];
    }
    echoJson($data);
}

if (isset($_GET['grades'])) {
    include 'config.php';
    include 'functions.php';
    $id = $_SESSION['id'];
    $subjects_taught = $connect->query("SELECT subject FROM teaches WHERE teacher=$id");
    $data = array();
    foreach ($subjects_taught as $column) {
        $subject_id = $column['subject'];
        $select_grade = $connect->query("SELECT stream FROM subjects WHERE id=$subject_id");
        $sub_data=array();
        foreach ($select_grade as $grade) { 
            $stream=$grade['stream'];
            $queryStream=$connect->query("SELECT* FROM streams WHERE id=$stream");
            foreach($queryStream as $streams){
                $sub_data[]=$streams['grade'];
                $sub_data[]=$streams['stream'];
                $data[]=$sub_data;
            }
        }
    }
    echoJson($data);
}
if(isset($_GET['tests'])){
    include 'config.php';
    include 'functions.php';
    $subjects_taught = $connect->query("SELECT subject FROM teaches WHERE teacher=$id");
    $data = array();
    foreach ($subjects_taught as $column) {
        
    }
}*/
if (isset($_GET['form_options'])) {
    include 'config.php';
    include 'functions.php';
    //$id = $_SESSION['id'];
    $subjects_ids = fetchSubjectsTaughtId();

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
    //if ($_POST['test'] !== "" and is_numeric($_POST['test'])) {
        include 'functions.php';
        $test_id = $_POST['test'];
        $result = array(fetchStudentsMarks($test_id));
        $form_data=array();
        foreach ($result as $column) {
            $student_id=$column['student_id'];
            $sub_form_Data['id']=$student_id;
            $sub_form_Data['name']=fetchName(2,$student_id);
            $sub_form_Data['marks']=$column['marks'];
            $form_Data[]=$sub_form_Data;
         }
         echoJson($form_Data);
    //}
}
