<?php
require 'PHPMailer/PHPMailerAutoload.php';


//$email = "loskutov@t-dsk.ru";
$email = "985510@t-dsk.ru";
$email2 = "j.alexandrova@iq-adv.ru";
$email3 = "reklama@t-dsk.ru";
//$email4 = "yuliya.gorin@iq-adv.ru";

$subject = "Заявка с сайта  " . $_SERVER['HTTP_HOST'];
$from = 'From: no-reply@' . $_SERVER['HTTP_HOST'];

$mail = new PHPMailer;
$mail->isSendmail();
$mail->CharSet = "UTF-8";
$mail->setFrom('root@localhost', $from);
$mail->addAddress($email);
$mail->addAddress($email2);
$mail->addAddress($email3);
//$mail->addAddress($email4);

$mail->Subject = $subject;

if($_REQUEST["phone"] || $_REQUEST["name"])
{
    die(); // SPAM defence
}

if ($_GET[1]) {
    print_r($_REQUEST);
    die();
}

if($_POST["PHONE"])
{
    $message = 'Сообщение из формы "' . filter_input(INPUT_POST, "FORM_HEADER") . '"';
    $message .= "\nИмя: " . filter_input(INPUT_POST, "NAME")
        . "\nТелефон: " . filter_input(INPUT_POST, "PHONE")
        . ($_REQUEST["ROOM"] ? ("\nКоличество комнат: " . filter_input(INPUT_POST, "ROOM")) : '')
        . ($_REQUEST["FLOOR"] ? ("\nВыберите этаж:: " . filter_input(INPUT_POST, "FLOOR")) : '')
        . ($_REQUEST["COMMENTS"] ? ("\nДополнительные комментарии: " . filter_input(INPUT_POST, "COMMENTS")) : '')
        . ($_REQUEST["FORM_NAME"] ? ("\nТип обращения: " . filter_input(INPUT_POST, "FORM_NAME")) : '');
    $mail->Body = $message;


    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
        echo json_encode(array(
            "status" => "error",
            "message" => "При отправке произошла ошибка!"

        ));
    } else {
        echo json_encode(array(
            "status" => "success",
            "message" => "Спасибо!<br> Ваша заявка принята."

        ));
    }

//    if(mail($email, $subject, $message, $from))
//    {
//        echo json_encode(array(
//            "status" => "success",
//            "message" => "Спасибо!<br> Ваша заявка принята."
//
//        ));
//    } else {
//        echo json_encode(array(
//            "status" => "error",
//            "message" => "При отправке произошла ошибка!"
//
//        ));
//    }
}

?>