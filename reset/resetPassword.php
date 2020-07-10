<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php include '../modules/config.php' ?>

    <?php include '../modules/staticFiles.php' ?>

    <title>Activate / Reset Password</title>
</head>
<style>
    body {
        margin: 0;
        background-color: #ffff;
        font-family: Arial, Helvetica, sans-serif;
    }

    form {
        width: 250px;
        text-align: center;
    }

    #container {
        width: 250px;
        text-align: center;
        padding-top: 200px;
    }

    form input {
        width: 100%;
        height: 45px;
        font-family: Montserrat-Bold;

    }

    button {
        border: 0;
    }

    #activate {
        width: 100%;
        color: white;
        height: 45px;

        background-color: #428bca;
    }

    #resend {
        width: 100%;
        color: white;
        height: 45px;

        background-color: #428bca;
    }

    #email_sent {
        color: #428bca;
    }
</style>

<body>
    <center>
        <div id='container'>
            <form>
                <input type="email" id='email' placeholder="Enter email address"><br><br>
                <button id='activate'>Activate / Reset Password</button>
            </form>
        </div>
    </center>
</body>
<script>
    $('document').ready(function() {
        var email = '';

        function send(email) {
            $("#container").html("<h6>Verifying ...</h6>")
            $.ajax({
                url: app_url + 'reset/activate.php',
                method: "post",
                data: {
                    email: email
                },
                success: function(response) {
                    if (response == 'null') {
                        alert("No account found for " + email + "");
                        $("#container").html(`<form>\
                                                <input type="email" id='email' placeholder="Enter email address"><br><br>\
                                                <button id='activate'>Activate / Reset Password</button>\
                                            </form>`)


                        $("#activate").click(function() {
                            event.preventDefault();

                            email = $("#email").val();

                            if (email == '') {
                                alert("Enter an email address");
                            } else {
                                send(email);
                            }
                        })
                    }
                    if (response == 'ok') {
                        $("#container").html("<h6>A link was sent to <b id=email_sent>" + email + "</b></h6><br>\
                                                    <button id=resend>Resend</button>");


                        $("#resend").click(function() {
                            event.preventDefault();

                            send(email);
                        })

                    }
                }
            })
        }

        $("#activate").click(function() {
            event.preventDefault();

            email = $("#email").val();

            if (email == '') {
                alert("Enter an email address");
            } else {
                send(email);
            }
        })



    })
</script>

</html>