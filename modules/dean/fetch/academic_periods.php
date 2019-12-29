<?php
include("../../functions.php");
//fetching terms for specific school
if (
    isset($_POST['id'])
) {
   

    $school_id = $_POST['id'];

    echoJson(fetchAcademicPeriods($school_id));
}

