<?php
include '../../config.php';
include '../../functions.php';


$school_id=$_POST['id'];

$get_grading = $connect->query("SELECT*FROM grading WHERE school_id=$school_id");
$grading = array();

while ($row = mysqli_fetch_assoc($get_grading)) {
    $grading_array = array();
    $grading_array['id'] = $row['id'];
    $grading_array['max'] = $row['max'];
    $grading_array['min'] = $row['min'];
    $grading_array['grade'] = $row['grade'];
    $grading_array['gpa'] = $row['gpa'];
    $grading[] = $grading_array;
}
echoJson($grading);