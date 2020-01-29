<?php

require_once('adps_server_all.php');

session_start();

$user_name  = $_SESSION[login_name];
$user_type  = $_SESSION[login_type];

if ($user_type & (PER_DL_GIS_RESULT | PER_DL_ALL_RESULT))
{
    $result_type    = $_GET[d_id];
    $pair_ids       = $_GET[ch_pair_sel];
    $pair_amt       = count($pair_ids);

    compose_pair_zip($user_name, $result_type, $pair_ids, $pair_amt);
}
else
{
    echo 'There is no authority for this account to download selected results!';
}

?>