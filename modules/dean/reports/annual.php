<?php
ob_start();
include("../../config.php");
include("../../functions.php");

$start = $_GET['start'];
$end = $_GET['end'];

$school_id = $_GET['school'];
$school_info = fetchSchoolInfo($school_id);

$school_name = $school_info['name'];
$school_email = $school_info['email'];
$school_website = $school_info['website'];

$periods = academic_periods($school_id, $start, $end);
$grade = $_GET['grade'];
$stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];

$students = fetchAllStudents($grade);

function subjectsTakenBy($student, $school_id, $start, $end)
{
    include '../../config.php';
    $get_subjects = $connect->query("SELECT * FROM enrollment WHERE student_id=$student AND start=$start AND end=$end");
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
        $sub_array['id'] = $row['id'];
        $sub_array['name'] = $row['name'];

        $periods[] = $sub_array;
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
    if ($mark !== null) {
        return $mark;
    } else {
        return 0;
    }
}

function annualDecision($gpa)
{
    if ($gpa < 1.00) {
        echo "Repeated";
    } else {
        echo "promoted";
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
            width: 90%;
            margin-left: 5%;
            font-size: 10px;
        }

        img {
            width: 100px;
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

            //original percentage for the whole year, going to be incremented
            $total_percentage = 0;
            $total_CGPA = 0.00;

            //array to hold the total percentages per term
            $total_term_percentage = 0;
            $total_term_percentage_array = array();

            /*
             * Each period has its own array to store each marks per subject per period/term
             * This will be used to calculate the marks for the 
            */
            foreach ($periods as $period) {
                $total_term_percentage_array[$period['name']] = array();
            }

            $subjects_taken = subjectsTakenBY($id, $school_id, $start, $end);
            $number_of_subjects = sizeof($subjects_taken);

    ?>
            <img src="../../../src/img/logo.png" alt="">
            <h1><?php echo $school_name; ?></h1>
            <h1>STUDENT'S ACADEMIC REPORT CARD <?php echo $start . '-' . $end; ?></h1>

            <h4>Name: <?php echo $name; ?></h4>
            <h4>Grade: <?php echo $stream; ?></h4>

            <table id='main' style="border:1px solid black;">
                <tr>
                    <th colspan="3" rowspan="2" style="border:1px solid black;">course</th>
                    <th colspan="2" rowspan="2" style="border:1px solid black;">Hours</th>

                    <?php
                    foreach ($periods as $row) {
                        echo '<th colspan="4" style="border:1px solid black;">' . $row['name'] . '</th>';
                    }
                    ?>


                    <th colspan="3" style="border:1px solid black;">Annual</th>
                </tr>

                <tr>
                    <?php
                    foreach ($periods as $row) {
                        echo '<td style="border:1px solid black;">test</td>';
                        echo '<td style="border:1px solid black;">Exam</td>';
                        echo '<td style="border:1px solid black;">percentage</td>';
                        echo '<td style="border:1px solid black;">grade</td>';
                    }

                    ?>


                    <td style="border:1px solid black;">percentage</td>
                    <td style="border:1px solid black;">grade</td>
                    <td style="border:1px solid black;">C. GPA</td>
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
                        echo '<td style="border:1px solid black;">' . grade($percentage) . '</td>';

                        //add the total percentage for the term
                        $subject_percentage += $percentage;

                        $total_term_percentage_array[$period['name']][] += $percentage;
                    }


                    //Annual
                    $number_of_terms = sizeof($periods);
                    $annual_subject_percentage = $subject_percentage / $number_of_terms;
                    $annual_subject_CGPA = GPA($annual_subject_percentage) * getHours($subject);
                    echo '<td style="border:1px solid black;">' . round($annual_subject_percentage) . '</td>';
                    echo '<td style="border:1px solid black;">' . grade($annual_subject_percentage) . '</td>';
                    echo '<td style="border:1px solid black;">' . $annual_subject_CGPA . '</td>';

                    $total_percentage += $annual_subject_percentage;
                    $total_CGPA += $annual_subject_CGPA;

                    echo '</tr>';
                }

                ?>
                <!-- totals row -->
                <tr>
                    <td colspan="3" style="border:1px solid black;">Total</td>
                    <td colspan="2" style="border:1px solid black;"><?php echo $total_hours; ?></td>
                    <?php
                    //columns for periods
                    foreach ($periods as $period) {

                        echo '<td style="border:1px solid black;"></td>';

                        echo '<td style="border:1px solid black;"></td>';


                        echo '<td style="border:1px solid black;">' . round(array_sum($total_term_percentage_array[$period['name']]) / $number_of_subjects) . '</td>';
                        echo '<td style="border:1px solid black;"></td>';
                    }
                    //Annual

                    $annual_percentage = $total_percentage / $number_of_subjects;
                    $annual_CGPA = $total_CGPA / $total_hours;
                    echo '<td style="border:1px solid black;">' . round($annual_percentage) . '</td>';
                    echo '<td style="border:1px solid black;">' . grade($annual_percentage) . '</td>';
                    echo '<td style="border:1px solid black;">' . round($annual_CGPA, 1) . '</td>';



                    ?>

                </tr>

                <!-- row for remarks-->

                <tr>
                    <td colspan="3">Remark</td>
                    <td colspan="20" style="text-align:center"><?php annualDecision(round($annual_CGPA, 1)); ?></td>
                </tr>
            </table>
            <h4></h4>

            <table id='mid'>
                <tr>
                    <th style="width: 80%;"></th>
                    <th style="width: 20%;"></th>
                </tr>
                <tr>
                    <td>
                        <b>GPA: </b>Grade Point Average
                    </td>
                    <td>
                        Academic Dean's signature
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>C GPA</b>GPA x hours
                    </td>
                    <td style="border-bottom:1px solid black;">
                        <!-- Academic dean's signature -->
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>AVERAGE GPA =</b> TOTAL C.GPA / TOTAL HOURS PER WEEK
                    </td>
                    <td>
                        Headmaster's signature
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Annual passmark:</b> 1.00
                    </td>
                    <td style="border-bottom:1px solid black;">
                        <!-- Academic dean's signature -->
                    </td>
                </tr>

            </table>
            <h4></h4>

            <table id="scale">
                <tr>
                    <td colspan="3" rowspan="3" style="border:1px solid black;">Grading scale</td>
                    <td colspan="2" style="border:1px solid black;">scale</td>
                    <td style="border:1px solid black;">0-59</td>
                    <td style="border:1px solid black;">60-62</td>
                    <td style="border:1px solid black;">62-66</td>
                    <td style="border:1px solid black;">67-69</td>
                    <td style="border:1px solid black;">70-72</td>
                    <td style="border:1px solid black;">73-76</td>
                    <td style="border:1px solid black;">77-79</td>
                    <td style="border:1px solid black;">80-82</td>
                    <td style="border:1px solid black;">83-86</td>
                    <td style="border:1px solid black;">87-89</td>
                    <td style="border:1px solid black;">90-92</td>
                    <td style="border:1px solid black;">93-100</td>

                </tr>

                <tr>
                    <td colspan="2">Grade</td>
                    <td style="border:1px solid black;">F</td>
                    <td style="border:1px solid black;">D-</td>
                    <td style="border:1px solid black;">D</td>
                    <td style="border:1px solid black;">D+</td>
                    <td style="border:1px solid black;">C-</td>
                    <td style="border:1px solid black;">C</td>
                    <td style="border:1px solid black;">C+</td>
                    <td style="border:1px solid black;">B-</td>
                    <td style="border:1px solid black;">B</td>
                    <td style="border:1px solid black;">B+</td>
                    <td style="border:1px solid black;">A-</td>
                    <td style="border:1px solid black;">A</td>

                </tr>

                <tr>
                    <td colspan="2" style="border:1px solid black;">GPA</td>
                    <td style="border:1px solid black;">0.00</td>
                    <td style="border:1px solid black;">0.70</td>
                    <td style="border:1px solid black;">1.00</td>
                    <td style="border:1px solid black;">1.30</td>
                    <td style="border:1px solid black;">1.70</td>
                    <td style="border:1px solid black;">2.00</td>
                    <td style="border:1px solid black;">2.30</td>
                    <td style="border:1px solid black;">2.70</td>
                    <td style="border:1px solid black;">3.00</td>
                    <td style="border:1px solid black;">3.30</td>
                    <td style="border:1px solid black;">3.70</td>
                    <td style="border:1px solid black;">4.00</td>
                </tr>
            </table>

    <?php

        }
    }
    ?>
</body>

</html>

<?php

$html = ob_get_clean();

require('../../tcpdf/tcpdf.php');
$tcpdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

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