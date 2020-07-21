<?php
session_start();
$id = $_SESSION['id'];
if (!isset($_SESSION['id'])) {
    header("location:../login.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php include '../../modules/config.php' ?>
    <?php include '../../modules/functions.php' ?>

    <?php include '../../modules/staticFiles.php' ?>
    <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/dean.css">

    <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/select2.css">

    <script src="<?php echo $app_url; ?>src/js/select2.js"></script>

    <title>Admin</title>
</head>

<body>

    <?php include("sidebar.php"); ?>

    <div id="workplace">
        <div id="desk">
            <div id="table"></div>
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

    <?php echo minify(file_get_contents('../../src/js/variables.js')); ?>
    <?php echo minify(file_get_contents('../../src/js/functions.js')); ?>

    <?php echo compressCodeIn('../../src/js/admin/delete/') ?>

    <?php echo compressCodeIn('../../src/js/admin/create/') ?>
    <?php echo compressCodeIn('../../src/js/admin/retrieve/') ?>


    <?php echo minify(file_get_contents('../../src/js/admin/transactions.js')) ?>
</script>

</html>