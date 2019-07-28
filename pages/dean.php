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
            </div>
            <div id="desk">

            </div>
        </div>
</body>
<script src="src/js/select2.js"></script>
<script src="src/js/dean.js"></script>
<script src="src/js/staff.js"></script>
<script src="src/js/student.js"></script>

</html>