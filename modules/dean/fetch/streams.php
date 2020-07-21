<?php
include("../../config.php");
include("../../functions.php");

$school = sanitize($_POST['school']);
$start = sanitize($_POST['start']);
$end = sanitize($_POST['end']);

echoJson(fetchAllStreams($school,$start,$end));
