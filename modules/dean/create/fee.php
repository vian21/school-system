<?php

if (isset($_POST['school'])) {
    include("../../config.php");
    include("../../functions.php");

    $school = $_POST['school'];
    $item = $_POST['item'];
    $amount = $_POST['amount'];
    $type = $_POST['type'];
    $to = $_POST['to'];

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
