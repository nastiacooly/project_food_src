<?php
$_POST = json_decode(file_get_contents("php://input"), true);
//строка выше нужна, если запросы работают с форматом JSON
echo var_dump($_POST);