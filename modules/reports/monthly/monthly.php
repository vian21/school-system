<?php
ob_start();
include '../../config.php';
include '../../functions.php';

$months = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

$period = $_GET['period'];
$start = $_GET['start'];
$end = $_GET['end'];
$type = $_GET['type'];
$grade = $_GET['grade'];
$stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];

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

function getAssessmentIdOf($subject, $period, $month)
{
    include '../../config.php';
    $get_id = mysqli_fetch_assoc($connect->query("SELECT*FROM assessments WHERE subject=$subject AND period=$period AND month=$month"));
    return $get_id['id'];
}

function getMark($student, $assessment_id)
{
    include '../../config.php';
    $mark = mysqli_fetch_assoc($connect->query("SELECT*FROM marks WHERE student_id=$student AND test_id=$assessment_id"));
    return $mark['marks'];
}

function getSubjectName($subject_id)
{
    include '../../config.php';
    $get_name = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject_id"));
    return $get_name['subject_name'];
} ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
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

    if ($type == 1) {
        $month = $_GET['month'];
        $students = fetchAllStudents($grade);
        //varaiable to track page number and loops to avoid additional page breaks
        $number = 0;
        if (!empty($students) and is_array($students)) {
            foreach ($students as $student) {
                $number++;
                $id = $student['id'];
                $name = $student['name'];

                $subjects_taken = subjectsTakenBY($id, $period);

    ?>



                <img src="../../../src/img/logo.png" alt='' />


                <h1>Monthly report</h1>
                <h4>Name: <?php echo $name; ?></h4>
                <h4>Grade: <?php echo $stream; ?></h4>
                <h4>Academic year: <?php echo $start . '-' . $end; ?></h4>
                <h4>Month: <?php echo $months[$month - 1]; ?></h4>

                <table>
                    <tr>
                        <th id='course'>Course</th>
                        <th id='hours'>Hours</th>
                        <th id='percentage'>percentage</th>
                        <th id='grade'>Grade</th>
                    </tr>

                    <?php
                    $total = 0;
                    $total_hours = 0;
                    $number_of_subjects = 0;
                    foreach ($subjects_taken as $subject) {
                        $assessment_id = getAssessmentIdOf($subject, $period, $month);

                        //check that subject has a test done
                        if (!empty($assessment_id)) {
                            /** 
                             * Marks gotten 
                             * It will be empty if student did not take test(enrolled after test was done)
                             */

                            $mark = getMark($id, $assessment_id);
                            $hours = getHours($subject);

                            if (!empty($mark)) {
                    ?>
                                <tr>
                                    <td><?php echo getSubjectName($subject); ?></td>
                                    <td><?php echo $hours; ?></td>
                                    <td><?php echo $mark; ?></td>
                                    <td><?php echo grade($mark); ?></td>
                                </tr>
                    <?php
                                $number_of_subjects++;
                                $total += $mark;
                                $total_hours += $hours;
                            }
                        }
                    }
                    if ($number_of_subjects != 0) {
                        $percentage = round($total / $number_of_subjects);
                    } else {
                        $percentage = "";
                    }
                    ?>
                    <tr>
                        <td>Total</td>
                        <td><?php echo $total_hours; ?></td>
                        <td><?php echo $percentage; ?></td>
                        <td></td>
                    </tr>

                </table>


    <?

                //add page break if not last page
                if (count($students) !== $number) {
                    echo '<div style="page-break-before: always;"></div>';
                }
            }
        }
    }
    ?>
</body>

</html>
<?php


$html = ob_get_clean();

require('../../tcpdf/tcpdf.php');
$tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set title of pdf
$tcpdf->SetTitle('Reports');


// set header and footer in pdf
$tcpdf->setPrintHeader(false);
$tcpdf->setPrintFooter(false);
$tcpdf->setListIndentWidth(3);

$tcpdf->AddPage();

$tcpdf->writeHTML($html, true, false, false, false, '');

//Close and output PDF document
$tcpdf->Output('report.pdf', 'I');
