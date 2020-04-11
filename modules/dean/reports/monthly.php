<?php
ob_start();
include '../../config.php';
include '../../functions.php';

$months = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

$school = fetchSchoolInfo($_GET['school']);
$period = $_GET['period'];
$start = $_GET['start'];
$end = $_GET['end'];

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

            <table style="width:100%;border-collapse:collapse;border:none">
                <tr style="border:none">
                    <th style="width:20%;border:none;"></th>
                    <th style="width:80%;border:none;"></th>
                </tr>

                <tr style="border:none">
                    <td rowspan="2" style="border:none">
                        <img src="../../../src/img/uploaded/<?php echo $school['image']; ?>" alt='' style="width: 90px;" />

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




            <h1 id="title" style="width:100%;text-align: center;padding: 10px;border:2px solid black;">Monthly report</h1>

            <p></p>
            <h4 style="font-size:12px;">Name: <?php echo $name; ?></h4>
            <h4 style="font-size:12px;">ID: <?php echo $id; ?></h4>
            <h4 style="font-size:12px;">Grade: <?php echo $stream; ?></h4>
            <h4 style="font-size:12px;">Academic year: <?php echo $start . '-' . $end; ?></h4>
            <h4 style="font-size:12px;">Month: <?php echo $months[$month - 1]; ?></h4>

            <table id="marks">
                <tr>
                    <th id='course' style="font-weight: bold;font-size:11px;text-align:center;" colspan="2">Course</th>
                    <th id='hours' style="font-weight: bold;font-size:11px;text-align:center;">Hours</th>
                    <th id='percentage' style="font-weight: bold;font-size:11px;text-align:center;">percentage</th>
                    <th id='grade' style="font-weight: bold;font-size:11px;text-align:center;">Grade</th>
                    <th style="font-weight: bold;font-size:11px;text-align:center;">C. GPA</th>
                </tr>

                <?php
                $total = 0;
                $total_hours = 0;
                $number_of_subjects = 0;
                $total_cgpa = 0;
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
                                <td colspan="2" style="font-size:11px;"><?php echo getSubjectName($subject); ?></td>
                                <td style="text-align: center;font-size:11px;"><?php echo $hours; ?></td>
                                <td style="text-align: right;font-size:11px;"><?php echo $mark; ?></td>
                                <td style="text-align: center;font-size:11px;"><?php echo grade($mark); ?></td>
                                <td style="text-align: right;"><?php echo GPA($mark) * $hours; ?></td>
                            </tr>
                <?php
                            $number_of_subjects++;
                            $total += $mark;
                            $total_hours += $hours;
                            $total_cgpa += GPA($mark) * $hours;
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
                    <td colspan="2" style="font-weight: bold;">TOTAL</td>
                    <td style="text-align: center;"><?php echo $total_hours; ?></td>
                    <td style="text-align: center;background-color:lightgray;"></td>
                    <td style="background-color:lightgray;"></td>
                    <td style="text-align: right;"><?php echo $total_cgpa; ?></td>
                </tr>

                <tr>
                    <td colspan="2" style="font-weight: bold;font-size:11px;">AVERAGE</td>
                    <td style="background-color:lightgray;"></td>
                    <td style="text-align: right;font-size:11px;"><?php echo $percentage; ?></td>
                    <td style="background-color:lightgray;"></td>
                    <td style="text-align: right;"><?php
                                                    if ($total_hours !== 0) {
                                                        $total_gpa = round($total_cgpa / $total_hours, 1);
                                                    } else {
                                                        $total_gpa = 0;
                                                    }
                                                    echo $total_gpa;
                                                    ?></td>
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
            <h6></h6>
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

            <h6></h6> <!-- Grading scale-->
            <table id="scale" style="width: 100%;font-size:8px;">
                <tr>
                    <td colspan="3" rowspan="3" style="border:1px solid black;padding-top:10px;text-align:center;">Grading scale</td>
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


            <h6></h6> <!-- signatures -->
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
