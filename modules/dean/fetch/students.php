<?php

include("../../functions.php");

    $students = array();
    $students_array = fetchAllStudents('all');

    if (!empty($students_array)) {
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
