<?php
//school info

//update school name
if (isset($_GET['school_name']) and isset($_GET['id'])) {
    include 'config.php';

    $name = $_GET['school_name'];
    $id = $_GET['id'];

    $change = $connect->query("UPDATE info SET name='$name' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//update school type
if (isset($_GET['school_type']) and isset($_GET['id'])) {
    include 'config.php';

    $type = $_GET['school_type'];
    $id = $_GET['id'];

    $change = $connect->query("UPDATE info SET type='$type' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//student info

//student name
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

//student DOB
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

//student gender
if (isset($_GET['student_gender'])) {
    if ($_GET['gender'] != "" and is_numeric($_GET['gender']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
        include 'config.php';
        $id = $_GET['id'];
        $gender = $_GET['gender'];
        $change_gender = $connect->query("UPDATE students SET gender=$gender WHERE id=$id");
        if (!$change_gender) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//student grade
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

//update marks
if (isset($_GET['marks']) and isset($_POST['student_id']) and isset($_POST['mark']) and is_numeric($_POST['mark']) and is_numeric($_POST['student_id'])) {
    //echo "ok";
    include 'config.php';
    $student_id = mysqli_real_escape_string($connect, $_POST['student_id']);
    $mark = mysqli_real_escape_string($connect, $_POST['mark']);
    $test = mysqli_real_escape_string($connect, $_POST['test']);
    $update_marks = $connect->query("UPDATE marks SET marks=$mark where student_id=$student_id AND test_id=$test");
    if ($update_marks) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//Staff edits

//staff name
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

//staff gender
if (isset($_GET['staff_gender']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['gender'] != "") {
        include 'config.php';
        $gender = strip_tags(mysqli_real_escape_string($connect, $_GET['gender']));
        $id = $_GET['id'];
        $change_gender = $connect->query("UPDATE users SET gender='$gender' WHERE id=$id");
        if (!$change_gender) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//staff email
if (isset($_GET['staff_email']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['email'] != "") {
        include 'config.php';
        $email = strip_tags(mysqli_real_escape_string($connect, $_GET['email']));
        $id = $_GET['id'];
        $change_email = $connect->query("UPDATE users SET email='$email' WHERE id=$id");
        if (!$change_email) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//staff tel
if (isset($_GET['staff_tel']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['tel'] != "") {
        include 'config.php';
        $tel = strip_tags(mysqli_real_escape_string($connect, $_GET['tel']));
        $id = $_GET['id'];
        $change_tel = $connect->query("UPDATE users SET tel='$tel' WHERE id=$id");
        if (!$change_tel) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//staff type/title
if (isset($_GET['staff_title']) and isset($_GET['id']) and is_numeric($_GET['id'])) {
    if ($_GET['title'] != "") {
        include 'config.php';
        $title = strip_tags(mysqli_real_escape_string($connect, $_GET['title']));
        $id = $_GET['id'];
        $change_title = $connect->query("UPDATE users SET type='$title' WHERE id=$id");
        if (!$change_title) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//update grade
if (
    isset($_POST['id']) and
    isset($_POST['grade']) and
    isset($_POST['stream']) and
    is_numeric($_POST['id']) and
    is_numeric($_POST['grade'])
) {
    include 'config.php';

    $id = $_POST['id'];
    $grade = $_POST['grade'];
    $stream = $_POST['stream'];

    $update = $connect->query("UPDATE streams SET grade=$grade, stream='$stream' WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
