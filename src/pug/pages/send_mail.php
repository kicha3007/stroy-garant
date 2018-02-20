<?php
//var_dump($_FILES['file']);
//var_dump($_REQUEST);
$s_mail_to = "macros23@mail.ru";
$s_mail_from = "mmm@mail.ru";
$s_name_message = "242";
$s_message = "";
if(!empty($_REQUEST["form"]))
    $s_mass =$_REQUEST["form"];
else
    $s_mass =$_REQUEST;
$s_fio = trim($s_mass['name']);
$s_tel = $s_mass['phone'];
$s_type_kitchen = array("1"=>"П-образная кухня","2"=>"Г-образная кухня","3"=>"Прямая кухня");
$i_length = 0;
$i_width = 0;
$i_width2 = 0;
$s_wall_panel = array("1"=>"Альбико","2"=>"Термопластик","3"=>"Стекло фотопечатью","4"=>"Нет");
$s_worktop = array("1"=>"Камень","2"=>"Термопластик 38мм");
$s_closers = array("1"=>"С доводчиками","2"=>"Без доводчиков");
$file = "";
$message =iconv("UTF-8","Windows-1251","Имя: " . $s_fio . "\r\nТелефон:" . $s_tel."\r\n");

$s_type_form =$s_mass['section'];

switch ($s_type_form) {
    case 'advantages_section':
    case 'contacts_section':
        $s_name_message = 'Получить рассчет';
        $s_message = $message;
        break;
    case '1':
        $s_name_message = 'Узнать стоимость';
        $s_message = $message;
        break;
    case 'review_section':
        $s_name_message = 'Заявка по фото';
        move_uploaded_file($_FILES["file"]["tmp_name"][1], $_SERVER["DOCUMENT_ROOT"]."/".$_FILES["file"]["name"][1]);
        $filename = $_FILES["file"]["name"][1]; //Имя файла для прикрепления

        $boundary = "---"; //Разделитель
        /* Заголовки */
        $headers = "From: $s_mail_from\nReply-To: $s_mail_from\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
        $s_message = "--$boundary\n";
        /* Присоединяем текстовое сообщение */
        $s_message .= "Content-type: text/html; charset='utf-8'\n";
        $s_message .= "Content-Transfer-Encoding: quoted-printablenn";
        $s_message .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
        $s_message .=$message ;
        $s_message .= "--$boundary\n";
        $file = fopen($filename, "r"); //Открываем файл
        $text = fread($file, filesize($filename)); //Считываем весь файл
        fclose($file); //Закрываем файл
        /* Добавляем тип содержимого, кодируем текст файла и добавляем в тело письма */
        $s_message .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n";
        $s_message .= "Content-Transfer-Encoding: base64\n";
        $s_message .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
        $s_message .= chunk_split(base64_encode($text))."\n";
        $s_message .= "--".$boundary ."--\n";
        break;
    case 'calc_section':
        $s_name_message = 'Заявка на расчет стоимости кухни';
        $i_length = $s_mass['calc_length']."см";
        $i_width = $s_mass['calc_width']."см";
        $i_width2 = $s_mass['calc_width_second']."см";


        if ($s_mass['kitchen_type'] == "2")
            $i_width2 = "-";
        if ($s_mass['kitchen_type'] == "3") {
            $i_width2 = "-";
            $i_width = "-";
        }
        $s_message = iconv("UTF-8","Windows-1251","Имя: " . $s_fio . "\r\nТелефон:" . $s_tel . "\r\n\r\nТип кухни:" . $s_type_kitchen[$s_mass['kitchen_type']] . "\r\nДлина:" . $i_length . "\r\nШирина:" . $i_width . "\r\nШирина2:" . $i_width2 . "\r\nМатериал стеновой панели:" . $s_wall_panel[$s_mass['wall_panel_material']] . "\r\nМатериал столешницы:" . $s_worktop[$s_mass['сountertop_materia']]  . "\r\nФурнитура:" . $s_closers[$s_mass['furniture']]);
        break;
    default:
        $s_name_message = 'Заявка на бесплатный замер';
        $s_message = $message;
        break;
}

if (mail($s_mail_to, $s_name_message, $s_message, $headers)) {
        echo json_encode(array('status' => 'success', "f" => $_FILES["file"], "r"=> $_REQUEST));
   }
?>