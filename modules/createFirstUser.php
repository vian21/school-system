<?php
//generate unique id for user. to be used when creating user
$uniqueID = uniqid('', true);

function createSchool($name, $type)
{
    include 'config.php';

    $connect->query("INSERT INTO schools(name,type) VALUES('$name',$type)");
}

function createAdmin($name, $email, $password)
{
    include 'config.php';

    $hashedPassword =  password_hash($password, PASSWORD_DEFAULT);

    $create = $connect->query("INSERT INTO users(name,uniqueID,gender,email,password,type,status,school) VALUES('$name','$uniqueID',0,'$email','$hashedPassword',0,1,0)");

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

    $create = $connect->query("INSERT INTO users(name,uniqueID,gender,email,password,type,status,school) VALUES('$name','$uniqueID',0,'$email','$hashedPassword',1,1,1)");

    if ($create) {
        echo "<h1>Dean created.</h1>";
        createSchool('School 101', 0);
    } else {
        echo "Failed to create dean";
    }
}

function createTeacher($name, $email, $password, $school)
{
    include 'config.php';

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $create = $connect->query("INSERT INTO users(name,uniqueID,gender,email,password,type,status,school) VALUES('$name','$uniqueID',0,'$email','$hashedPassword',2,1,$school)");

    if ($create) {
        echo "<h1>Teacher created.</h1>";
    } else {
        echo "Failed to create teacher";
    }
}

/**
 * Call these functions to create first users
 */

// createAdmin('patrick', 'patrick@gmail.com', '123');

//createTeacher('patrick', 'teacher@gmail.com', '123');
// createDean('admin', 'admin@gmail.com', '123');
