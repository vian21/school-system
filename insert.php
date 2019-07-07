<?php
include 'modules/config.php';
$password=password_hash("123",PASSWORD_DEFAULT);
$connect->query("INSERT INTO users(name,email,password,type) values('me','meteacher@gmail.com','$password',2)");