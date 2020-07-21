    <?php
    if (!isset($_SESSION['id'])) {
        header("location:../../login.php");
    }

    if ($_SESSION['type'] != 0) {
        header("location:../../modules/logout.php");
    }
    ?>
    <!-- Navbar -->
    <div id='navBar'>
        <div id="dropdown">
            <span></span>
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