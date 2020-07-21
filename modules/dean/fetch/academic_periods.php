<?php
//fetching terms for specific school
if (
    isset($_POST['id'])
) {

    include("../../config.php");
    include("../../functions.php");

    $school_id = sanitize($_POST['id']);

    echoJson(fetchAcademicPeriods($school_id));
}
