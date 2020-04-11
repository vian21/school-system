<?php

include("../../functions.php");

$school_id = $_POST['id'];
echoJson(fetchAllSubjects('all', $school_id));
