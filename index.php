<?php
session_start();
if (isset($_SESSION['id'])) {
    /*
     * 0 : Academic dean
     * 1 : teacher
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
