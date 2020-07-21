<?php
ob_start();
session_start();

include("../../../config.php");
include("../../../functions.php");

$start = sanitize($_GET['start']);
$end = sanitize($_GET['end']);

$school_id = sanitize($_GET['school']);
$school_info = fetchSchoolInfo($school_id);

$school_name = $school_info['name'];
$school_email = $school_info['email'];
$school_website = $school_info['website'];

$periods = academic_periods($school_id, $start, $end);
$grade = sanitize($_GET['grade']);
$stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];

if (isset($_GET['student'])) {
    $student_id = sanitize($_GET['student']);
}

if (isset($_GET['student'])) {
    $students = fetchAllStudents($grade, $school_id, $student_id);
} else {
    $students = fetchAllStudents($grade, $school_id);
}
function subjectsTakenBy($student, $school_id, $period, $start, $end)
{
    include '../../../config.php';
    $get_subjects = $connect->query("SELECT * FROM enrollment WHERE student_id=$student AND period=$period AND start=$start AND end=$end");
    $subjects = array();
    while ($column = mysqli_fetch_assoc($get_subjects)) {
        $subjects[] = $column['subject'];
    }
    return $subjects;
}

function academic_periods($school_id, $startYear, $endYear)
{
    include '../../../config.php';
    $get_periods = $connect->query("SELECT*FROM academic_periods WHERE school=$school_id AND start=$startYear AND end=$endYear");

    $periods = array();
    while ($row = mysqli_fetch_assoc($get_periods)) {
        $sub_array = array();
        $sub_array['id'] = $row['id'];
        $sub_array['name'] = $row['name'];

        $periods[] = $sub_array;
    }

    return $periods;
}


function annualDecision($gpa)
{
    if ($gpa < 1.00) {
        echo "Repeated";
    } else {
        echo "promoted";
    }
}

function getSubjectName($subject_id)
{
    include '../../../config.php';
    $get_name = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject_id"));
    return $get_name['subject_name'];
}


function getSumOfMarks($student_id, $subject, $assessment_type, $period_id)
{
    include("../../../config.php");

    $getSumQuery = mysqli_fetch_assoc($connect->query("SELECT SUM(marks) AS mark FROM marks WHERE student_id=$student_id AND subject=$subject AND type=$assessment_type AND period=$period_id"));
    //$sumArray = mysqli_fetch_assoc($getSumQuery);
    $number_of_assessments_done = mysqli_num_rows($connect->query("SELECT * FROM marks WHERE student_id=$student_id AND subject=$subject AND type=$assessment_type AND period=$period_id"));
    if ($number_of_assessments_done != 0) {
        $mark = $getSumQuery['mark'] / $number_of_assessments_done;
        if ($mark !== null) {
            return $mark;
        } else {
            return 0;
        }
    }
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
            margin: 0;
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
            $total_hours = 0;
            $total_CGPA = 0.00;
            $total_percentage = 0;


            /*
             * Each period has its own array to store each marks per subject per period/term
             * This will be used to calculate the marks for the 
            */
            foreach ($periods as $period) {
                $total_term_percentage_array[$period['name']] = array();
            }

            $subjects_taken = subjectsTakenBY($id, $school_id, $period['id'], $start, $end);
            $number_of_subjects = sizeof($subjects_taken);

    ?>

            <table style="width:100%;border-collapse:collapse;border:none">
                <tr style="border:none">
                    <th style="width:20%;border:none;"></th>
                    <th style="width:80%;border:none;"></th>
                </tr>

                <tr style="border:none">
                    <td rowspan="3" style="border:none">
                        <img src="../../../../src/img/uploaded/<?php echo $school_info['image'] ?>" alt='' style="width: 100px;height:100px;" />

                    </td>

                    <td style="border:none">
                        <div id="school_name" style="font-size:15px;font-weight: bold;text-align:center;"><?php echo $school_info['name']; ?></div>
                    </td>
                </tr>

                <tr style="border:none">
                    <td style="border:none">
                        <div id="core_values" style="font-size:10px;text-align:center;"><?php echo $school_info['motto']; ?></div>

                    </td>
                </tr>
                <tr style="border:none">
                    <td style="border:none">
                        <div id="core_values" style="font-size:15px;font-weight: bold;text-align:center;">STUDENT'S REPORT CARD <?php echo $start . '-' . $end; ?></div>
                    </td>
                </tr>
            </table>

            <h6 style="font-size:11px;">Name: <?php echo $name; ?></h6>
            <h6 style="font-size:11px;">ID: <?php echo $id; ?></h6>
            <h6 style="font-size:11px;">Grade: <?php echo $stream; ?></h6>
            <table id='main' style="font-size:10px;">
                <tr>
                    <th colspan="3" rowspan="2" style="font-size:11px;text-align:center;border:1px solid black;font-weight:bold;">course</th>
                    <th colspan="2" rowspan="2" style="font-size:11px;text-align:center;border:1px solid black;font-weight:bold;">Hours</th>

                    <?php
                    foreach ($periods as $row) {
                        echo '<th colspan="4" style="font-size:11px;text-align:center;border:1px solid black;font-weight:bold">' . $row['name'] . '</th>';
                    }
                    ?>


                    <th colspan="3" style="font-size:11px;text-align:center;border:1px solid black;font-weight:bold">Annual</th>
                </tr>

                <tr>
                    <?php
                    foreach ($periods as $row) {
                        echo '<td style="font-weight:bold;text-align:center;border:1px solid black;">TEST</td>';
                        echo '<td style="font-weight:bold;text-align:center;border:1px solid black;">EXAM</td>';
                        echo '<td style="font-weight:bold;text-align:center;border:1px solid black;">TOTAL</td>';
                        echo '<td style="font-weight:bold;text-align:center;border:1px solid black;">GRADE</td>';
                    }

                    ?>


                    <td style="font-weight:bold;text-align:center;border:1px solid black;">TOTAL</td>
                    <td style="font-weight:bold;text-align:center;border:1px solid black;">GRADE</td>
                    <td style="font-weight:bold;text-align:center;border:1px solid black;">C. GPA</td>
                </tr>


                <?php
                foreach ($subjects_taken as $subject) {
                    //initialize variable to be empty

                    $test_mark = 0;
                    $exam_mark = 0;
                    $percentage = 0;
                    echo '<tr>';

                    echo '<td colspan="3" style="border:1px solid black;">' . getSubjectName($subject) . '</td>';
                    echo '<td colspan="2" style="border:1px solid black;">' . getHours($subject) . '</td>';

                    $total_hours += getHours($subject);

                    $subject_percentage = 0;

                    //columns for periods
                    foreach ($periods as $period) {

                        $test_mark = getSumOfMarks($id, $subject, 1, $period['id']);
                        echo '<td style="border:1px solid black;">' . $test_mark . "</td>";


                        $exam_mark = getSumOfMarks($id, $subject, 2, $period['id']);
                        echo '<td style="border:1px solid black;">' . $exam_mark . '</td>';

                        $percentage = ($test_mark + $exam_mark) / 2;
                        echo '<td style="border:1px solid black;">' . $percentage . '</td>';
                        echo '<td style="border:1px solid black;">' . grade($school_id, (int) $percentage) . '</td>';

                        //add the total percentage for the term
                        $subject_percentage += $percentage;

                        $total_term_percentage_array[$period['name']][] += $percentage;
                    }


                    //Annual
                    $number_of_terms = sizeof($periods);
                    $annual_subject_percentage = $subject_percentage / $number_of_terms;

                    $annual_subject_CGPA = (float) GPA($school_id, $annual_subject_percentage) * getHours($subject);

                    echo '<td style="border:1px solid black;">' . round($annual_subject_percentage) . '</td>';
                    echo '<td style="border:1px solid black;">' . grade($school_id, (int) $annual_subject_percentage) . '</td>';
                    echo '<td style="border:1px solid black;">' . $annual_subject_CGPA . '</td>';

                    $total_percentage += $annual_subject_percentage;
                    $total_CGPA += $annual_subject_CGPA;

                    echo '</tr>';
                }

                ?>
                <!-- totals row -->
                <tr>
                    <td colspan="3" style="font-weight:bold;border:1px solid black;">TOTAL</td>
                    <td colspan="2" style="font-weight:bold;border:1px solid black;"><?php echo $total_hours; ?></td>


                    <?php
                    //columns for periods
                    foreach ($periods as $period) {

                        echo '<td style="border:1px solid black;background-color:lightgray;"></td>';

                        echo '<td style="border:1px solid black;background-color:lightgray;"></td>';


                        echo '<td style="font-weight:bold;border:1px solid black;">' . round(array_sum($total_term_percentage_array[$period['name']]) / $number_of_subjects) . '</td>';
                        echo '<td style="border:1px solid black;background-color:lightgray;"></td>';
                    }
                    //Annual

                    $annual_percentage = $total_percentage / $number_of_subjects;
                    $annual_CGPA = $total_CGPA / $total_hours;
                    echo '<td style="font-weight:bold;border:1px solid black;">' . round($annual_percentage) . '</td>';
                    echo '<td style="font-weight:bold;border:1px solid black;background-color:lightgray;"></td>';
                    echo '<td style="font-weight:bold;border:1px solid black;">' . round($annual_CGPA, 1) . '</td>';



                    ?>

                </tr>

                <!-- row for remarks-->

                <tr>
                    <td colspan="3" style="font-weight:bold;border:1px solid black;">ANNUAL DECISION</td>
                    <td colspan="20" style="font-weight:bold;text-align:center;border:1px solid black;"><?php annualDecision(round($annual_CGPA, 1)); ?></td>
                </tr>
                <!-- *the table should contain a maximum of 15 rows
                    *if the student takes les the system will fill those empty courses with invisible rows
                    to get a consisten spacing on all reports
                    -->
                <?php
                if ($number_of_subjects < 15) {
                    $missing = 15 - $number_of_subjects;
                    $i = 0;
                    while ($i < $missing) {
                        echo '<tr><td style="font-size:11px;border:none;"></td></tr>';
                        $i++;
                    }
                }
                ?>
            </table>

            <table id='mid' style="font-size:9px;">
                <tr>
                    <th style="width:70%;"></th>
                    <th style="width:30%;"></th>
                </tr>
                <tr>
                    <td>
                        <table>

                            <tr>
                                <td style="border:none;text-align:right;font-weight:bold;">G.P.A:</td>
                                <td style="border:none">Grade Point Average:</td>
                            </tr>
                            <tr>
                                <td style="border:none;text-align:right;font-weight:bold;">C.G.P.A=</td>
                                <td style="border:none">GPA * HOURS PER WEEK</td>
                            </tr>
                            <tr>
                                <td style="border:none;text-align:right;font-weight:bold;">AVERAGE GPA=</td>
                                <td style="border:none">TOTAL C.GPA / TOTAL HOURS PER WEEK</td>
                            </tr>
                            <tr>
                                <td style="border:none;text-align:right;font-weight:bold;">ANNUAL PASS MARK:</td>
                                <td style="border:none">1.0 AVERAGE G.P.A</td>
                            </tr>

                        </table>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>Academic Dean's signature</td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>________________________</td>
                            </tr>
                            <tr>
                                <td>Head Master's signature</td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>________________________</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <br><br>

            <?php
            echo gradingTable($school_id);
            ?>

    <?php
            if (count($students) !== $number) {
                echo '<div style="page-break-before: always;"></div>';
            }
        }
    }
    ?>
</body>

</html>

<?php

$html = ob_get_clean();

require('../../../tcpdf/tcpdf.php');
$tcpdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set title of pdf
$tcpdf->SetTitle('Reports');


// set header and footer in pdf
$tcpdf->setPrintHeader(false);
$tcpdf->setPrintFooter(false);
$tcpdf->setListIndentWidth(3);

$tcpdf->SetTopMargin(0);
$tcpdf->SetAutoPageBreak(true, 0);
$tcpdf->AddPage();

$tcpdf->writeHTML($html, true, false, false, false, '');

//Close and output PDF document

if (isset($_GET['student']) && $_GET['student'] != $_SESSION['id']) {
    $tcpdf->close();
    echo "<script>window.close()</script>";
} else {
    $tcpdf->Output('report.pdf', 'I');
}
