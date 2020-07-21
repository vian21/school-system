<?php
include("../../config.php");
include("../../functions.php");

$school_id = sanitize($_POST['school_id']);
if (isset($_POST['start']) and isset($_POST['end'])) {

    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);
}

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
    $subjects = array();

    if ($column['type'] == 2) {
        if (isset($_POST['start']) and isset($_POST['end'])) {

            $subjects_taught = fetchSubjectsTaughtId($column['id'], $start, $end);
            if (!empty($subjects_taught)) {

                foreach ($subjects_taught as $row) {
                    $sub_array = array();
                    $sub_array['id'] = $row;
                    $sub_array['subject'] = fetchSubjectName($row);
                    $sub_array['stream'] = fetchStreamName(fetchStreamsId($row));
                    //$sub_array[]=$row;
                    $subjects[] = $sub_array;
                }
            }
        }
    }
    $teachers_sub_array['subjects'] = $subjects;


    $teachers_sub_array['type'] = $column['type'];
    $teachers[] = $teachers_sub_array;
}

echoJson($teachers);
