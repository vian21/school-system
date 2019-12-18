<?php
include("../../functions.php");
//fetching terms for specific school
if (
    isset($_POST['id'])
) {
   

    $school_id = $_POST['id'];

    /*$academic_years = fetchAcademicYears($school_id);

    while ($row = mysqli_fetch_assoc($academic_years)) {
        //fetch periods in that year
        $sub_array = array();
        $sub_array['id'] = $row['id'];
        $sub_array['year'] = $row['time'];
        $sub_array['periods'] = fetchPeriods($row['id']);
        $periods[] = $sub_array;
    }*/

    echoJson(fetchAcademicPeriods($school_id));
}

