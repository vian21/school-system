<?php
//school info

//update school name
if (
    isset($_GET['school_name']) and
    isset($_POST['id'])
) {
    include 'config.php';

    $name = $_POST['name'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET name='$name' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//update school type
if (
    isset($_GET['school_type']) and
    isset($_POST['id'])
) {
    include 'config.php';

    $type = $_POST['type'];
    $id = $_POST['id'];

    $change = $connect->query("UPDATE schools SET type='$type' WHERE id=$id");

    if ($change) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//student info

//student name
if (isset($_GET['student_name']) and isset($_POST['id']) and is_numeric($_POST['id'])) {
    if ($_POST['name'] != "") {
        include 'config.php';

        $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
        $id = $_POST['id'];

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
    if (
        $_POST['dob'] != "" and
        isset($_POST['id']) and
        is_numeric($_POST['id'])
    ) {
        include 'config.php';
        $id = $_POST['id'];
        $dob = $_POST['dob'];
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
    if (
        $_POST['gender'] !== '' and
        is_numeric($_POST['gender']) and
        isset($_POST['id']) and
        is_numeric($_POST['id'])
    ) {
        include 'config.php';

        $id = $_POST['id'];
        $gender = $_POST['gender'];

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
    if (
        $_POST['grade'] != "" and
        is_numeric($_POST['grade']) and
        isset($_POST['id']) and
        is_numeric($_POST['id'])
    ) {
        include 'config.php';

        $id = $_POST['id'];
        $grade = $_POST['grade'];

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
if (
    isset($_GET['staff_name']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['name'] != "") {
        include 'config.php';
        $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
        $id = $_POST['id'];
        $change_name = $connect->query("UPDATE users SET name='$name' WHERE id=$id");
        if (!$change_name) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//staff gender
if (
    isset($_GET['staff_gender']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['gender'] != "") {
        include 'config.php';
        $gender = strip_tags(mysqli_real_escape_string($connect, $_POST['gender']));
        $id = $_POST['id'];
        $change_gender = $connect->query("UPDATE users SET gender='$gender' WHERE id=$id");
        if (!$change_gender) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//staff email
if (
    isset($_GET['staff_email']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['email'] != "") {
        include 'config.php';
        $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
        $id = $_POST['id'];
        $change_email = $connect->query("UPDATE users SET email='$email' WHERE id=$id");
        if (!$change_email) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}

//staff tel
if (
    isset($_GET['staff_tel']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    include 'config.php';

    $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
    if ($tel == '') {
        $tel = ' ';
    }
    $id = $_POST['id'];
    $change_tel = $connect->query("UPDATE users SET tel='$tel' WHERE id=$id");
    if (!$change_tel) {
        echo "ko";
    } else {
        echo "ok";
    }
}

//staff type/title
if (
    isset($_GET['staff_title']) and
    isset($_POST['id']) and
    is_numeric($_POST['id'])
) {
    if ($_POST['title'] != "") {
        include 'config.php';
        $title = strip_tags(mysqli_real_escape_string($connect, $_POST['title']));
        $id = $_POST['id'];
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
    isset($_GET['grade']) and
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

//update subject
if (
    isset($_GET['subject']) and
    isset($_POST['id']) and
    isset($_POST['name']) and
    isset($_POST['grade']) and
    isset($_POST['type']) and
    isset($_POST['hours'])
) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $grade = $_POST['grade'];
    $type = $_POST['type'];
    $hours = $_POST['hours'];

    include 'config.php';

    $update = $connect->query("UPDATE subjects SET subject_name='$name', stream=$grade, hours=$hours, type=$type WHERE id=$id");

    if ($update) {
        echo 'ok';
    } else {
        echo 'ko';
    }
}
