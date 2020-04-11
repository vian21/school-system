<?php

//delete assessment
if (isset($_POST['id'])) {
    include("../../config.php");

    $id = $_POST['id'];

    $delete_assement = $connect->query("DELETE FROM assessments WHERE id=$id");

    $delete_marks = $connect->query("DELETE FROM marks WHERE test_id=$id");

    if ($delete_assement and $delete_marks) {
        echo 'ok';
    } else {
        echo "ko";
    }
}
