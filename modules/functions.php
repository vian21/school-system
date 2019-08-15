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
//Database connection
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
        return returnValue($getImage['image']);
    }
    if ($level == 2) {
        $getName = mysqli_fetch_assoc($connect->query("SELECT*FROM students WHERE id=$id"));
        return returnValue($getImage['image']);
    }
}
function fetchJobTitle($id)
{
    include 'config.php';
    $getTitle = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$id"));
    if ($getTitle['type'] == 1) {
        return "Dean";
    }
    if ($getTitle['type'] == 2) {
        return "Teacher";
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

function fetchSubjectsTaughtId($id)
{
    include 'config.php';

    $subjects_taught_id = $connect->query("SELECT subject FROM teaches WHERE teacher=$id");
    $subjects_taught_array = array();

    while ($row = mysqli_fetch_assoc($subjects_taught_id)) {
        $subjects_taught_array[] = $row['subject'];
    }
    return returnValue($subjects_taught_array);
}

function fetchTestsDone($subject_id, $period)
{
    include 'config.php';

    if ($subject_id == 'all') {
        $select_test = $connect->query("SELECT * FROM assessments Where period=$period");

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
        $select_test = $connect->query("SELECT * FROM assessments WHERE subject=$subject_id and period=$period");

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

function fetchStudentsMarks($id)
{
    include 'config.php';
    $getMarks = $connect->query("SELECT*FROM marks WHERE test_id=$id");
    return returnValue($getMarks);
}

function fetchAllStudents($where)
{
    include 'config.php';
    if ($where == 'all') {
        $get_students = $connect->query("SELECT*FROM students");
        $students = array();
        while ($row = mysqli_fetch_assoc($get_students)) {
            $students_array = array();
            $students_array['id'] = $row['id'];
            $students_array['name'] = $row['name'];
            $students_array['gender'] = $row['gender'];
            $students_array['image'] = $row['image'];
            $students_array['email'] = $row['email'];
            $students_array['tel'] = $row['tel'];
            $students_array['grade'] = $row['grade'];
            $students_array['DOB'] = $row['DOB'];
            $students_array['status'] = $row['status'];
            $students_array['account_status'] = $row['account_status'];
            $students[] = $students_array;
        }
        return returnValue($students);
    }
    //if where is grade
    else {
        $get_students = $connect->query("SELECT*FROM students where grade=$where");
        $students = array();
        while ($row = mysqli_fetch_assoc($get_students)) {
            $students_array = array();
            $students_array['id'] = $row['id'];
            $students_array['name'] = $row['name'];
            $students_array['image'] = $row['image'];
            $students_array['email'] = $row['email'];
            $students_array['tel'] = $row['tel'];
            $students_array['grade'] = $row['grade'];
            $students_array['DOB'] = $row['DOB'];
            $students_array['status'] = $row['status'];
            $students_array['account_status'] = $row['account_status'];
            $students[] = $students_array;
        }
        return returnValue($students);
    }
}

function fetchStudentsTaking($subject_id, $period)
{
    include 'config.php';
    $get_students = $connect->query("SELECT*FROM enrollment WHERE subject=$subject_id and period=$period");
    $students = array();
    while ($row = mysqli_fetch_assoc($get_students)) {
        $students[] = $row['student_id'];
    }
    return $students;
}

//function to count students
// 1 : count all students in the school
// 2 : students in a certain grade
function countStudents($in, $stream_id)
{
    include 'config.php';

    if ($in == 1) {
        $count = mysqli_num_rows($connect->query("SELECT*FROM students"));
        return returnValue($count);
    }

    if ($in == 2) {
        $count = mysqli_num_rows($connect->query("SELECT*FROM students WHERE grade=$stream_id"));
        return returnValue($count);
    }
}

//function to count teachers
function countTeachers()
{
    include 'config.php';
    $count = mysqli_num_rows($connect->query("SELECT*FROM users WHERE type=1"));
    return returnValue($count);
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
function fetchAllStreams()
{
    include 'config.php';
    $get_streams = $connect->query("SELECT*FROM streams ORDER BY `streams`.`grade` DESC");

    $streams = array();

    while ($column = mysqli_fetch_assoc($get_streams)) {
        $stream_array = array();
        $stream_array['id'] = $column['id'];
        $stream_array['grade'] = $column['grade'];
        $stream_array['stream'] = $column['stream'];
        $stream_array['students'] = countStudents(2, $column['id']);
        $streams[] = $stream_array;
    }

    return returnValue($streams);
}
function fetchAllSubjects($where)
{
    include 'config.php';

    if ($where == 'all') {
        $get_subjects = $connect->query("SELECT*FROM subjects");
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
function fetchAcademicYears()
{
    include 'config.php';
    $get_years = $connect->query("SELECT*FROM academic_year");
    return returnValue($get_years);
}
function fetchPeriods($in)
{
    /*if($in=='all'){

    }
    else{*/
    include 'config.php';
    $get_periods = $connect->query("SELECT*FROM periods WHERE academic_year=$in");
    $periods = array();
    while ($column = mysqli_fetch_assoc($get_periods)) {
        $sub_array = array();
        $sub_array['id'] = $column['id'];
        $sub_array['name'] = $column['name'];
        $periods[] = $sub_array;
    }
    return returnValue($periods);
    //}

}

function getStudentInfo($id)
{
    include 'config.php';
    $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM students WHERE id=$id"));
    $student_info = array();
    $student_info['id'] = $get_info['id'];
    $student_info['name'] = $get_info['name'];
    $student_info['stream'] = $get_info['grade'];
    $student_info['image'] = $get_info['image'];
    $student_info['DOB'] = $get_info['DOB'];
    $student_info['status'] = $get_info['status'];
    $student_info['account_status'] = $get_info['account_status'];
    return returnValue($student_info);
}

function fetchCompulsarySubjects($grade)
{
    include 'config.php';

    $get_subjects = $connect->query("SELECT*FROM subjects WHERE stream=$grade AND type=1");

    $subjects = array();

    while ($column = mysqli_fetch_assoc($get_subjects)) {
        $subjects[] = $column['id'];
    }

    return $subjects;
}

function fetchSchoolInfo($id)
{
    include 'config.php';
    $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM info WHERE id=$id"));
    return returnValue($get_info);
}

function getSchoolId($userId)
{
    include 'config.php';

    $get_info = mysqli_fetch_assoc($connect->query("SELECT*FROM users WHERE id=$userId"));

    return returnValue($get_info['school']);
}


function fetchStudentsIn($grade)
{
    include 'config.php';
    $get_students = $connect->query("SELECT*FROM students WHERE grade=$grade");
    $students = array();
    while ($column = mysqli_fetch_assoc($get_students)) {
        $student_sub_array = array();
        $student_sub_array['id'] = $column['id'];
        $student_sub_array['name'] = $column['name'];
        $students[] = $student_sub_array;
    }
    return returnValue($students);
}
function getHours($subject)
{
    include 'config.php';
    $get_hours = mysqli_fetch_assoc($connect->query("SELECT*FROM subjects WHERE id=$subject"));
    return $get_hours['hours'];
}

function grade($mark)
{
    if ($mark > 93) {
        return 'A ';
    }

    if ($mark <= 92 and $mark >= 90) {
        return 'A-';
    }

    if ($mark <= 89 and $mark >= 87) {
        return 'B+';
    }

    if ($mark <= 86 and $mark >= 83) {
        return 'B ';
    }

    if ($mark <= 82 and $mark >= 80) {
        return 'B-';
    }

    if ($mark <= 79 and $mark >= 77) {
        return 'C+';
    }
    if ($mark <= 76 and $mark >= 73) {
        return 'C ';
    }

    if ($mark <= 72 and $mark >= 70) {
        return 'C-';
    }

    if ($mark <= 69 and $mark >= 67) {
        return 'D+';
    }

    if ($mark <= 66 and $mark >= 63) {
        return 'D ';
    }

    if ($mark <= 62 and $mark >= 60) {
        return 'D-';
    }

    if ($mark < 60) {
        return 'F ';
    }
}

function countMaleStudents()
{
    include 'config.php';

    $number = mysqli_num_rows($connect->query("SELECT*FROM students WHERE gender=0"));

    return $number;
}

function countFemaleStudents()
{
    include 'config.php';

    $number = mysqli_num_rows($connect->query("SELECT*FROM students WHERE gender=1"));

    return $number;
}

function compressCodeIn($folder)
{
    $files = array_diff(scandir($folder), array('..', '.', 'index.php'));

    $code = "";

    foreach ($files as $file) {
        $sub_code = file_get_contents($folder . $file);
        $code .= "\n" . $sub_code;
    }
    return $code;
}
