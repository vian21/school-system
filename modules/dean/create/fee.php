<?php

if (isset($_POST['school'])) {
    include("../../config.php");
    include("../../functions.php");

    $school = sanitize($_POST['school']);
    $item = sanitize($_POST['item']);
    $amount = sanitize($_POST['amount']);
    $type = sanitize($_POST['type']);
    $to = sanitize($_POST['to']);

    $date = date('Y-m-d');

    //whole school fee
    if ($to == 0) {

        $students = fetchAllStudents('all', $school);

        if (!empty($students)) {

            foreach ($students as $row) {
                $student = $row['id'];
                $transact = $connect->query("INSERT INTO accounting(student_id,date,item,amount,type) VALUES($student,'$date','$item',$amount,$type)");
            }

            echo "ok";
        }
    }

    if ($to == 1) {
        $grades = explode(',', $_POST['grade']);

        foreach ($grades as $grade) {

            $students = fetchAllStudents($grade, $school);

            if (!empty($students)) {

                foreach ($students as $row) {

                    $student = $row['id'];

                    $transact = $connect->query("INSERT INTO accounting(student_id,date,item,amount,type) VALUES($student,'$date','$item',$amount,$type)");
                }
            }
        }

        echo "ok";
    }
}
