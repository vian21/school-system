<?php

//Creating a student
if (isset($_GET['student'])) {
    if (isset($_POST['name']) and isset($_POST['grade']) and $_POST['name'] != "" and $_POST['grade'] != "" and is_numeric($_POST['grade'])) {
        //echo "ok";
        include 'config.php';
        include 'functions.php';

        $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
        $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
        $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
        $grade = mysqli_real_escape_string($connect, $_POST['grade']);
        $DOB = $_POST['DOB'];
        $period = mysqli_real_escape_string($connect, $_POST['period']);

        $insert = $connect->query("INSERT INTO students(name,email,tel,grade,DOB) VALUES('$name','$email','$tel','$grade','$DOB')");

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
}

//Creating a new staff
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
            }
            if ($inserted == true) {
                echo 'k';
            } else {
                echo 'o';
            }
        }
    }
}

//Creating a new assessement and records in the marks table
if (isset($_GET['assessment']) and isset($_POST['type']) and isset($_POST['subject']) and is_numeric($_POST['subject']) and is_numeric($_POST['type']) and isset($_POST['period']) and is_numeric($_POST['period']) and isset($_POST['name']) and is_numeric($_POST['subject'])) {
    include 'config.php';
    include 'functions.php';

    $subject = mysqli_real_escape_string($connect, $_POST['subject']);
    $type = mysqli_real_escape_string($connect, $_POST['type']);
    $period_id = mysqli_real_escape_string($connect, $_POST['period']);
    $period_name = mysqli_real_escape_string($connect, $_POST['name']);
    $students_taking_that_subject = fetchStudentsTaking($subject, $period_id);
    $month = "";

    if ($type == 1) {
        $month = mysqli_real_escape_string($connect, $_POST['month']) + 1;
    }

    $create_assessment = $connect->query("INSERT INTO assessments(period,name,month,type,subject) VALUES($period_id,'$period_name',$month,$type,$subject)");

    //get id of newly created test
    $test_id = $connect->insert_id;


    if ($create_assessment) {
        echo "ok";
    } else {
        echo "ko";
    }

    foreach ($students_taking_that_subject as $student) {
        //$stream = getStudentInfo($student['id'])['stream'];
        $insert = $connect->query("INSERT INTO marks(student_id,stream,test_id) VALUES($student,$subject,$test_id)");
    }
}
