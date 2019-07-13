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
function fetchSubjectsTaughtId($id)
{
    include 'config.php';
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
    if (!empty($data)) {
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
function fetchStudentsMarks($id)
{
    include 'config.php';
    $getMarks = mysqli_fetch_assoc($connect->query("SELECT*FROM marks WHERE test_id=$id"));
    return returnValue($getMarks);
}
function fetchAllStudents()
{
    include 'config.php';
    $get_students = $connect->query("SELECT*FROM students");
    $students = array();
    while ($row = mysqli_fetch_assoc($get_students)) {
        $students_array = array();
        $students_array['id'] = $row['id'];
        $students_array['name'] = $row['name'];
        $students_array['image'] = $row['image'];
        $students_array['email'] = $row['email'];
        $students_array['tel'] = $row['tel'];
        $students_array['grade'] = $row['grade'];
        $students_array['DOB'] = $row['DOB'];
        $students_array['status'] = $row['status'];
        $students_array['account_status'] = $row['account_status'];
        $students[] = $students_array;
    }
    return returnValue($students);
}
//function to count students
// 1 : count all students in the school
// 2 : students in a certain grade
function countStudents($in, $stream_id)
{
    if ($in == 1) {
        include 'config.php';
        $count = mysqli_num_rows($connect->query("SELECT*FROM students"));
        return returnValue($count);
    }
    if ($in == 2) {
        $count = mysqli_num_rows($connect->query("SELECT*FROM students WHERE grade=$stream_id"));
        return returnValue($count);
    }
}

//function to count teachers
function countTeachers()
{
    include 'config.php';
    $count = mysqli_num_rows($connect->query("SELECT*FROM users WHERE type=2"));
    return returnValue($count);
}
function fetchAllTeachers()
{
    include 'config.php';
    $get_teachers = $connect->query("SELECT*FROM users WHERE type=2");
    $teachers = array();
    while ($row = mysqli_fetch_assoc($get_teachers)) {
        $teacher_array = array();
        $teacher_array['id'] = $row['id'];
        $teacher_array['name'] = $row['name'];
        $teacher_array['image'] = $row['image'];
        $teacher_array['email'] = $row['email'];
        $teacher_array['tel'] = $row['tel'];
        $teacher_array['type'] = $row['type'];
        $teachers[] = $teacher_array;
    }
    return returnValue($teachers);
}
function fetchAllStreams()
{
    include 'config.php';
    $get_streams = $connect->query("SELECT*FROM streams");
    $streams = array();
    while ($column = mysqli_fetch_assoc($get_streams)) {
        $stream_array = array();
        $stream_array['id'] = $column['id'];
        $stream_array['grade'] = $column['grade'];
        $stream_array['stream'] = $column['stream'];
        $streams[] = $stream_array;
    }
    return returnValue($streams);
}
function fetchAllSubjects()
{
    include 'config.php';
    $get_subjects = $connect->query("SELECT*FROM subjects");
    $subjects = array();
    while ($row = mysqli_fetch_assoc($get_subjects)) { 
        $subjects_array=array();
        $subjects_array['id']=$row['id'];
        $subjects_array['name']=$row['subject_name'];
        $subjects_array['stream']=$row['stream'];
        $subjects_array['type']=$row['type'];
        $subjects[]=$subjects_array;
    }
    return returnValue($subjects);
}
