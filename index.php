<?php
session_start();
if (isset($_SESSION['id'])) {
    /*
     * 1 : Academic dean
     * 2 : teacher
     */
    if ($_SESSION['type'] == 0) {
        include 'views/dean.php';
    }
    if ($_SESSION['type'] == 1) {
        include 'views/teacher.php';
    }
} else {
    header("location:login.php");
}
