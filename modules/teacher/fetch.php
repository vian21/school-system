<?php
session_start();
if (isset($_GET['form_options'])) {
    include 'config.php';
    include 'functions.php';

    $id = $_SESSION['id'];

    $subjects_ids = fetchSubjectsTaughtId($id);
    $school_id = $_POST['id'];

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

        $tests_done = fetchTestsDone($row, $school_id, $period);  //The ids of the tests done

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





