<?php
if (isset($_GET['student_name']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['name'] != "") {
        include 'config.php';
        $name = strip_tags(mysqli_real_escape_string($connect, $_GET['name']));
        $id = $_GET['id'];
        $change_name = $connect->query("UPDATE students SET name='$name' WHERE id=$id");
        if (!$change_name) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
if (isset($_GET['student_dob'])) {
    if ($_GET['dob'] != "" and isset($_GET['id']) and is_numeric($_GET['id'])) {
        include 'config.php';
        $id = $_GET['id'];
        $dob = $_GET['dob'];
        $change_dob = $connect->query("UPDATE students SET DOB='$dob' WHERE id=$id");
        if (!$change_dob) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
if (isset($_GET['student_grade'])) {
    if ($_GET['grade'] != "" and is_numeric($_GET['grade']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
        include 'config.php';
        $id = $_GET['id'];
        $grade = $_GET['grade'];
        $change_grade = $connect->query("UPDATE students SET grade=$grade WHERE id=$id");
        if (!$change_grade) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
if (isset($_GET['marks']) and isset($_POST['student_id']) and isset($_POST['mark']) and is_numeric($_POST['mark']) and is_numeric($_POST['student_id'])) {
    //echo "ok";
    include 'config.php';
    $student_id = mysqli_real_escape_string($connect, $_POST['student_id']);
    $mark = mysqli_real_escape_string($connect, $_POST['mark']);

    $update_marks = $connect->query("UPDATE marks SET marks=$mark where student_id=$student_id");
    if ($update_marks) {
        echo "ok";
    } else {
        echo "ko";
    }
}



//Staff edits

if (isset($_GET['staff_name']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['name'] != "") {
        include 'config.php';
        $name = strip_tags(mysqli_real_escape_string($connect, $_GET['name']));
        $id = $_GET['id'];
        $change_name = $connect->query("UPDATE users SET name='$name' WHERE id=$id");
        if (!$change_name) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

if (isset($_GET['staff_email']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['email'] != "") {
        include 'config.php';
        $email = strip_tags(mysqli_real_escape_string($connect, $_GET['email']));
        $id = $_GET['id'];
        $change_name = $connect->query("UPDATE users SET email='$email' WHERE id=$id");
        if (!$change_name) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

if (isset($_GET['staff_tel']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['tel'] != "") {
        include 'config.php';
        $tel = strip_tags(mysqli_real_escape_string($connect, $_GET['tel']));
        $id = $_GET['id'];
        $change_name = $connect->query("UPDATE users SET tel='$tel' WHERE id=$id");
        if (!$change_name) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
