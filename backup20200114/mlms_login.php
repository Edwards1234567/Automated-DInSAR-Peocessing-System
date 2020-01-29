<?php

require_once('mlms_server_all.php');

$username       = trim($_POST['txt_login_name']);
$password       = trim($_POST['txt_login_pass']);
$login_result   = check_login_info($username, $password);

switch ($login_result)
{
    case LOGIN_ERROR:
        do_login_interface('User Name or Password is Wrong. Please Try Again!');
        break;

    case DB_CONN_ERROR:
        do_login_interface('There is Something Wrong with the Server. Please Try Again Later!');
        break;

    case NO_PASSWORD_LOGIN:
        do_login_interface('Please Input Password to Login!');
        break;

    case NO_USERNAME_LOGIN:
        do_login_interface('Please Input User Name to Login!');
        break;

    case NOR_USR_LOGIN_OK:
        do_location_man_interface();
        break;

    default:
        echo $login_result;
        break;
}

?>