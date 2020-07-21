<?php

if (isset($_POST['id']) and is_numeric($_POST['id'])) {
    if ($_POST['admission'] != "") {
        include("../../../config.php");
        include("../../../functions.php");


        $admission = sanitize($_POST['admission']);
        $id = sanitize($_POST['id']);

        $change_admission = $connect->query("UPDATE students SET admissionID='$admission' WHERE id=$id");
        if (!$change_admission) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
}
