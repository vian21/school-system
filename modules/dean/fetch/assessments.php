<?php
//fetch tests done in a specific period
if (
    $_POST['period'] !== "" and
    is_numeric($_POST['period'])
) {
    include("../../config.php");
    include("../../functions.php");

    $school_id = sanitize($_POST['school']);
    $period = sanitize($_POST['period']);

    echoJson(fetchTestsDone('all', $school_id, $period));
}
