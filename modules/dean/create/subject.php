<?php


//insert subject
if (
    isset($_POST['name'])
    && isset($_POST['grade'])
    && isset($_POST['type'])
    && isset($_POST['hours'])
    && isset($_POST['id'])

    && !empty($_POST['name'])
    && !empty($_POST['grade'])
    && $_POST['type'] !== ''
    && !empty($_POST['hours'])
) {
    include("../../config.php");
    include("../../functions.php");

    $school_id = sanitize($_POST['id']);
    $subject_name = sanitize($_POST['name']);
    $grade = sanitize($_POST['grade']);
    $hours = sanitize($_POST['hours']);
    $type = sanitize($_POST['type']);


    $insert = $connect->query("INSERT INTO subjects(subject_name,school,stream,hours,type) VALUES('$subject_name',$school_id,$grade,$hours,$type)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}
