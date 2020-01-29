<?php


require_once('mlms_server_all.php');

session_start();

$username       = trim($_SESSION['login_name']);
$usertype       = trim($_SESSION['login_type']);

if ($username == '' || !isset($username))
{
    echo 'Login Error';
}
else
{
    $proc_type  = $_POST[valid_proc];

    if ($proc_type == OBTAIN_LICENSE_INFO)
    {
        //echo 'Location Infor';
        get_lic_infor();
    }
    else if ($proc_type == ADD_LICENSE_INFO)
    {
    	$add_cmd	= $_POST[insert_flag];
    	add_license_info($add_cmd);
        get_lic_infor();
    }
    else if ($proc_type == UPDATE_LICENSE_INFO)
    {
        $license_ids    = $_POST[ch_lic_id];
        $lic_new_ids	= $_POST[ch_new_lic_id];
        $sql_condi      = $_POST[ch_changed];
        $sql_condi_amt  = count($sql_condi);

        update_license_info($license_ids, $lic_new_ids, $sql_condi, $sql_condi_amt);
    }
    else if ($proc_type == CHECK_LICENSE_INFO)
    {
        $license_id = $_POST[license_id];
        $text_id	= $_POST[text_id];

        check_license_info($license_id, $text_id);
    }
    else if ($proc_type == OBTAIN_COOR_INFO)
    {
        $license_id = $_POST[license_id];

        get_coor_infor($license_id);
    }
    else if ($proc_type == DELETE_LICENSE_INFO)
    {
        $license_ids	= $_POST[license_ids];
        $license_num	= count($license_ids);

        delete_license_info($license_ids, $license_num);
        get_lic_infor();
    }
    else if ($proc_type == ADD_LICENSE_COOR)
    {
        $license_id = $_POST[license_id];

        add_coor_infor($license_id);
        get_coor_infor($license_id);
    }
    else if ($proc_type == DELETE_LICENSE_COOR)
    {
        $coor_ids	= $_POST[coor_ids];
        $coor_num	= count($coor_ids);
        $license_id	= delete_coor_infor($coor_ids, $coor_num);
        get_coor_infor($license_id);
    }
    else if ($proc_type == UPDATE_LICENSE_COOR)
    {
    	$coor_ids		= $_POST[coor_ids];
        $sql_condi      = $_POST[ch_changed];
        $sql_condi_amt  = count($sql_condi);
        $license_id		= update_coor_infor($sql_condi, $sql_condi_amt, $coor_ids);
        get_coor_infor($license_id);
    }
    else if ($proc_type == LOGOUT_SYSTEM)
    {
    	sign_out_mlms_user();
    }
}


?>