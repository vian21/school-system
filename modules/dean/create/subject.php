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
    && $_POST['type']!==''
    && !empty($_POST['hours'])
) {

    $school_id = $_POST['id'];
    $subject_name = $_POST['name'];
    $grade = $_POST['grade'];
    $hours = $_POST['hours'];
    $type = $_POST['type'];

    include("../../config.php");

    $insert = $connect->query("INSERT INTO subjects(subject_name,school,stream,hours,type) VALUES('$subject_name',$school_id,$grade,$hours,$type)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}