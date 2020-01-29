<?php

require_once('adps_server_all.php');

session_start();

$user_name  = $_SESSION[login_name];
$user_type  = $_SESSION[login_type];

if ($user_type & PER_DL_TABLE)
{
    $image_pair_table   = $_GET[d_id];
    $list_term_id       = $_GET[ch_sel];
    $list_term_amt      = count($list_term_id);

    if ($list_term_amt < 1)
    {
        echo 'No iterm is selected to generate table!';
    }
    else
    {
        generate_infor_table($image_pair_table, $list_term_id, $list_term_amt, $user_name);
    }
}
else
{
    echo 'There is no authority for this account to download the table!';
}

?>