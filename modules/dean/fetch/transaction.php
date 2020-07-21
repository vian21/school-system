<?php


if (isset($_POST['id'])) {

    include("../../config.php");
    include("../../functions.php");

    $id = sanitize($_POST['id']);

    $query = $connect->query("SELECT * FROM (SELECT * FROM accounting WHERE student_id=$id ORDER BY id DESC LIMIT 30)Var1 ORDER BY id DESC;");
    $transactions = array();
    foreach ($query as $row) {
        $transaction = array();
        $transaction['id'] = $row['id'];
        $transaction['student_id'] = $row['student_id'];
        $transaction['name'] = getStudentInfo($row['student_id'])['name'];
        $transaction['date'] = $row['date'];
        $transaction['item'] = $row['item'];
        $transaction['type'] = $row['type'];
        $transaction['amount'] = $row['amount'];
        $transactions[] = $transaction;
    }
    echoJson($transactions);
}
