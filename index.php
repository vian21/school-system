<?php
session_start();
if (isset($_SESSION['id'])) {
    /*
     * 0 : Admin
     * 1 : Academic dean
     * 2 : teacher
     *  3: accountant
     */

    if ($_SESSION['type'] == 0) {
        if (isset($_GET['admin'])) {
            include 'views/dean.php';
        } else {
            header("location:views/admin/index.php");
        }
    }

    if ($_SESSION['type'] == 1) {
        include 'views/dean.php';
    }

    if ($_SESSION['type'] == 2) {
        include 'views/teacher.php';
    }


    if ($_SESSION['type'] == 3) {
        include 'views/accountant.php';
    }


    if ($_SESSION['type'] == 4) {
        include 'views/student.php';
    }
} else {
    header("location:login.php");
}
