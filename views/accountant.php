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
    <link rel="stylesheet" href="src/css/dean.css">
    <link rel="stylesheet" href="src/css/select2.css">
    <title>Accountant</title>
</head>

<body>
    <!-- Navbar -->
    <div id='navBar'>
        <div id="dropdown">
            <span></span>
        </div>
        <div id=term>
            <select id=termOptions>
            </select>
        </div>
        <div id="logout">
            <a href="<?php echo $app_url; ?>modules/logout.php"><button>Logout</button></a>
        </div>
    </div>
    <!-- Main div -->
    <div id="main">
        <div id="sidebar">
            <div id="user">
                <center><img src="src/img/<?php echo fetchImage(1, $id); ?>" alt="" id="img"></center>
                <span id="username">Name: <?php echo fetchName(1, $id); ?></span>
                <span id="jobTitle"><?php echo fetchJobTitle($id); ?></span>
            </div>
        </div>
        <div id="workPlace">
            <div id="menubar">
                <button id="tab">Accounting</button>
                <div id="container"></div>
            </div>

        </div>
    </div>
</body>
<script src="src/js/accountant/accountant.js"></script>
<script src="src/js/functions.js"></script>

<script>
    var userType = 3;
    var userId = <?php echo $id . ";\n"; ?>

    <?php
    if (isset($_GET['admin'])) {
        $school_id = $_GET['school'];
    } else {
        $school_id = getSchoolId(1, $id);
    }
    ?>
    var schoolId = <?php echo $school_id; ?>;

    <?php echo minify(file_get_contents('./src/js/variables.js')); ?>
    <?php echo minify(file_get_contents('./src/js/functions.js')); ?>


    <?php echo minify(file_get_contents('./src/js/dean/tabs/accounting.js')); ?>
    <?php echo minify(file_get_contents('./src/js/dean/tabs/teachers_tab.js')); ?>



    <?php echo compressCodeIn('./src/js/dean/create/') ?>
    <?php echo compressCodeIn('./src/js/dean/retrieve/') ?>
    <?php echo compressCodeIn('./src/js/dean/update/') ?>
    <?php echo compressCodeIn('./src/js/teacher/delete/') ?>
</script>

</html>