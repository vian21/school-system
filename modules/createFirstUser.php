<?php

function createSchool($name, $type)
{
    include 'config.php';

    $connect->query("INSERT INTO schools(name,type) VALUES('$name',$type)");
}

function createAdmin($name, $email, $password)
{
    include 'config.php';

    $hashedPassword =  

    $uniqueID = uniqid('', true);

    $create = $connect->query("INSERT INTO users(name,uniqueID,gender,email,password,type,status) VALUES('$name','$uniqueID',0,'$email','$hashedPassword',0,1)");

    if ($create) {
        echo "<h1>Admin created.</h1>";
    } else {
        echo "Failed to create admin";
    }
}

function createDean($name, $email, $password)
{
    include 'config.php';

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $create = $connect->query("INSERT INTO users(name,gender,email,password,type,status,school) VALUES('$name',0,'$email','$hashedPassword',1,1,1)");

    if ($create) {
        echo "<h1>Admin created.</h1>";
        createSchool('School 101', 0);
    } else {
        echo "Failed to create admin";
    }
}

function createTeacher($name, $email, $password)
{
    include 'config.php';

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $create = $connect->query("INSERT INTO users(name,gender,email,password,type,status,school) VALUES('$name',0,'$email','$hashedPassword',2,1,1)");

    if ($create) {
        echo "<h1>teacher created.</h1>";
    } else {
        echo "Failed to create teacher";
    }
}
//createAdmin('admin', 'admin@gmail.com', '123');

//createTeacher('patrick', 'teacher@gmail.com', '123');
//createDean('admin', 'admin@gmail.com', '123');
