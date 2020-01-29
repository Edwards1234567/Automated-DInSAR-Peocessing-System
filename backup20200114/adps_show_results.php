<?php

    require_once('adps_server_all.php');

    session_start();

    $username       = trim($_SESSION['login_name']);
    $usertype       = trim($_SESSION['login_type']);

    //echo $usertype;

    if ($username == '' || !isset($username))
    {
        echo 'Login Error';
    }
    else
    {
        if ($usertype & (PER_DL_RESULT | PER_PROC_FULL | PER_DL_GIS_RESULT))
        {
            $image_name = $_GET['pair_to_show'];
            $track_info = $_GET['track_num'];
            $sen_name   = $_GET['sensor_name'];

            do_dl_image_interface($image_name, $usertype, $track_info, $sen_name);
        }
        else
        {
            if ($usertype & PER_VIEW_RESULT)
            {
                $image_name = $_GET['pair_to_show'];
                $track_info = $_GET['track_num'];
                $sen_name   = $_GET['sensor_name'];

                do_show_image_interface($image_name, $usertype);
            }
            else
            {
                echo 'There is no authority for this account to view the processed result!';
            }
        }
    }

?>