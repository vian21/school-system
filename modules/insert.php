<?php

//Creating a student
//if (isset($_GET['student'])) {
if (
    isset($_GET['student']) and
    isset($_POST['name']) and
    isset($_POST['grade']) and $_POST['name'] != "" and
    $_POST['grade'] != "" and
    is_numeric($_POST['grade'])
) {
    //echo "ok";
    include 'config.php';
    include 'functions.php';

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

//Creating a new staff
if (isset($_GET['staff'])) {
    //echo"test";
    if (isset($_POST['type']) and is_numeric($_POST['type'])) {
        include 'config.php';

        $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
        $gender = strip_tags(mysqli_real_escape_string($connect, $_POST['gender']));
        $school_id = strip_tags(mysqli_real_escape_string($connect, $_POST['school']));
        $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
        $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
        $type = $_POST['type'];

        //If new staff is a dean
        if ($type == 0) {
            $insertDean = $connect->query("INSERT INTO users(name,gender,email,tel,type,school) VALUES('$name',$gender,'$email','$tel',$type,$school_id)");
            if ($insertDean) {
                echo "ok";
            } else {
                echo "ko";
            }
        }

        //If new staff is a teacher
        if ($type == 1) {
            $grade = explode(',', $_POST['grade']);
            $insertTeacher = $connect->query("INSERT INTO users(name,email,tel,type) VALUES('$name','$email','$tel',$type)");

            if ($insertTeacher) {
                echo 'o';
            } else {
                echo 'K';
            }

            //query to get the assigned id of the new user in database
            $fetch_teacher_id = mysqli_fetch_assoc($connect->query("SELECT id FROM users where name='$name' and type='$type' LIMIT 1"));

            //assign that user id to a variable
            $teacher_id = $fetch_teacher_id['id'];

            //loop through and insert the grades taught in database
            foreach ($grade as $stream) {
                $insertGrade = $connect->query("INSERT INTO teaches(subject,teacher,year) VALUES($stream,$teacher_id,1)");

                /* Used an a variable outside loop so that it will not echo multiple times the response
                 * The variable is used afterwards outsde the loop to echo a message.
                 */

                if ($insertGrade) {
                    $inserted = true;
                } else {
                    $inserted = false;
                }
            }

            //if the grades were all successfully inserted echo a message 
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

//insert subject
if (
    isset($_GET['subject'])
    && isset($_POST['name'])
    && isset($_POST['grade'])
    && isset($_POST['type'])
    && isset($_POST['hours'])
    && isset($_POST['id'])

    && !empty($_POST['name'])
    && !empty($_POST['grade'])
    && !empty($_POST['type'])
    && !empty($_POST['hours'])
) {
    $school_id=$_POST['id'];
    $subject_name = $_POST['name'];
    $grade = $_POST['grade'];
    $hours = $_POST['hours'];
    $type = $_POST['type'];

    include 'config.php';

    $insert = $connect->query("INSERT INTO subjects(subject_name,school,stream,hours,type) VALUES('$subject_name',$school_id,$grade,$hours,$type)");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}

//insert stream | grade
if (
    isset($_GET['stream'])
    && isset($_POST['grade'])
    && isset($_POST['stream'])

    && !empty($_POST['grade'])
    && !empty($_POST['stream'])

) {
    $grade = $_POST['grade'];
    $stream = $_POST['stream'];

    include 'config.php';

    $insert = $connect->query("INSERT INTO streams(grade,stream) VALUES($grade,'$stream')");

    if ($insert) {
        echo "ok";
    } else {
        echo "ko";
    }
}
