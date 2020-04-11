<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php include 'modules/staticFiles.php' ?>
    <title>Login</title>
</head>
<style>
    body {
        margin:0;
        background-color: #ffff;
        font-family: Arial, Helvetica, sans-serif;
    }

    form {
        width:250px;
        text-align: center;
        padding-top:100px;
    }

    form input {
        width:100%;
        height: 45px;
        font-family: Montserrat-Bold;

    }

    #submit {
        width:100%;
        color: white;
        height: 45px;

        background-color: #428bca;
    }
</style>

<body>
    <center>
    <form action="auth.php" method="post">
        <h1>Login</h1><br>
        <input type="email" name="email" id='email' placeholder="Enter email" required><br><br>
        <input type="password" name="password" id='password' placeholder="Enter password" required><br><br>
        <button type="submit" id="submit">Login</button>
    </form>
    </center>
</body>

</html>