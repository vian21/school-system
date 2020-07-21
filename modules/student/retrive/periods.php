<?php

if (isset($_POST['student'])) {
    include '../../config.php';

    $student = $_POST['student'];

    $periodQuery = $connect->query("SELECT * FROM academic_enrollments WHERE student=$student ORDER BY id DESC");

    $periods = array();
    while ($row = mysqli_fetch_assoc($periodQuery)) {
        $period = array();

        $period_id = $row['year'];
        $grade = $row['grade'];

        $periodInfo = $connect->query("SELECT * FROM academic_periods WHERE id=$period_id");

        $info = array();
        while ($time = mysqli_fetch_assoc($periodInfo)) {
            $info['id'] = $time['id'];
            $info['name'] = $time['start'] . '-' . $time['end'] . ' ' . $time['name'];
            $info['period_name'] = $time['name'];

            $info['start'] = $time['start'];
            $info['end'] = $time['end'];
            $info['grade'] = $grade;
            
        }

        //period info
        $period[] = $info;

        //tests done
        $tests = array();

        $testQuery = $connect->query("SELECT * FROM assessments where period=$period_id and grade=$grade");

        while ($quiz = mysqli_fetch_assoc($testQuery)) {
            $test = array();
            $test['id'] = $quiz['id'];
            $test['name'] = $quiz['name'];
            $tests[] = $test;
        }
        $period[] = $tests;


        $periods[] = $period;
    }

    echoJson($periods);
}
