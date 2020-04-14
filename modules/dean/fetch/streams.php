<?php
include("../../functions.php");
$school = $_POST['school'];
echoJson(fetchAllStreams($school));
