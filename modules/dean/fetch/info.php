<?php
//fetching all school information i.e: name,email,website
if (
    isset($_POST['user']) and
    is_numeric($_POST['user'])
) {
    include("../../config.php");
    include("../../functions.php");

    $user_id = sanitize($_POST['user']);
    $school_id = sanitize($_POST['school']);
    $info = fetchSchoolInfo($school_id);
    $info['students'] = countStudents(1, 0, $school_id);
    $info['teachers'] = countTeachers($school_id);
    $info['male'] = countMaleStudents($school_id);
    $info['female'] = countFemaleStudents($school_id);
    if ($info['end'] == "" || $info['end'] < date('Y-m-d')) {
        $info['paid'] = false;
    } else {
        $info['paid'] = true;
    }

    echoJson($info);
}
