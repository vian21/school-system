<?php
//delete staff
if (is_numeric($_GET['staff'])) {
    include("../../config.php");

    $id = $_GET['staff'];

    $delete = $connect->query("DELETE FROM users WHERE id =$id");

    $deleteSubjectsTaught = $connect->query("DELETE FROM teaches  where teacher = $id");

    if ($delete and $deleteSubjectsTaught) {
        echo "ok";
    } else {
        echo "ko";
    }
}
