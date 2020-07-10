<?php

if (isset($_POST['id'])) {
    include("../../config.php");
    include("../../functions.php");

    $id = $_POST['id'];
    $school = mysqli_fetch_array($connect->query("SELECT * FROM schools WHERE id=$id LIMIT 1"));
    $info = array();
    $info['id'] = $school['id'];
    $info['name'] = $school['name'];
    $info['motto'] = $school['motto'];
    $info['type'] = $school['type'];
    $info['email'] = $school['email'];
    $info['image'] = $school['image'];
    $info['website'] = $school['website'];
    $info['last_paid'] = $school['last_paid'];
    $info['end'] = $school['end'];
    $info['time'] = $school['time'];
    $info['reports'] = $school['reports'];


    echoJson($info);
}
