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

    <?php include '../../modules/functions.php' ?>

    <title>Admin</title>
</head>

<body>
    <?php include("sidebar.php"); ?>

    <div id="workplace">

        <button id='create'>Create</button>
        <div id='schools'></div>

    </div>
    <!-- closing main div from sidebar.php -->
    </div>
</body>
<script>
    var userType = 0;
    var userId = <?php echo $id . ";\n"; ?>

    //fetch and compress all js files

    <?php echo file_get_contents('../../src/js/variables.js'); ?>
    <?php echo file_get_contents('../../src/js/functions.js'); ?>

    <?php echo compressCodeIn('../../src/js/admin/delete/') ?>

    <?php echo compressCodeIn('../../src/js/admin/create/') ?>

    <?php echo compressCodeIn('../../src/js/admin/retrieve/') ?>
    <?php echo file_get_contents('../../src/js/admin/main.js'); ?>

    <?php //echo compressCodeIn('../../src/js/admin/create/') 
    ?>
</script>

</html>