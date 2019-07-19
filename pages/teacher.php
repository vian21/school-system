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
    <link rel="stylesheet" href="src/css/teacher.css">
    <link rel="stylesheet" href="src/css/select2.css">
    <title>Teacher</title>
</head>

<body>
    <!-- Navbar -->
    <div id='navBar'>
        <div id="dropdown">
            <span>==</span>
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
                <button id="tab">Marks</button>
            </div>
            <div id="desk">
                <form id="form">
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Subject</label>
                        <div class="col-sm-10">
                            <select name="subject" id="subject">
                            <option value="null"></option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Grade</label>
                        <div class="col-sm-10">
                            <select name="grade" id="grade">
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Test</label>
                        <div class="col-sm-10">
                            <select name="test" id="test" required>
                            </select>
                        </div>
                    </div>
                    <button id="view">View results</button>
                </form>
                <div id="results"></div>
            </div>
        </div>
    </div>
</body>
<script src="src/js/select2.js"></script>
<script src="src/js/teacher.js"></script>

</html>