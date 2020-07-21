<?php
if (isset($_POST['id'])) {
    include '../../config.php';
    include("../../functions.php");

    $student = sanitize($_POST['id']);
    $period = sanitize($_POST['period']);
    $start = sanitize($_POST['start']);
    $end = sanitize($_POST['end']);
    $school = sanitize($_POST['school']);

    $info = array();

    //$query = $connect->query("SELECT * FROM discipline WHERE student_id=$student and period=$period");
    $query = $connect->query("SELECT * FROM (SELECT * FROM discipline WHERE student_id=$student and period=$period ORDER BY id DESC LIMIT 30)Var1 ORDER BY id DESC;");

    $discipline = array();

    foreach ($query as $row) {
        $record = array();
        $record['id'] = $row['id'];
        $record['student'] = $row['student_id'];
        $record['date'] = $row['date'];
        $record['type'] = $row['type'];
        $record['marks'] = $row['marks'];
        $record['comment'] = $row['comment'];
        $record['educator'] = fetchName(1, $row['educator']);
        $record['period'] = fetchPeriodName($row['period']);
        $record['start'] = $row['start'];
        $record['end'] = $row['end'];

        $discipline[] = $record;
    }

    $info[] = $discipline;

    //$comment_query = $connect->query("SELECT * FROM comments WHERE student_id=$student");
    $comment_query = $connect->query("SELECT * FROM (SELECT * FROM comments WHERE student_id=$student ORDER BY id DESC LIMIT 30)Var1 ORDER BY id DESC;");

    $comments = array();

    foreach ($comment_query as $row) {

        $record = array();

        $record['id'] = $row['id'];
        $record['student'] = $row['student_id'];
        $record['date'] = $row['date'];
        $record['comment'] = $row['comment'];
        $record['educator'] = fetchName(1, $row['educator']);
        $record['period'] =fetchPeriodName($row['period']);
        $record['start'] = $row['start'];
        $record['end'] = $row['end'];

        $comments[] = $record;
    }

    $info[] = $comments;

    echoJson($info);
}
