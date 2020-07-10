<?php
session_start();
$id = $_SESSION['id'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php include '../../modules/config.php' ?>
    <?php include '../../modules/staticFiles.php' ?>
    <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/dean.css">

    <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/select2.css">
    
    <script src="<?php echo $app_url; ?>src/js/select2.js"></script>

    <?php include '../../modules/functions.php' ?>
    <title>Admin</title>
</head>

<body>

    <?php include("sidebar.php"); ?>

    <div id="workplace">
        <div id="desk">
            <div id='info'></div>
            <div id='commands'>
                <button id='deleteSchool' class="">Delete</button>
                <button id='pay' class="">Pay</button>
                <button id='transactions' class="">Transactions</button>
                <button id='login' class="">Login</button>

            </div>
            <div id='users'>
                <br>
                <h4>Users</h4>
                <div id="container"></div>
            </div>
        </div>
    </div>
    <!-- closing main div from sidebar.php -->
    </div>
</body>
<script>
    var userType = 0;
    var userId = <?php echo $id . ";\n"; ?>
    var schoolId = <?php echo $_GET['school']; ?>;

    //fetch and compress all js files

    <?php echo file_get_contents('../../src/js/variables.js'); ?>
    <?php echo file_get_contents('../../src/js/functions.js'); ?>

    <?php echo compressCodeIn('../../src/js/admin/delete/') ?>

    <?php echo compressCodeIn('../../src/js/admin/create/') ?>

    <?php echo compressCodeIn('../../src/js/admin/retrieve/') ?>

    <?php echo compressCodeIn('../../src/js/dean/update/') ?>

    <?php echo file_get_contents('../../src/js/dean/tabs/teachers_tab.js'); ?>
    <?php echo file_get_contents('../../src/js/dean/retrieve/teachers.js'); ?>
    <?php echo file_get_contents('../../src/js/dean/create/staff.js'); ?>
    <?php echo file_get_contents('../../src/js/dean/delete/staff.js'); ?>




    <?php echo file_get_contents('../../src/js/admin/manage.js'); ?>
</script>

</html>