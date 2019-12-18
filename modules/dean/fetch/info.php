<?php
include("../../functions.php");
//fetching all school information i.e: name,email,website
if (
    isset($_POST['user']) and
    is_numeric($_POST['user'])
) {
  
    $user_id = $_POST['user'];
    $school_id = getSchoolId($user_id);
    echoJson(fetchSchoolInfo($school_id));
}
