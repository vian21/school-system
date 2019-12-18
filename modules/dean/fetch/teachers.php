<?php
   include("../../functions.php");

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
