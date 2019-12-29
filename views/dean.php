<?php
$id = $_SESSION['id'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php include './modules/config.php' ?>
    <?php include './modules/staticFiles.php' ?>
    <?php include './modules/functions.php' ?>

    <link rel="stylesheet" href="src/css/dean.css">
    <link rel="stylesheet" href="src/css/select2.css">
    <script src="./src/js/select2.js"></script>
    <title>Dean</title>
</head>

<body>
    <!-- Navbar -->
    <div id='navBar'>
        <div id="dropdown">
            <span>==</span>
        </div>
        <div id=term>
            <select id=termOptions>
            </select>
            <button id='addTerm'>+</button>
        </div>
        <div id="logout">
            <span><a href="./modules/logout.php">Logout</a></span>
        </div>
    </div>
    <!-- Main div -->
    <div id="main">
        <div id="sidebar">
            <div id="user">
                <center><img src="src/img/<?php echo fetchImage(1, $id); ?>" alt="" id="img"></center>
                <span id="username">Name :<?php echo fetchName(1, $id); ?></span>
                <span id="jobTitle">Job : <?php echo fetchJobTitle($id); ?></span>
            </div>
        </div>
        <div id="workPlace">
            <div id="menubar">
                <button id="tab1">Students</button>
                <button id="tab2">Teachers</button>
                <button id="tab3">Marks</button>
                <button id="tab4">Misc</button>
            </div>
            <div id="desk">

            </div>
        </div>
</body>
<!--<script src="src/js/select2.js"></script>
<script src="src/js/dean/dean.js"></script>
<script src="src/js/common.js"></script>-->
<script>
    var numberOfStudents = <?php echo countStudents(1, 0) . ";\n"; ?>
    var numberOfMaleStudents = <?php echo countMaleStudents() . ";\n"; ?>
    var numberOfFemaleStudents = <?php echo countFemaleStudents() . ";\n"; ?>

    var numberOfTeachers = <?php echo countTeachers() . ";\n"; ?>
    var userId = <?php echo $id . ";\n"; ?>

    //fetch and compress all js files
    <?php echo file_get_contents('./src/js/dean/variables.js'); ?>
    <?php echo file_get_contents('./src/js/dean/functions.js'); ?>

    <?php echo compressCodeIn('./src/js/dean/runner/') ?>
    <?php echo compressCodeIn('./src/js/dean/tabs/') ?>
    <?php echo compressCodeIn('./src/js/dean/create/') ?>
    <?php echo compressCodeIn('./src/js/dean/retrieve/') ?>
    <?php echo compressCodeIn('./src/js/dean/update/') ?>
    <?php echo compressCodeIn('./src/js/dean/delete/') ?>
</script>

</html>

