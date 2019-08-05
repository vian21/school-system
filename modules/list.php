<?php
if (isset($_GET['grade']) and is_numeric($_GET['grade'])) {
    require('fpdf.php');
    class PDF extends FPDF
    {
        function list()
        {

            include 'functions.php';
            $grade = $_GET['grade'];
            $students = fetchStudentsIn(($grade));
            $stream = fetchStreamName($grade)['grade'] . ' ' . fetchStreamName($grade)['stream'];

            $this->AddPage();

           
            $this->SetFontSize(30);
            $this->cell(190, 20, "Class List", 1, 100, 'C');
            $this->ln(10);

            $this->SetFontSize(10);

            $this->cell(30, 6, "Grade : " . $stream);
            $this->ln(10);

            if (!empty($students) and $students !== ' ') {
            $this->cell(5, 6, '#', 1);
            $this->cell(50, 6, 'Name', 1);
            $this->cell(25, 6, 'ID', 1, 0, 'C');

            $i = 0;
            while ($i <= 20) {
                $i++;
                $this->cell(5, 6, '', 1);
            }

            $this->ln();

           
                $number = 1;
                foreach ($students as $student) {
                    $this->cell(5, 6, $number, 1);
                    $this->cell(50, 6, $student['name'], 1);
                    $this->cell(25, 6, $student['id'], 1, 0, 'C');
                    $i = 0;
                    $number++;
                    while ($i <= 20) {
                        $i++;
                        $this->cell(5, 6, '', 1);
                    }
                    $this->ln();
                }
            } else {
                $this->SetFontSize(12);
                $this->SetTextColor(102, 161, 255);
                $this->cell(50, 6, "No students in this grade.");
            }
        }
    }
    $pdf = new PDF('P', 'mm', 'A4');
    $pdf->SetFont('Arial', '', 14);

    $pdf->list();
    $pdf->Output('', 'class_list.pdf');
} elseif (isset($_GET['staff']) and is_numeric($_GET['staff']) and !empty($_GET['staff'])) {
    require('fpdf.php');
    class PDF extends FPDF
    {
        function teachers()
        {
            include 'functions.php';
            $school = $_GET['staff'];
            $teachers = fetchAllTeachers($school);
            $genders = array('Male', 'Female');
            if (!empty($teachers) and $teachers !== ' ') {

                $this->AddPage();
                $this->SetFontSize(30);
                $this->cell(190, 20, "Staff List", 1, 100, 'C');
                $this->ln(10);

                $this->SetFontSize(10);

                $this->cell(7, 6, '#', 1);
                $this->cell(50, 6, 'Name', 1);
                $this->cell(20, 6, 'ID', 1, 0, 'C');
                $this->cell(50, 6, 'Email', 1, 0, 'C');
                $this->cell(20, 6, 'Number', 1, 0, 'C');
                $this->cell(20, 6, 'Gender', 1, 0, 'C');
                $this->cell(25, 6, 'Title', 1, 0, 'C');

                $this->ln();

                $number = 1;

                foreach ($teachers as $teacher) {
                    $this->cell(7, 6, $number, 1);
                    $this->cell(50, 6, $teacher['name'], 1);
                    $this->cell(20, 6, $teacher['id'], 1, 0, 'C');
                    $this->cell(50, 6, $teacher['email'], 1, 0);
                    $this->cell(20, 6, $teacher['tel'], 1, 0);
                    $this->cell(20, 6, $genders[$teacher['gender']], 1, 0);

                    if ($teacher['type'] == 1) {
                        $title = 'Dean';
                    }
                    if ($teacher['type'] == 2) {
                        $title = 'Teacher';
                    }

                    $this->cell(25, 6, $title, 1, 0);

                    $number++;

                    $this->ln();
                    //}
                    // }
                }
            } else {
                $this->cell(50, 6, "No staff found in the school");
            }
        }
    }
    $pdf = new PDF('P', 'mm', 'A4');
    $pdf->SetFont('Arial', '', 14);

    $pdf->teachers();
    $pdf->Output('', 'teachers.pdf');
} else {
    header("location:../index.php");
}
