<?php
//Database connection
include 'config.php';
//Functions
/*
 * Fetch name using id 
 * Parameter 1 : level
 *      1 : staff
 *      2 : student
 * parameter 2 : id
 */
function fetchName($level, $id)
{
    include 'config.php';

    if ($level == 1) {

        $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM users where id=$id"));
        //echo $getName['name'];
        return returnValue($getName['name']);
    }
    if ($level == 2) {
        $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM students where id=$id"));
        return returnValue($getName['name']);
    }
}


function fetchImage($level, $id)
{
    include 'config.php';
    if ($level == 1) {
        $getImage = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$id"));
        if ($getImage['image'] !== '') {
            return returnValue($getImage['image']);
        } else {
            return 'user.png';
        }
    }

    if ($level == 2) {
        $getImage = mysqli_fetch_assoc($connect->query("SELECT*FROM students WHERE id=$id"));
        if ($getImage['image'] !== '') {
            return returnValue($getImage['image']);
        } else {
            return 'user.png';
        }
    }
}
function fetchJobTitle($id)
{
    include 'config.php';
    $getTitle = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$id"));
    if ($getTitle['type'] == 0) {
        return "Admin";
    }
    if ($getTitle['type'] == 1) {
        return "Academic Dean";
    }
    if ($getTitle['type'] == 2) {
        return "Teacher";
    }
    if ($getTitle['type'] == 3) {
        return "Accountant";
    }
    if ($getTitle['type'] == 4) {
        return "Student";
    }
}
function fetchSubjectName($subject_id)
{
    include 'config.php';
    $getSubject_name = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject_id"));
    return returnValue($getSubject_name['subject_name']);
}
function echoJson($data)
{
    if (!empty($data)) {
        echo json_encode($data);
    } else {
        echo " ";
    }
}

function fetchSubjectsTaughtId($id, $start, $end)
{
    include 'config.php';

    $subjects_taught_id = $connect->query("SELECT subject FROM teaches WHERE teacher=$id and start=$start and end=$end");
    $subjects_taught_array = array();

    while ($row = mysqli_fetch_assoc($subjects_taught_id)) {
        $subjects_taught_array[] = $row['subject'];
    }
    return returnValue($subjects_taught_array);
}

function fetchTestsDone($subject_id, $school_id, $period)
{
    include 'config.php';

    if ($subject_id == 'all') {
        $select_test = $connect->query("SELECT * FROM assessments Where school=$school_id AND period=$period");

        $tests_done = array();

        while ($row = mysqli_fetch_assoc($select_test)) {
            $tests_done_sub_array = array();

            $tests_done_sub_array['id'] = $row['id'];
            $tests_done_sub_array['period'] = $row['period'];
            $tests_done_sub_array['name'] = $row['name'];
            $tests_done_sub_array['month'] = $row['month'];
            $tests_done_sub_array['subject'] = $row['subject'];

            $tests_done[] = $tests_done_sub_array;
        }
        return returnValue($tests_done);
    } else {
        $select_test = $connect->query("SELECT * FROM assessments WHERE school=$school_id and subject=$subject_id and period=$period");

        $tests = array();

        while ($row = mysqli_fetch_assoc($select_test)) {
            $tests[] = $row['id'];
        }
        return returnValue($tests);
    }
}
function returnValue($data)
{
    if (!empty($data)) {
        return $data;
    } else {
        return "";
    }
}

function fetchTestNames($assessment_id)
{
    include 'config.php';

    $select_test_name = mysqli_fetch_assoc($connect->query("SELECT * FROM assessments WHERE id=$assessment_id"));

    return returnValue($select_test_name['name']);
}

function fetchStreamsId($subject_id)
{
    include 'config.php';
    $select_streams_id = mysqli_fetch_assoc($connect->query("SELECT stream FROM subjects where id=$subject_id"));
    return returnValue($select_streams_id['stream']);
}

function fetchStreamName($stream_id)
{
    include 'config.php';
    $select_stream_name = mysqli_fetch_assoc($connect->query("SELECT*FROM streams WHERE id=$stream_id"));
    return returnValue($select_stream_name);    //array(grade + stream)
}

function fetchSubjectsLearnt($student_id, $grade)
{
    include 'config.php';
    $subjectsLearnt = $connect->query("SELECT * FROM subjects WHERE stream=$grade");

    $subjects = array();
    while ($row = mysqli_fetch_assoc($subjectsLearnt)) {
        $sub_array = array();

        $sub_array['id'] = $row['id'];
        $sub_array['name'] = $row['subject_name'];
        $sub_array['hours'] = $row['hours'];

        /*
         * 0 for compulsary
         * 1 for elective
         */
        $sub_array['type'] = $row['type'];

        /*
         * 0 for not enrolled
         * 1 for enrolled
         */
        $sub_array['status'] = isEnrolled($student_id, $row['id']);
        $subjects[] = $sub_array;
    }

    return $subjects;
}

function isEnrolled($student_id, $subject_id)
{
    include("config.php");

    $status = 0;
    if (mysqli_fetch_assoc($connect->query("SELECT*FROM enrollment WHERE student_id=$student_id AND subject=$subject_id")) != null) {
        $status = 1;
    }

    return $status;
}
function fetchStudentsMarks($id)
{
    include 'config.php';
    $getMarks = $connect->query("SELECT*FROM marks WHERE test_id=$id");
    return returnValue($getMarks);
}

function whatGrade($student, $year)
{
    include 'config.php';

    $query = mysqli_fetch_assoc($connect->query("SELECT grade FROM academic_enrollments where student=$student and year=$year"));

    return $query['grade'];
}

function fetchAllStudents($where, $school, $student = 0)
{
    include 'config.php';

    if ($where == 'all') {
        $get_students = $connect->query("SELECT*FROM students WHERE school=$school");
        $students = array();
        while ($row = mysqli_fetch_assoc($get_students)) {
            $students_array = array();
            $students_array['id'] = $row['id'];
            $students_array['name'] = $row['name'];
            $students_array['admissionID'] = $row['admissionID'];
            $students_array['gender'] = $row['gender'];
            $students_array['image'] = $row['image'];
            $students_array['email'] = $row['email'];
            $students_array['tel'] = $row['tel'];
            $students_array['DOB'] = $row['DOB'];
            $students_array['status'] = $row['status'];
            $students_array['account_status'] = $row['account_status'];
            $students[] = $students_array;
        }
        return returnValue($students);
    }

    //select students in particular grade
    if ($where != 'all') {
        include 'config.php';
        if ($student == 0) {
            $get_students = $connect->query("SELECT DISTINCT(student) from  academic_enrollments where grade=$where and school=$school");
        } else {
            $get_students = $connect->query("SELECT DISTINCT(student) from  academic_enrollments where grade=$where and school=$school and student=$student");
        }

        $students = array();
        while ($row = mysqli_fetch_assoc($get_students)) {

            $students[] = getStudentInfo($row['student']);
        }
        return returnValue($students);
    }
}

function fetchStudentsTaking($subject_id, $period)
{
    include 'config.php';
    $get_students = $connect->query("SELECT * FROM enrollment WHERE subject=$subject_id and period=$period");
    $students = array();
    while ($row = mysqli_fetch_assoc($get_students)) {
        $students[] = $row['student_id'];
    }
    return $students;
}

//function to count students
// 1 : count all students in the school
// 2 : students in a certain grade
function countStudents($in, $stream_id, $school, $start = 0, $end = 0)
{
    include 'config.php';

    if ($in == 1) {
        $count = mysqli_num_rows($connect->query("SELECT*FROM students where school=$school"));
        return $count;
    }

    if ($in == 2) {
        $count = mysqli_num_rows($connect->query("SELECT*FROM academic_enrollments WHERE grade=$stream_id and school=$school and start=$start and end=$end"));
        return $count;
    }
}

//function to count teachers
function countTeachers($school)
{
    include 'config.php';
    $count = mysqli_num_rows($connect->query("SELECT*FROM users WHERE school=$school"));
    return $count;
}
function fetchAllTeachers($school_id)
{
    include 'config.php';
    // $get_teachers = $connect->query("SELECT*FROM users WHERE type=2");
    $get_teachers = $connect->query("SELECT*FROM users where school=$school_id");

    $teachers = array();

    while ($row = mysqli_fetch_assoc($get_teachers)) {
        $teacher_array = array();
        $teacher_array['id'] = $row['id'];
        $teacher_array['name'] = $row['name'];
        $teacher_array['image'] = $row['image'];
        $teacher_array['email'] = $row['email'];
        $teacher_array['gender'] = $row['gender'];
        $teacher_array['tel'] = $row['tel'];
        $teacher_array['type'] = $row['type'];
        $teachers[] = $teacher_array;
    }
    return returnValue($teachers);
}
function fetchAllStreams($school, $start = 0, $end = 0)
{
    include 'config.php';

    $get_streams = $connect->query("SELECT*FROM streams where school=$school ORDER BY `streams`.`grade` DESC");

    $streams = array();

    while ($column = mysqli_fetch_assoc($get_streams)) {
        $stream_array = array();
        $stream_array['id'] = $column['id'];
        $stream_array['grade'] = $column['grade'];
        $stream_array['stream'] = $column['stream'];
        $stream_array['students'] = countStudents(2, $column['id'], $school, $start, $end);
        $streams[] = $stream_array;
    }

    return returnValue($streams);
}
function fetchAllSubjects($where, $school_id)
{
    include 'config.php';

    if ($where == 'all') {
        $get_subjects = $connect->query("SELECT*FROM subjects WHERE school=$school_id");
        $subjects = array();
        while ($row = mysqli_fetch_assoc($get_subjects)) {
            $subjects_array = array();
            $subjects_array['id'] = $row['id'];
            $subjects_array['name'] = $row['subject_name'];
            $subjects_array['stream'] = $row['stream'];
            $subjects_array['type'] = $row['type'];
            $subjects_array['hours'] = $row['hours'];
            $subjects[] = $subjects_array;
        }
        return returnValue($subjects);
    } else {
        $get_subjects = $connect->query("SELECT*FROM subjects where stream=$where");
        $subjects = array();
        while ($row = mysqli_fetch_assoc($get_subjects)) {
            $subjects_array = array();
            $subjects_array['id'] = $row['id'];
            $subjects_array['name'] = $row['subject_name'];
            $subjects_array['stream'] = $row['stream'];
            $subjects_array['type'] = $row['type'];
            $subjects[] = $subjects_array;
        }
        return returnValue($subjects);
    }
}
function fetchAcademicPeriods($school_id)
{
    include 'config.php';

    $get_periods = $connect->query("SELECT*FROM academic_periods WHERE school=$school_id");
    $periods = array();
    while ($row = mysqli_fetch_assoc($get_periods)) {
        //fetch periods in that year
        $sub_array = array();
        $sub_array['id'] = $row['id'];
        $sub_array['year'] = array($row['start'], $row['end']);
        $sub_array['period_name'] = $row['name'];
        $periods[] = $sub_array;
    }
    return returnValue($periods);
}

function fetchPeriodName($id)
{
    include 'config.php';


    $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM academic_periods where id=$id"));
    return returnValue($getName['name']);
}
function getStudentInfo($id)
{
    include 'config.php';
    $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM students WHERE id=$id"));
    $student_info = array();
    $student_info['id'] = $get_info['id'];
    $student_info['name'] = $get_info['name'];
    //$student_info['stream'] = $get_info['grade'];
    $student_info['image'] = $get_info['image'];
    $student_info['DOB'] = $get_info['DOB'];
    $student_info['status'] = $get_info['status'];
    $student_info['account_status'] = $get_info['account_status'];
    return returnValue($student_info);
}

/**
 * Fetch compulsary subjects taken by a specific grade
 */
function fetchCompulsarySubjects($grade, $school)
{
    include 'config.php';

    $get_subjects = $connect->query("SELECT*FROM subjects WHERE school=$school and stream=$grade AND type=0");

    $subjects = array();

    while ($column = mysqli_fetch_assoc($get_subjects)) {
        $subjects[] = $column['id'];
    }

    return $subjects;
}

/**
 * Fetch information about a school
 */
function fetchSchoolInfo($id)
{
    include 'config.php';
    $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM schools WHERE id=$id"));
    return returnValue($get_info);
}

/**
 * Get school Id of a user
 * 
 * $level
 * 
 * 1 : staff user
 * 
 * 2 : student
 */
function getSchoolId($level, $userId)
{
    include 'config.php';

    if ($level == 1) {
        $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$userId"));
    }

    if ($level == 2) {
        $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM students WHERE id=$userId"));
    }

    return returnValue($get_info['school']);
}

/**
 * Fetch students in a grade
 * 
 * $student(optional) : fetch only one student -> this is used for generating one students report
 * 
 * $period(optional) : to fetch students enrolled in that period
 */
function fetchStudentsIn($grade, $school, $period = 0, $student = 0)
{
    include 'config.php';
    $query = "SELECT distinct student FROM academic_enrollments WHERE grade=$grade and school=$school ";

    if ($period !== 0) {
        $query .= "and year=$period";
    }

    if ($student !== 0) {
        $query .= "and student=$student";
    }

    $get_students = $connect->query($query);

    $students = array();
    while ($column = mysqli_fetch_assoc($get_students)) {

        $students[] = getStudentInfo($column['student']);
    }
    return returnValue($students);
}

/**
 * Get hours learnt per week for a subject
 */
function getHours($subject)
{
    include 'config.php';
    $get_hours = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject"));
    return $get_hours['hours'];
}

/**
 * Get Grade for a mark compared to grading scale in database
 */
function grade($school, $marks)
{
    include 'config.php';

    $getGrade = mysqli_fetch_assoc($connect->query("SELECT*FROM grading where school_id=$school and max >= $marks and min <= $marks"));

    return returnValue($getGrade['grade']);
}

/**
 * Get GPA for a given mark comparing it to the grading scale in database
 */
function GPA($school, $marks)
{
    //rounding off to accomodate marks in between
    $marks = round($marks);
    include 'config.php';

    $getGpa = mysqli_fetch_assoc($connect->query("SELECT*FROM grading where school_id=$school  and max >= $marks and min <= $marks"));
    //echo $getName['name'];
    return returnValue($getGpa['gpa']);
}

function countMaleStudents($school)
{
    include 'config.php';

    $number = mysqli_num_rows($connect->query("SELECT*FROM students WHERE gender=0 and school=$school"));

    return $number;
}

function countFemaleStudents($school)
{
    include 'config.php';

    $number = mysqli_num_rows($connect->query("SELECT*FROM students WHERE gender=1 and school=$school"));

    return $number;
}
/**
 *  Sanitize a given input for msql attacks and strip html and php tags
 */
function sanitize($input)
{
    include 'config.php';

    return mysqli_real_escape_string($connect, htmlentities($input));
}

/**
 * Compress and minify javascript or CSS code in a folder
 */
function compressCodeIn($folder)
{
    $files = array_diff(scandir($folder), array('..', '.', 'index.php'));

    $code = "";

    foreach ($files as $file) {
        $sub_code = file_get_contents($folder . $file);
        $code .= "\n" . $sub_code;
        //$code.=$sub_code;
    }
    return minify($code);
}

/**
 * Minify code input
 */
function minify($code)
{

    $code = preg_replace("/\s*\n\s*/", "\n", $code);
    return $code;
}

/**
 * Get balance of a student
 */
function getBalance($student)
{
    include 'config.php';

    $query = mysqli_fetch_assoc($connect->query("SELECT SUM(amount) AS sum FROM accounting WHERE student_id=$student"));

    $sum = $query['sum'];

    return $sum;
}

/**
 * Function to generate a table to be used on reports for the grading scale
 */
function gradingTable($school)
{

    include 'config.php';

    $get_grading = $connect->query("SELECT*FROM grading WHERE school_id=$school");


    $table = '<table id="scale" style="width: 100%;font-size:8px;">';

    $table .= "<tr>";

    $table .= '<td colspan="3" rowspan="3" style="border:1px solid black;padding-top:10px;text-align:center;">Grading scale</td>';
    $table .= '<td colspan="2" style="border:1px solid black;">scale</td>';

    while ($row = mysqli_fetch_assoc($get_grading)) {
        $table .= '<td style="border:1px solid black;">' . $row['max'] . '-' . $row['min'] . '</td>';
    }

    $table .= "</tr>";


    $table .= "<tr>";
    $table .= '<td colspan="2">Grade</td>';

    $get_grading = $connect->query("SELECT*FROM grading WHERE school_id=$school");

    while ($row = mysqli_fetch_assoc($get_grading)) {
        $table .= '<td style="border:1px solid black;">' . $row['grade'] . '</td>';
    }
    $table .= "</tr>";



    $table .= "<tr>";
    $table .= '<td colspan="2" style="border:1px solid black;">GPA</td>';

    $get_grading = $connect->query("SELECT*FROM grading WHERE school_id=$school");

    while ($row = mysqli_fetch_assoc($get_grading)) {
        $table .= '<td style="border:1px solid black;">' . $row['gpa'] . '</td>';
    }
    $table .= "</tr>";

    $table .= "</table>";


    return returnValue($table);
}
