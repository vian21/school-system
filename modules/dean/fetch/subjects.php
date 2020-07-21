<?php

include("../../config.php");
include("../../functions.php");

$school_id = sanitize($_POST['id']);
echoJson(fetchAllSubjects('all', $school_id));
