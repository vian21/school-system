<?php

if (isset($_POST['period'])) {
    include '../../config.php';

    $period = $_POST['period'];
    $student = $_POST['student'];

    $subjectsQuery = $connect->query("SELECT * FROM enrollment WHERE student_id =$student and period=$period");

    $subjects = array();

    while ($row = mysqli_fetch_assoc($subjectsQuery)) {
        $subject = array();

        $subject_id = $row['subject'];
        $subject_name = fetchSubjectName($subject_id);

        $subject['id'] = $subject_id;
        $subject['name'] = $subject_name;

        $testQuery = $connect->query("SELECT * FROM marks WHERE student_id=$student and period=$period and subject=$subject_id");

        $tests = array();
        while ($testRow = mysqli_fetch_assoc($testQuery)) {
            $test = array();

            $test['id'] = $testRow['id'];

            $test_id = $testRow['test_id'];
            $test_name = fetchTestNames($test_id);
            $test['name'] = $test_name;

            $test['marks'] = $testRow['marks'];

            $tests[] = $test;
        }

        $subject['test'] = $tests;

        $subjects[] = $subject;
    }
    echoJson($subjects);
}
