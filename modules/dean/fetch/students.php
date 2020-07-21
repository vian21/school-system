<?php

include("../../config.php");
include("../../functions.php");

$year = sanitize($_POST['year']);
$school = sanitize($_POST['school_id']);
$students = array();

$students_array = fetchAllStudents('all', $school);
if (!empty($students_array)) {
    foreach ($students_array as $column) {
        $students_sub_array = array();
        $students_sub_array['id'] = $column['id'];
        $students_sub_array['name'] = $column['name'];
        $students_sub_array['admission'] = $column['admissionID'];

        $students_sub_array['DOB'] = $column['DOB'];
        $students_sub_array['gender'] = $column['gender'];
        $grade = whatGrade($column['id'], $year);
        if ($grade != "") {
            $students_sub_array['stream'] = fetchStreamName($grade);
            $students_sub_array['subjects'] = fetchSubjectsLearnt($column['id'], $grade);
        } else {
            $students_sub_array['stream'] = "";
            $students_sub_array['subjects'] = "";
        }
        $students_sub_array['image'] = $column['image'];
        $students_sub_array['email'] = $column['email'];
        $students_sub_array['tel'] = $column['tel'];
        $students_sub_array['status'] = $column['status'];
        $students_sub_array['account_status'] = $column['account_status'];
        $students[] = $students_sub_array;
    }

    echoJson($students);
}
