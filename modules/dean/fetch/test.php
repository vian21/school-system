<?php

if (isset($_POST['test'])) {
    if ($_POST['test'] !== "" and is_numeric($_POST['test'])) {
        include("../../config.php");
        include("../../functions.php");

        $test_id = sanitize($_POST['test']);
        $result = fetchStudentsMarks($test_id);
        $form_data = array();

        if (!empty($result)) {
            while ($column = mysqli_fetch_assoc($result)) {
                $student_id = $column['student_id'];
                $sub_form_Data['id'] = $student_id;
                $sub_form_Data['name'] = fetchName(2, $student_id);
                $sub_form_Data['marks'] = $column['marks'];
                $form_Data[] = $sub_form_Data;
            }

            if (!empty($form_Data)) {
                echoJson($form_Data);
            }
        }
    }
}
