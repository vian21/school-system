<?php
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
    <?php include './modules/config.php' ?>
    <?php include './modules/staticFiles.php' ?>
    <?php include './modules/functions.php' ?>

    <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/dean.css">
    <title>Dean</title>
</head>

<body>
    <!-- Navbar -->
    <div id='navBar'>
        <div id="dropdown">
            <span></span>
        </div>
        <div id=term>
            <button id='editTerm'>Edit</button>

            <select id=termOptions>
            </select>
            <button id='addTerm'>+</button>
        </div>
        <div id="logout">
            <a href="<?php echo $app_url; ?>modules/logout.php"><button>Logout</button></a>
        </div>
    </div>
    <!-- Main div -->
    <div id="main">
        <div id="sidebar">
            <div id="user">
                <center><img src="<?php echo $app_url; ?>src/img/<?php echo fetchImage(1, $id); ?>" alt="" id="img"></center>
                <span id="username">Name: <?php echo fetchName(1, $id); ?></span>
                <span id="jobTitle"><?php echo fetchJobTitle($id); ?></span>
            </div>
        </div>
        <div id="workPlace">
            <div id="menubar">
                <button id="tab1">Students</button>
                <button id="tab2">Teachers</button>
                <button id="tab3">Marks</button>
                <button id="tab4">Accounting</button>
                <button id="tab5">Misc</button>
            </div>
            <div id="desk">

            </div>
        </div>
</body>
<script>
    var userType = 1;
    var userId = <?php echo $id . ";\n"; ?>
    <?php
    if (isset($_GET['admin'])) {
        $school_id = sanitize($_GET['school']);
    } else {
        $school_id = getSchoolId(1, $id);
    }
    ?>
    var schoolId = <?php echo $school_id; ?>;


    //fetch and compress all js files
    <?php echo minify(file_get_contents('./src/js/variables.js')); ?>
    <?php echo minify(file_get_contents('./src/js/functions.js')); ?>

    <?php echo compressCodeIn('./src/js/dean/runner/') ?>
    <?php echo compressCodeIn('./src/js/dean/tabs/') ?>
    <?php echo compressCodeIn('./src/js/dean/create/') ?>
    <?php echo compressCodeIn('./src/js/dean/retrieve/') ?>
    <?php echo compressCodeIn('./src/js/dean/update/') ?>
    <?php echo compressCodeIn('./src/js/dean/delete/') ?>
</script>

</html>