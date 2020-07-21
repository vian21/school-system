<?php

//insert period
if (
    isset($_POST['id']) and
    isset($_POST['name'])
) {
    include("../../config.php");
    include "../../functions.php";

    /*
     *post data
     * id : school
     * start : start of new year
     * end : end of new acaddemic year
     * currentstart : current period id
     * currentend current end of year
     * currentperiod : current academic period
     */
    $school_id = sanitize($_POST['id']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);

    $name = sanitize($_POST['name']);

    //if no period already exists
    if (!isset($_POST['currentstart'])) {
        $insert = $connect->query("INSERT INTO academic_periods(start,end,school,name) VALUES($start,$end,$school_id,'$name')");

        if ($insert) {
            echo "ok";
        } else {
            echo "ko";
        }
    }

    //creating a period within the same year
    if (isset($_POST['currentstart']) and $_POST['currentstart'] == $start) {
        $currentstart = sanitize($_POST['currentstart']);
        $currentend = sanitize($_POST['currentend']);
        $currentperiod = sanitize($_POST['currentperiod']);


        $insert = $connect->query("INSERT INTO academic_periods(start,end,school,name) VALUES($start,$end,$school_id,'$name')");

        if ($insert) {
            echo "ok";
        } else {
            echo "ko";
        }

        $id = $connect->insert_id;


        //students


        //fetch all students enrolled in current period
        $query = $connect->query("SELECT * FROM academic_enrollments WHERE start=$currentstart and end=$currentend and year=$currentperiod");

        //only run when there is a list of students
        if (mysqli_num_rows($query) !== 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                //we now have a list of students to loop throgh
                //take each student and enroll him1
                $student = $row['student'];
                $grade = $row['grade'];
                $insertenrollment = $connect->query("INSERT into academic_enrollments(student,grade,year,start,end,school) VALUES($student,$grade,$id,$start,$end,$school_id)");
            }
        }
    }

    //new academi year
    if (isset($_POST['currentstart']) and $_POST['currentstart'] !== $start) {
        $currentstart = sanitize($_POST['currentstart']);
        $currentend = sanitize($_POST['currentend']);
        $currentperiod = sanitize($_POST['currentperiod']);


        $insert = $connect->query("INSERT INTO academic_periods(start,end,school,name) VALUES($start,$end,$school_id,'$name')");

        if ($insert) {
            echo "ok";
        } else {
            echo "ko";
        }

        $id = $connect->insert_id;


        //students


        //fetch all students enrolled in current period
        $query = $connect->query("SELECT * FROM academic_enrollments WHERE start=$currentstart and end=$currentend and year=$currentperiod");

        //only run when there is a list of students
        if (mysqli_num_rows($query) !== 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                //we now have a list of students to loop throgh
                //take each student and enroll him1
                $student = $row['student'];
                $grade = $row['grade'];

                $grade_info_query = mysqli_fetch_assoc($connect->query("SELECT * FROM streams where id=$grade and school=$school_id"));

                $currentStream = $grade_info_query['stream'];

                $nextStream = (int) $grade_info_query['grade'] + 1;

                $nextStreamId = mysqli_fetch_assoc($connect->query("SELECT * FROM streams where grade=$nextStream and stream='$currentStream and school=$school_id'"));

                $gradeId = (int) $nextStreamId['id'];

                //academic enrollement
                $insertenrollment = $connect->query("INSERT into academic_enrollments(student,grade,year,start,end,school) VALUES($student,$gradeId,$id,$start,$end,$school_id)");


                //subject enrollment

                $compulsary_courses = fetchCompulsarySubjects($gradeId, $school_id);

                foreach ($compulsary_courses as $subject) {
                    $connect->query("INSERT INTO enrollment(student_id,subject,period,start,end) VALUES($student,$subject,$id,$start,$end)");
                }
            }
        }

        //teachers

        //fetch all teachers
        $teachers_query = $connect->query("SELECT * FROM teaches WHERE start=$currentstart and end=$currentend");

        //only run when there is a list of students
        if (mysqli_num_rows($teachers_query) !== 0) {

            while ($row = mysqli_fetch_assoc($teachers_query)) {
                //we now have a list of teachers to loop throgh
                $teacher = $row['teacher'];
                $subject = $row['subject'];

                $insertTeaching = $connect->query("INSERT into teaches(subject,teacher,start,end,period) VALUES($subject,$teacher,$start,$end,$id)");
            }
        }
    }
}
