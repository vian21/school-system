<?php

    if (
        $_POST['grade'] != "" and
        is_numeric($_POST['grade']) and
        isset($_POST['id']) and
        is_numeric($_POST['id'])
    ) {
        include ("../../../config.php");

        $id = $_POST['id'];
        $grade = $_POST['grade'];

        $change_grade = $connect->query("UPDATE students SET grade=$grade WHERE id=$id");
        if (!$change_grade) {
            echo "ko";
        } else {
            echo "ok";
        }
    }
