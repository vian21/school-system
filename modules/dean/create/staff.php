<?php

//Creating a new staff
if (isset($_POST['type']) and is_numeric($_POST['type'])) {
    include("../../config.php");

    $name = strip_tags(mysqli_real_escape_string($connect, $_POST['name']));
    $gender = strip_tags(mysqli_real_escape_string($connect, $_POST['gender']));
    $school_id = strip_tags(mysqli_real_escape_string($connect, $_POST['school']));
    $email = strip_tags(mysqli_real_escape_string($connect, $_POST['email']));
    $tel = strip_tags(mysqli_real_escape_string($connect, $_POST['tel']));
    $type = $_POST['type'];
    $start = $_POST['start'];
    $end = $_POST['end'];

    $password = $_POST['password'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $uniqueID=uniqid('',true);


    //If new staff is a dean
    if ($type == 1) {
        $insertDean = $connect->query("INSERT INTO users(name,uniqueID,password,gender,email,tel,type,school) VALUES('$name','$uniqueID','$hashedPassword',$gender,'$email','$tel',$type,$school_id)");
        if ($insertDean) {
            echo "ok";
        } else {
            echo "ko";
        }
    }

    //If new staff is a accountant
    if ($type == 3) {
        $insertAccountant = $connect->query("INSERT INTO users(name,uniqueID,password,gender,email,tel,type,school) VALUES('$name','$uniqueID','$hashedPassword',$gender,'$email','$tel',$type,$school_id)");
        if ($insertAccountant) {
            echo "ok";
        } else {
            echo "ko";
        }
    }

    //If new staff is a teacher
    if ($type == 2) {
        $insertTeacher = $connect->query("INSERT INTO users(name,uniqueID,password,gender,email,tel,type,school) VALUES('$name','$uniqueID','$hashedPassword',$gender,'$email','$tel',$type,$school_id)");

        if ($insertTeacher) {
            echo 'ok';
        } else {
            echo 'ko';
        }
        if (isset($_POST['grade'])) {
            $grade = explode(',', $_POST['grade']);
            //query to get the assigned id of the new user in database
            $fetch_teacher_id = mysqli_fetch_assoc($connect->query("SELECT id FROM users where name='$name' and type='$type' LIMIT 1"));

            //assign that user id to a variable
            $teacher_id = $fetch_teacher_id['id'];

            //loop through and insert the grades taught in database
            foreach ($grade as $stream) {
                $insertGrade = $connect->query("INSERT INTO teaches(subject,teacher,start,end) VALUES($stream,$teacher_id,$start,$end)");

                /* Used an a variable outside loop so that it will not echo multiple times the response
                 * The variable is used afterwards outsde the loop to echo a message.
                 */

                if ($insertGrade) {
                    $inserted = true;
                } else {
                    $inserted = false;
                }
            }

        }
    }
}
