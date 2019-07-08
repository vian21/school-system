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
    body {}

    form {}

    form input {}

    #submit {}
</style>

<body>
    <form action="auth.php" method="post">
        <input type="email" name="email" id='email' required><br>
        <input type="password" name="password" id='password' required><br>
        <button type="submit" id="submit">Login</button>
    </form>
</body>

</html>