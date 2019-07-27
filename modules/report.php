<?php
require('fpdf.php');

class PDF extends FPDF
{
    // Simple table
    function Reports()
    {
        //foreach($months as $x){
        //  $this->cell(30,6,$x,1);
        //$this->ln();
        //}
        include 'config.php';
        include 'functions.php';

        $months = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');


        if (isset($_GET['period']) and isset($_GET['grade']) and isset($_GET['type'])) {
            $period = $_GET['period'];
            $type = $_GET['type'];
            $grade = $_GET['grade'];

            // 1 for monthly tests
            if ($type == 1) {
                $month = $_GET['month'];
                $students = fetchAllStudents($grade);
                if (!empty($students) and is_array($students)) {
                    foreach ($students as $student) {

                        $this->AddPage();

                        $id = $student['id'];
                        $name = $student['name'];

                        $subjects_taken = subjectsTakenBY($id, $period);

                        $this->Image('http://localhost/bridge/src/img/2.png', null, null, 200, 50, 'PNG');
                        $this->ln(10);

                        $this->SetFontSize(10);

                        $this->Write(1, "Name: " . $name);
                        $this->ln(6);
                        $this->Write(0, "Grade: ");
                        $this->ln(8);
                        $this->Write(0, "Class: ");
                        $this->ln(8);
                        $this->Write(0, "Academic year: ");
                        $this->ln(8);
                        $this->Write(0, "Month: " . $months[$month - 1]);
                        $this->ln(8);

                        $this->SetFontSize(15);

                        $this->cell(30, 7, 'Course', 1);
                        $this->cell(30, 7, 'Mark', 1);
                        $this->ln(10);
                        foreach ($subjects_taken as $subject) {
                            $assessment_id = getAssessmentIdOf($subject, $period, $month);
                            //check that subject has a test done
                            if (!empty($assessment_id)) {
                                //Subject
                                $this->cell(30, 6, getSubjectName($subject), 1);
                                //Mark
                                $mark = getMark($id, $assessment_id);
                                $this->cell(30, 6, $mark, 1);
                                $this->ln();
                            }
                        }
                    }
                }
            }

            // 2 for annual
            if ($type == 2) { }
        }
    }
}

$pdf = new PDF('P', 'mm', 'Letter');
$pdf->SetFont('Arial', '', 14);

$pdf->Reports();
$pdf->Output('', 'test.pdf');


function subjectsTakenBy($student, $period)
{
    include 'config.php';
    $get_subjects = $connect->query("SELECT * FROM enrollment WHERE student_id=$student AND period=$period");
    $subjects = array();
    while ($column = mysqli_fetch_assoc($get_subjects)) {
        $subjects[] = $column['subject'];
    }
    return $subjects;
}

function getAssessmentIdOf($subject, $period, $month)
{
    include 'config.php';
    $get_id = mysqli_fetch_assoc($connect->query("SELECT*FROM assessments WHERE subject=$subject AND period=$period AND month=$month"));
    return $get_id['id'];
}

function getMark($student, $assessment_id)
{
    include 'config.php';
    $mark = mysqli_fetch_assoc($connect->query("SELECT*FROM marks WHERE student_id=$student AND test_id=$assessment_id"));
    return $mark['marks'];
}

function getSubjectName($subject_id)
{
    include 'config.php';
    $get_name = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject_id"));
    return $get_name['subject_name'];
}
