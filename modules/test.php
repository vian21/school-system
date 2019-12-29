<?php

include "functions.php";
$students_taking_that_subject = fetchStudentsTaking(1, 2);
echoJson($students_taking_that_subject);