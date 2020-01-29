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
    $image_amt      = get_image_amt();
    $pair_amt       = get_pair_amt();
    $nor_proc_amt   = get_pair_proc_max($username);
    $full_proc_amt  = get_full_proc_max($username);

    do_search_infor_interface($username, $image_amt, $pair_amt, $nor_proc_amt, $full_proc_amt);
}

?>