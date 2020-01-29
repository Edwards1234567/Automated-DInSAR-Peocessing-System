<?php

require_once('adps_server_all.php');

session_start();

$username       = trim($_SESSION['login_name']);
$usertype       = trim($_SESSION['login_type']);

if ($username == '' || !isset($username))
{
    echo 'No Use now is logged in ADPS.';
}
else
{
    do_proc_para_interface($usertype);
}

?>