<?php
include("../../functions.php");
//fetching all school information i.e: name,email,website
if (
    isset($_POST['user']) and
    is_numeric($_POST['user'])
) {

    $user_id = $_POST['user'];
    $school_id = getSchoolId($user_id);
    $info = fetchSchoolInfo($school_id);
    $info['students'] = countStudents(1, 0, $school_id);
    $info['teachers'] = countTeachers($school_id);
    $info['male'] = countMaleStudents($school_id);
    $info['female'] = countFemaleStudents($school_id);

    echoJson($info);
}
