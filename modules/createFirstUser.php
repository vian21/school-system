<?php

function createAdmin($name, $email, $password)
{
    include 'config.php';

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $create = $connect->query("INSERT INTO users(name,gender,email,password,type,status,school) VALUES('$name',0,'$email','$hashedPassword',0,1,1)");

    if ($create) {
        echo "<h1>Admin created.</h1>";
    } else {
        echo "Failed to create admin";
    }
}

