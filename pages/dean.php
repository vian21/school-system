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
                <!--
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
                -->
                <!-- Student start -->
                <div id="one">
                    <button id="addStudent">Add</button>
                    <div id='inputContainer'>
                        <select name="student" id="searchStudent">
                            <option></option>
                        </select>
                    </div>
                    <div id="info">
                        <center><img src="src/img/user.png" alt="" id="schoolImage"><br><br></center>
                        <span>Number of students: 200</span><br>
                        <span>Name: school</span><br>
                        <span>Number of students :<?php echo countStudents(1, 0); ?></span><br>
                        <span>Number of male students :100</span><br>
                        <span>Number of female students :100</span><br>
                        <span>Country :Burundi</span><br>
                        <span>Nationalities :5</span><br>
                        <span>Number of teachers :22</span><br>
                    </div>
                </div>
                <!-- Teacher start -->
                <div id="two" style="display:none">
                    <h1>2</h1>
                </div>
                <!-- Marks start -->
                <div id="three" style="display:none">
                    <h1>3</h1>
                </div>
            </div>
        </div>
    </div>
    <!-- New student form -->
    <div id="addStudentModal" style="display:none">
        <form>
            <h4>Name :</h4><br>
            <input type="text" name="name" id="studentName"><br>
            <h4>Student's email :</h4><br>
            <input type="email" name="email" id="studentEmail"><br>
            <h4>student's telephone number :</h4><br>
            <input type="number" name="tel" id="studentTel"><br>
            <h4>Grade :</h4><br>
            <select name="grade" id="studentGrade"><br>
                <option value=""></option>
            </select><br>
            <h4>Date of birth:</h4><br>
            <input type="date" name="DOB" id="studentDOB"><br>
        </form>
    </div>
</body>
<script src="src/js/select2.js"></script>
<script src="src/js/dean.js"></script>

</html>