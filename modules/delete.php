<?php
//delete staff
if (isset($_GET['staff']) and is_numeric($_GET['staff'])) {
    include 'config.php';

    $id = $_GET['staff'];

    $delete = $connect->query("DELETE FROM users WHERE id =$id");

    $deleteSubjectsTaught = $connect->query("DELETE FROM teaches  where teacher = $id");
    
    if ($delete and $deleteSubjectsTaught) {
        echo "ok";
    } else {
        echo "ko";
    }
}
//delete student
if (isset($_GET['student']) and is_numeric($_GET['student'])) {
    include 'config.php';

    $id = $_GET['student'];

    $delete = $connect->query("DELETE FROM students WHERE id =$id");

    $deleteEnrollemnts = $connect->query("DELETE FROM enrollment  where student_id=$id");

    if ($delete and $deleteEnrollemnts) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//delete assessment
if (isset($_POST['assessment']) and isset($_POST['id'])) {
    include 'config.php';

    $id = $_POST['id'];

    $delete_assement = $connect->query("DELETE FROM assessments WHERE id=$id");

    $delete_marks = $connect->query("DELETE FROM marks WHERE test_id=$id");

    if ($delete_assement and $delete_marks) {
        echo 'ok';
    } else {
        echo "ko";
    }
}

//delete grade
if (
    isset($_POST['grade']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include 'config.php';

    $id = $_POST['id'];

    $delete = $connect->query("DELETE FROM streams WHERE id=$id");

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}

//delete subject
if (
    isset($_POST['subject']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include 'config.php';

    $id = $_POST['id'];

    $delete = $connect->query("DELETE FROM subjects WHERE id=$id");

    if ($delete) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
