<?php
include("../../config.php");
include("../../functions.php");
if (isset($_POST['school'])) {
    $school = $_POST['school'];
    $query = $connect->query("SELECT* FROM transactions where school_id=$school");
    $schools = array();
    while ($row = mysqli_fetch_assoc($query)) {
        $school = array();
        $school['id'] = $row['id'];
        $school['school_id'] = $row['school_id'];
        $school['school_name'] = $row['school_name'];
        $school['date'] = $row['date'];
        $school['period'] = $row['period'];
        $school['end'] = $row['end'];

        $schools[] = $school;
    }
    echoJson($schools);
}
