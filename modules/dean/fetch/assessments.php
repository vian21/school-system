<?php
include("../../functions.php");
//fetch tests done in a specific period
if (
    $_POST['period'] !== "" and
    is_numeric($_POST['period'])
) {
    include("../../config.php");

    $school_id = $_POST['school'];
    $period = mysqli_real_escape_string($connect, $_POST['period']);

    echoJson(fetchTestsDone('all', $school_id, $period));
}
