<?php
ob_start();
session_start();
include '../../../config.php';
include("../../../functions.php");

$months = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

$school = fetchSchoolInfo(sanitize($_GET['school']));
$period = sanitize($_GET['period']);
$period_name = sanitize($_GET['name']);
$start = sanitize($_GET['start']);
$end = sanitize($_GET['end']);

$grade = sanitize($_GET['grade']);
$stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];

if(isset($_GET['student'])){
    $student_id=sanitize($_GET['student']);
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
    <title>Document</title>
    <style>
        body {
            width: 90%;
            margin-left: 5%;

        }

        table {
            width: 100%;
        }

        #marks table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>

<body>


    <?php


if(isset($_GET['student'])){
    $students = fetchAllStudents($grade, $school['id'],$student_id);

}else{
    $students = fetchAllStudents($grade, $school['id']);

}
    //varaiable to track page number and loops to avoid additional page breaks
    $number = 0;
    if (!empty($students) and is_array($students)) {
        foreach ($students as $student) {
            $number++;
            $id = $student['id'];
            $name = $student['name'];

            $subjects_taken = subjectsTakenBY($id, $school, $period, $start, $end);


            //original percentage for the whole year, going to be incremented
            $total_percentage = 0;
            $total_CGPA = 0.00;

            //array to hold the total percentages per term
            $total_term_percentage = 0;

    ?>

            <table style="width:100%;border-collapse:collapse;border:none">
                <tr style="border:none">
                    <th style="width:20%;border:none;"></th>
                    <th style="width:80%;border:none;"></th>
                </tr>

                <tr style="border:none">
                    <td rowspan="2" style="border:none">
                        <img src="../../../../src/img/uploaded/<?php echo $school['image']; ?>" alt='' style="width: 90px;" />

                    </td>

                    <td style="border:none">
                        <div id="school_name" style="font-size:20px;font-weight: bold;"><?php echo $school['name']; ?></div>
                    </td>
                </tr>

                <tr style="border:none">
                    <td style="border:none">
                        <div id="core_values" style="font-size:10px;"><?php echo $school['motto']; ?></div>

                    </td>
                </tr>
            </table>




            <h1 id="title" style="width:100%;text-align: center;padding: 10px;border:2px solid black;"> <?php echo $period_name; ?></h1>

            <p></p>
            <h4 style="font-size:12px;">Name: <?php echo $name; ?></h4>
            <h4 style="font-size:12px;">ID: <?php echo $id; ?></h4>
            <h4 style="font-size:12px;">Grade: <?php echo $stream; ?></h4>
            <h4 style="font-size:12px;">Academic year: <?php echo $start . '-' . $end; ?></h4>

            <table id="marks">
                <tr>
                    <th id='course' style="font-weight: bold;font-size:11px;text-align:center;">Course</th>
                    <th id='hours' style="font-weight: bold;font-size:11px;text-align:center;">Hours</th>

                    <th id='percentage' style="font-weight: bold;font-size:11px;text-align:center;">Tests</th>
                    <th id='percentage' style="font-weight: bold;font-size:11px;text-align:center;">Exams</th>

                    <th id='grade' style="font-weight: bold;font-size:11px;text-align:center;">Total</th>
                    <th id='grade' style="font-weight: bold;font-size:11px;text-align:center;">Grade</th>
                    <th style="font-weight: bold;font-size:11px;text-align:center;">C. GPA</th>
                </tr>

                <?php
                $total = 0;
                $total_hours = 0;
                $subject_percentage = 0;

                $number_of_subjects = 0;
                $total_cgpa = 0;
                foreach ($subjects_taken as $subject) {
                    $number_of_subjects += 1;
                    $test_mark = getSumOfMarks($id, $subject, 1, $period);

                    echo '<tr><td style="border:1px solid black;">' . getSubjectName($subject) . '</td>';

                    echo '<td style="border:1px solid black;">' . getHours($subject) . '</td>';

                    $total_hours += getHours($subject);

                    echo '<td style="border:1px solid black;">' . $test_mark . "</td>";


                    $exam_mark = getSumOfMarks($id, $subject, 2, $period);

                    echo '<td style="border:1px solid black;">' . $exam_mark . '</td>';

                    (float) $percentage = ($test_mark + $exam_mark) / 2;


                    echo '<td style="border:1px solid black;">' . round($percentage, 0) . '</td>';

                    echo '<td style="border:1px solid black;">' .  grade($school['id'], (int)$percentage) . '</td>';

                    echo '<td style="border:1px solid black;">' . (float) GPA($school['id'], $percentage) * getHours($subject) . '</td></tr>';

                    $total_CGPA += (float) GPA($school['id'], $percentage) * getHours($subject);


                    //add the total percentage for the term
                    $subject_percentage += $percentage;

                    //$total_term_percentage_array[$period['name']][] += $percentage;
                }
                if ($number_of_subjects != 0) {
                    $percentage = round($total / $number_of_subjects, 0);
                } else {
                    $percentage = "";
                }
                ?>
                <tr>
                    <td style="font-weight: bold;">TOTAL</td>
                    <td style="text-align: center;"><?php echo $total_hours; ?></td>

                    <?
                    echo '<td style="border:1px solid black;background-color:lightgray;"></td>';

                    echo '<td style="border:1px solid black;background-color:lightgray;"></td>';

                    echo '<td style="font-weight:bold;border:1px solid black;">' . round($subject_percentage / $number_of_subjects, 0) . '</td>';
                    echo '<td style="border:1px solid black;background-color:lightgray;"></td>';

                    $total_gpa = round($total_CGPA / $total_hours, 1);
                    echo '<td style="font-weight:bold;border:1px solid black;">' . $total_gpa . '</td>';

                    ?>
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
                        echo '<tr><td  style="font-size:11px;border:none;"></td></tr>';
                        $i++;
                    }
                }
                ?>
            </table>
            <!-- comment section-->
            <table style="width:100%;border:none;font-size:10px;">
                <tr style="border:none">
                    <th style="width:40%;border:none;"></th>
                    <th style="width:60%;border:none;"></th>
                </tr>

                <tr>
                    <td style="border:none;">
                        <table style="border:1px solid black;">
                            <tr>
                                <td colspan="2" style="text-align: center;font-weight:bold">COMMENTS</td>
                            </tr>
                            <tr>
                                <td>OUTSTANDING</td>
                                <td>
                                    <?php
                                    if ($total_gpa >= 3.5) {
                                        echo "YES";
                                    }
                                    ?>
                                </td>
                            </tr>
                            <tr>
                                <td>ABOVE AVERAGE</td>
                                <td>
                                    <?php
                                    if ($total_gpa >= 2.8 && $total_gpa < 3.5) {
                                        echo "YES";
                                    }
                                    ?>
                                </td>
                            </tr>
                            <tr>
                                <td>AVERAGE</td>
                                <td>
                                    <?php
                                    if ($total_gpa >= 2 && $total_gpa < 2.9) {
                                        echo "YES";
                                    }
                                    ?>
                                </td>
                            </tr>
                            <tr>
                                <td>PASS</td>
                                <td>
                                    <?php
                                    if ($total_gpa > 1 && $total_gpa < 2) {
                                        echo "YES";
                                    }
                                    ?>
                                </td>
                            </tr>
                            <tr>
                                <td>FAILED</td>
                                <td>
                                    <?php
                                    if ($total_gpa < 1) {
                                        echo "YES";
                                    }
                                    ?>
                                </td>
                            </tr>
                        </table>
                    </td>

                    <td style="border:none;">
                        <table style="border:none">

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
                </tr>
            </table>

            <h6></h6>

            <!-- Grading scale-->

            <?php
            echo gradingTable($school['id']);
            ?>

            <h6></h6>

            <!-- signatures -->

            <h5 style="text-align: center;">Head Master's Signature <span>______________________ </span>Academic Dean's Signature <span>______________________</span></h5>
    <?
            //add page break if not last page
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

if (isset($_GET['student']) && $_GET['student'] != $_SESSION['id']) {
    $tcpdf->close();
    echo "<script>window.close()</script>";
} else {
    $tcpdf->Output('report.pdf', 'I');
}