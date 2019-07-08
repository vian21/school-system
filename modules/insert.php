<?php
include 'config.php';
$hash=password_hash("123",PASSWORD_DEFAULT);
$connect->query("INSERT INTO users(name,email,image,password,type) VALUES('Admin','admin@gmail.com','user.png','$hash',1)");