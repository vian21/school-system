<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php include './modules/config.php' ?>
    <?php include './modules/staticFiles.php' ?>
    <link rel="stylesheet" href="src/css/teacher.css">
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
                <center> <img src="src/img/user.png" alt="" id="img"></center>
                <span id="username">Name : Me</span>
                <span id="jobTitle">Job : Teacher</span>
            </div>
        </div>
        <div id="workPlace">
            <div menubar>
                <button>Marks</button>
            </div>
            <div id="desk"></div>
        </div>
    </div>
</body>

</html>