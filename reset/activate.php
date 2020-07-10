<?php


function send($email, $id)
{
    include '../modules/config.php';
    include "../modules/phpMailer/class.phpmailer.php";
    include "../modules/phpMailer/class.smtp.php";

    $mail = new PHPMailer;
    $mail->IsSMTP();

    $mail->Mailer = "smtp";
    $mail->SMTPSecure = "tls";
    $mail->Port = '587';
    $mail->SMTPAuth = true;

    $mail->Host = 'smtp.gmail.com';

    $mail->Username = $app_email;
    $mail->Password = $app_password;

    $mail->AddAddress($email);

    $mail->SetFrom($app_email, $app_name);
    $mail->AddReplyTo($app_email, $app_name);

    //$mail->WordWrap = 50;
    $mail->IsHTML(true);
    $mail->Subject = 'Activate / Reset Account Password';

    $content = "<h2 style='font-family:Arial, Helvetica, sans-serif;'>Set Your Account Password</h2>";
    $content .= "<p style='line-height: 1.5;font-family:Arial, Helvetica, sans-serif;'>Click on the button below to activate / reset your account password</p><br><br>";
    $content .= '<center><a href="' . $app_url . 'reset/reset.php?id=' . $id . '">';
    $content .= "<button ";
    $content .= "style='line-height: 1.5;width:200px;height:45px;border-radius: 4px;border: 0;color: white;background-color: #428bca;padding-top: 3px;padding-right: 10px;padding-left: 10px;font-family:Arial, Helvetica, sans-serif;'>";
    $content .= "Activate</button></a></center>";

    $mail->MsgHTML($content);

    $mail->send();

    echo "ok";
}

if (isset($_POST['email'])) {

    include '../modules/config.php';

    $email = $_POST['email'];

    //Fetch the user corresponding to the email received in an array
    $fetchUser = mysqli_fetch_array($connect->query("SELECT*FROM users where email='$email'  LIMIT 1"));

    if (empty($fetchUser)) {
        $fetchUser = mysqli_fetch_array($connect->query("SELECT*FROM students where email='$email'  LIMIT 1"));
        $student = true;
    }

    if (empty($fetchUser)) {
        echo 'null';
    } else {
        send($email, $fetchUser['uniqueID']);
    }
}
