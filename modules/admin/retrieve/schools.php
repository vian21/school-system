<?php
include("../../config.php");
include("../../functions.php");

$query = $connect->query("SELECT* FROM schools");
$schools = array();
while ($row = mysqli_fetch_assoc($query)) {
    $school = array();
    $school['id'] = $row['id'];
    $school['name'] = $row['name'];
    $school['motto'] = $row['motto'];
    $school['type'] = $row['type'];
    $school['email'] = $row['email'];
    $school['image'] = $row['image'];
    $school['website'] = $row['website'];
    $school['last_paid'] = $row['last_paid'];
    $school['end'] = $row['end'];
    $school['time'] = $row['time'];

    $schools[] = $school;
}
echoJson($schools);

