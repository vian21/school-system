<?php
include("../../config.php");
include("../../functions.php");

$teacher_id = $_POST['user'];
$year = $_POST['year'];

$get_subjects = $connect->query("SELECT*FROM teaches WHERE teacher=$teacher_id and year=$year");
$array=array();
foreach($get_subjects as $row){
    $sub_array=array();
    $sub_array['id']=$row['subject'];
    //name of subject
    $sub_array['subject']=fetchSubjectName($row['subject']);
    //fetch stream id
    $stream_id=fetchStreamsId($row['subject']);
    $sub_array['stream']= $stream_id;
    //fetch stream name

    $sub_array['name']=fetchStreamName($stream_id);
    $array[]=$sub_array;
}

echoJson($array);