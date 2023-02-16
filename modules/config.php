<?php
//Configuration file

//Database
$connect = mysqli_connect('localhost', 'DB_USERNAME', 'MYSQL_PASSWORD', 'DATABASE_NAME');

//Configurations 
$app_url = "http://localhost/bridge/";
$app_name = "Bridge";
$app_email = "YOUR_EMAIL";
$app_password = "YOUR_PASSWORD";

//arrays
$genders = array('Male', 'Female');
$staffTypes = array('Admin', 'Dean', 'Teacher', 'Accountant');
