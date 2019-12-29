<?php
include("../../config.php");
include("../../functions.php");

$start = $_GET['start'];
$end = $_GET['end'];

$school_id = $_GET['school'];
$school_info = fetchSchoolInfo($school_id);

$school_name = $school_info['name'];
$school_email = $school_info['email'];
$school_website = $school_info['website'];

$period = $_GET['period'];
$grade = $_GET['grade'];
$stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];

$students = fetchAllStudents($grade);

function subjectsTakenBy($student, $period)
{
    include '../../config.php';
    $get_subjects = $connect->query("SELECT * FROM enrollment WHERE student_id=$student AND period=$period");
    $subjects = array();
    while ($column = mysqli_fetch_assoc($get_subjects)) {
        $subjects[] = $column['subject'];
    }
    return $subjects;
}

function academic_periods($school_id, $startYear, $endYear)
{
    include '../../config.php';
    $get_periods = $connect->query("SELECT*FROM academic_periods WHERE school=$school_id AND start=$startYear AND end=$endYear");

    $periods = array();
    while ($row = mysqli_fetch_assoc($get_periods)) {
        $sub_array = array();
        $sub_array[]=$row['id'];
        $sub_array[] = $row['name'];

        $periods[]=$sub_array;
    }

    return $periods;
}

function getSubjectName($subject_id)
{
    include '../../config.php';
    $get_name = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject_id"));
    return $get_name['subject_name'];
}


function getSumOfMarks($student_id, $subject, $assessment_type, $period_id)
{
    include("../../config.php");

    $getSumQuery = $connect->query("SELECT SUM(marks) AS mark FROM marks WHERE student_id=$student_id AND subject=$subject AND type=$assessment_type AND period=$period_id");
    $sumArray = mysqli_fetch_assoc($getSumQuery);
    $mark = $sumArray['mark'];

    return $mark;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report</title>
    <style>
        body {
            width: 90%;
            margin-left: 5%;
        }

        img {
            width: 100px;
        }

        table {
            width: 100%;
        }

        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>

<body>
    <?php
    $number = 0;
    if (!empty($students) and is_array($students)) {
        foreach ($students as $student) {
            $number++;
            $id = $student['id'];
            $name = $student['name'];

            $subjects_taken = subjectsTakenBY($id, $period);

    ?>
            <img src="../../../src/img/logo.png" alt="">
            <h1><?php echo $school_name; ?></h1>
            <h1>STUDENT'S ACADEMIC REPORT CARD <?php echo $start . '-' . $end; ?></h1>

            <h4>Name: <?php echo $name; ?></h4>
            <h4>Grade: <?php echo $stream; ?></h4>

            <table>
                <tr>
                    <th colspan="3" rowspan="2">course</th>
                    <th colspan="2" rowspan="2">Hours</th>

                    <th colspan="4">semester 1</th>
                    <th colspan="4">semester 2</th>

                    <th colspan="2">Annual</th>
                </tr>

                <tr>
                    <td>test</td>
                    <td>Exam</td>
                    <td>percentage</td>
                    <td>grade</td>

                    <td>test</td>
                    <td>Exam</td>
                    <td>percentage</td>
                    <td>grade</td>

                    <td>percentage</td>
                    <td>grade</td>
                </tr>


                <?php
                foreach ($subjects_taken as $subject) {
                    //initialize variable to be empty

                    $test_mark = 0;
                    $exam_mark = 0;
                    $percentage = 0;
                    echo '<tr>';

                    echo '<td colspan="3">' . getSubjectName($subject) . '</td>';
                    echo '<td colspan="2">' . getHours($subject) . '</td>';

                    $test_mark = getSumOfMarks($id, $subject, 1, $period);
                    echo '<td>' . $test_mark . "</td>";
                    $exam_mark = getSumOfMarks($id, $subject, 2, $period);
                    echo '<td>' . $exam_mark . '</td>';
                    $percentage = ($test_mark + $exam_mark) / 2;
                    echo '<td>' . $percentage . '</td>';
                    echo '<td>' . grade($percentage) . '</td>';

                    $test_mark = getSumOfMarks($id, $subject, 1, $period);
                    echo '<td>' . $test_mark . "</td>";
                    $exam_mark = getSumOfMarks($id, $subject, 2, $period);
                    echo '<td>' . $exam_mark . '</td>';
                    $percentage = ($test_mark + $exam_mark) / 2;
                    echo '<td>' . $percentage . '</td>';
                    echo '<td>' . grade($percentage) . '</td>';

                    echo '</tr>';
                }
                ?>
            </table>

    <?php

        }
    }
    ?>
</body>

</html>