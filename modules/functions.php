<?php
//Database connection
include 'config.php';
//Functions
/*
 * Fetch name using id 
 * Parameter 1 : level
 *      1 : staff
 *      2 : student
 * parameter 2 : id
 */
//Database connection
function fetchName($level, $id)
{
    include 'config.php';

    if ($level == 1) {

        $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM users where id=$id"));
        //echo $getName['name'];
        return returnValue($getName['name']);
    }
    if ($level == 2) {
        $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM students where id=$id"));
        return returnValue($getName['name']);
    }
}
function fetchImage($level, $id)
{
    include 'config.php';
    if ($level == 1) {
        $getImage = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$id"));
        return returnValue($getImage['image']);
    }
    if ($level == 2) {
        $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM students WHERE id=$id"));
        return returnValue($getImage['image']);
    }
}
function fetchJobTitle($id)
{
    include 'config.php';
    $getTitle = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$id"));
    if ($getTitle['type'] == 1) {
        return "Dean";
    }
    if ($getTitle['type'] == 2) {
        return "Teacher";
    }
}
function fetchSubjectName($subject_id)
{
    include 'config.php';
    $getSubject_name = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject_id"));
    return returnValue($getSubject_name['subject_name']);
}
function echoJson($data)
{
    if ($data != "") {
        echo json_encode($data);
    } else {
        echo " ";
    }
}
function fetchSubjectsTaughtId()
{
    include 'config.php';
    $id = $_SESSION['id'];
    $subjects_taught_id = $connect->query("SELECT subject FROM teaches WHERE teacher=$id");
    $subjects_taught_array = array();
    while ($row = mysqli_fetch_assoc($subjects_taught_id)) {
        $subjects_taught_array[] = $row['subject'];
    }
    return returnValue($subjects_taught_array);
}
function fetchTestsDone($subject_id)
{
    include 'config.php';
    $select_test = mysqli_fetch_assoc($connect->query("SELECT id FROM assessments WHERE subject=$subject_id"));
    return returnValue($select_test['id']);
}
function returnValue($data)
{
    if ($data != "") {
        return $data;
    } else {
        return " ";
    }
}
function fetchTestNames($subject_id)
{
    include 'config.php';
    $select_test_names = mysqli_fetch_assoc($connect->query("SELECT name FROM assessments WHERE subject=$subject_id"));
    return returnValue($select_test_names['name']);
}
function fetchStreamsId($subject_id)
{
    include 'config.php';
    $select_streams_id = mysqli_fetch_assoc($connect->query("SELECT stream FROM subjects where id=$subject_id"));
    return returnValue($select_streams_id['stream']);
}
function fetchStreamName($stream_id)
{
    include 'config.php';
    $select_stream_name = mysqli_fetch_assoc($connect->query("SELECT*FROM streams WHERE id=$stream_id"));
    return returnValue($select_stream_name);    //array(grade + stream)
}
function fetchStudentsMarks($id){
    include 'config.php';
    $getMarks=mysqli_fetch_assoc($connect->query("SELECT*FROM marks WHERE test_id=$id"));
    return returnValue($getMarks);
}
