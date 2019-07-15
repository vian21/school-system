<?php
//include 'config.php';
//$hash=password_hash("123",PASSWORD_DEFAULT);
//$connect->query("INSERT INTO users(name,email,image,password,type) VALUES('Admin','admin@gmail.com','user.png','$hash',1)");
//echo "ok";
if (isset($_GET['student'])) {
    //echo "ok";
    //echo $_POST['name'];
    //echo $_POST['grade'];
    if (isset($_POST['name']) and isset($_POST['grade']) and $_POST['name'] != "" and $_POST['grade'] != "" and is_numeric($_POST['grade'])) {
        //echo "ok";
        include 'config.php';
        include 'functions.php';
        $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
        $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
        $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
        $grade = mysqli_real_escape_string($connect, $_POST['grade']);
        $DOB = $_POST['DOB'];
        $insert = $connect->query("INSERT INTO students(name,email,tel,grade,DOB) VALUES('$name','$email','$tel','$grade','$DOB')");
        if (!$insert) {
            echo "ko";
        }
        if ($insert) {
            echo "ok";
        }
    }
}
if (isset($_GET['staff'])) {
    //echo"test";
    if (isset($_POST['type']) and is_numeric($_POST['type'])) {
        include 'config.php';
        $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
        $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
        $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
        $type = $_POST['type'];
        //If new staff is a dean
        if ($type == 1) {
            $insertDean = $connect->query("INSERT INTO users(name,email,tel,type) VALUES('$name','$email','tel',$type)");
            if (!$insertDean) {
                echo "ko";
            } else {
                echo "ok";
            }
        }
        //If new staff is a teacher
        if ($type == 2) {
            $grade = explode(',', $_POST['grade']);
            $insertTeacher = $connect->query("INSERT INTO users(name,email,tel,type) VALUES('$name','$email','tel',$type)");
            if ($insertTeacher) {
                echo 'o';
            } else {
                echo 'K';
            }
            $fetch_teacher_id = mysqli_fetch_assoc($connect->query("SELECT id FROM users where name='$name' and type='$type' LIMIT 1"));
            $teacher_id = $fetch_teacher_id['id'];
            foreach ($grade as $stream) {
                $insertGrade = $connect->query("INSERT INTO teaches(subject,teacher,year) VALUES($stream,$teacher_id,1)");
                if ($insertGrade) {
                    $inserted = true;
                } else {
                    $inserted = false;
                }
                //echo $stream."\n";
            }
            if ($inserted == true) {
                echo 'k';
            } else {
                echo 'o';
            }
            // print_r($grade);
        }
    }
}
