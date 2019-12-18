<?php
include("../../functions.php");
//Creating a student
//if (isset($_GET['student'])) {
if (
    isset($_POST['name']) and
    isset($_POST['grade']) and $_POST['name'] != "" and
    $_POST['grade'] != "" and
    is_numeric($_POST['grade'])
) {
    //echo "ok";
    include("../../config.php");

    $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
    $gender = mysqli_real_escape_string($connect, $_POST['gender']);
    $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
    $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
    $grade = mysqli_real_escape_string($connect, $_POST['grade']);
    $DOB = $_POST['DOB'];
    $period = mysqli_real_escape_string($connect, $_POST['period']);

    $insert = $connect->query("INSERT INTO students(name,gender,email,tel,grade,DOB) VALUES('$name',$gender,'$email','$tel','$grade','$DOB')");

    if (!$insert) {
        echo "ko";
    }
    if ($insert) {
        echo "ok";
    }

    //id of newly created student
    $id = $connect->insert_id;

    $compulsary_courses = fetchCompulsarySubjects($grade);

    foreach ($compulsary_courses as $subject) {
        $connect->query("INSERT INTO enrollment(student_id,subject,period) VALUES($id,$subject,$period)");
    }
}
//}