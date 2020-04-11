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
        $year = $_POST['year'];
        $password=$_POST['password'];

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        //If new staff is a dean
        if ($type == 0) {
            $insertDean = $connect->query("INSERT INTO users(name,password,gender,email,tel,type,school) VALUES('$name','$hashedPassword',$gender,'$email','$tel',$type,$school_id)");
            if ($insertDean) {
                echo "ok";
            } else {
                echo "ko";
            }
        }

        //If new staff is a teacher
        if ($type == 1) {
            $grade = explode(',', $_POST['grade']);
            $insertTeacher = $connect->query("INSERT INTO users(name,password,gender,email,tel,type,school) VALUES('$name','$hashedPassword',$gender,'$email','$tel',$type,$school_id)");

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
                $insertGrade = $connect->query("INSERT INTO teaches(subject,teacher,year) VALUES($stream,$teacher_id,$year)");

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
