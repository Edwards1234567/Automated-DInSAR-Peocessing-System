<?php


require_once('adps_server_all.php');

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

    if ($proc_type == 1)
    {
        $sensor_type    = $_POST['chk_sensor_type'];
        $sensor_amt     = count($sensor_type);
        $polar_type     = $_POST['chk_polar_type'];
        $polar_amt      = count($polar_type);
        $proc_status    = $_POST['chk_proc_status'];
        $proc_amt       = count($proc_status);
        $image_or_pair  = $_POST['rad_image_pair'];
        $local_name     = trim($_POST['txt_local_name']);
        $track_info     = trim($_POST['txt_track']);
        $start_frame    = trim($_POST['txt_start_frame']);
        $end_frame      = trim($_POST['txt_end_frame']);
        $from_date      = trim($_POST['txt_from_date']);
        $to_date        = trim($_POST['txt_to_date']);

        if ($image_or_pair == SEARCH_IMAGE_PAIR)
        {
            if ($sensor_amt == 0 || $polar_amt == 0 || $proc_amt == 0)
            {
                xml_notification('Condition Error');
            }
            else
            {
                $btemp_info = $_POST['chk_btemp'];
                $btemp_amt  = count($btemp_info);
                $bperp_info = $_POST['chk_bperp'];
                $bperp_amt  = count($bperp_info);

                if ($btemp_amt != 0)
                {
                    $min_btemp     = trim($_POST['txt_min_btemp']);
                    $max_btemp     = trim($_POST['txt_max_btemp']);
                }

                if ($bperp_amt != 0)
                {
                    $min_bperp     = trim($_POST['txt_min_bperp']);
                    $max_bperp     = trim($_POST['txt_max_bperp']);
                }

                search_show_pair($sensor_type, $sensor_amt, $polar_type, $polar_amt, $proc_status, $proc_amt, $local_name,
                                 $track_info, $start_frame, $end_frame, $from_date, $to_date,
                                 $btemp_amt, $min_btemp, $max_btemp, $bperp_amt, $min_bperp, $max_bperp);
            }
        }
        else
        {
            if ($sensor_amt == 0 || $polar_amt == 0)
            {
                xml_notification('Condition Error');
            }
            else
            {
                search_show_image($sensor_type, $sensor_amt, $polar_type, $polar_amt, $local_name,
                                  $track_info, $start_frame, $end_frame, $from_date, $to_date);
            }
        }
    }
    else if ($proc_type == SEARCH_PAIR_ON_IMAGE)
    {
        $image_sel      = $_POST['ch_image_sel'];
        $image_sel_amt  = count($image_sel);
        $polar_type     = $_POST['chk_polar_type'];
        $polar_amt      = count($polar_type);
        $proc_status    = $_POST['chk_proc_status'];
        $proc_amt       = count($proc_status);
        $from_date      = trim($_POST['txt_from_date']);
        $to_date        = trim($_POST['txt_to_date']);

        if ($polar_amt == 0 || $proc_amt == 0 || $image_sel_amt == 0)
        {
            xml_notification('Condition Error');
        }
        else
        {
            $btemp_info = $_POST['chk_btemp'];
            $btemp_amt  = count($btemp_info);
            $bperp_info = $_POST['chk_bperp'];
            $bperp_amt  = count($bperp_info);

            if ($btemp_amt != 0)
            {
                $min_btemp     = trim($_POST['txt_min_btemp']);
                $max_btemp     = trim($_POST['txt_max_btemp']);
            }

            if ($bperp_amt != 0)
            {
                $min_bperp     = trim($_POST['txt_min_bperp']);
                $max_bperp     = trim($_POST['txt_max_bperp']);
            }

            search_pair_on_image($image_sel, $image_sel_amt, $polar_type, $polar_amt, $proc_status, $proc_amt, $from_date, $to_date,
                                 $btemp_amt, $bperp_amt, $min_btemp, $max_btemp, $min_bperp, $max_bperp);
        }
    }
    else if ($proc_type == PROC_SEL_PAIRS)
    {
        $pair_sel_to_proc   = $_POST['ch_pair_sel'];
        $pair_sel_amt       = count($pair_sel_to_proc);
        $rad_fft            = $_POST['rad_fft_proc'];
        $rad_dem            = $_POST['rad_dem_proc'];
        $rad_pri            = $_POST['rad_proc_pri'];

        if ($pair_sel_amt == 0)
        {
            echo 'No Pair to be Processed';
        }
        else
        {
            if (!isset($rad_fft) || !isset($rad_dem) || !isset($rad_pri))
            {
                echo 'Known Error';
            }
            else
            {
                proc_sel_pair($pair_sel_to_proc, $pair_sel_amt, $rad_fft, $rad_dem, $rad_pri, $username, $usertype);
            }
        }
    }
    else if ($proc_type == REFRESH_PAIR_STATUS)
    {
        $pair_sel_to_proc   = $_POST['ch_pair_sel'];
        $pair_sel_amt       = count($pair_sel_to_proc);


        if ($pair_sel_amt != 0)
        {
            get_pair_status($pair_sel_to_proc, $pair_sel_amt);
        }
    }
    else if ($proc_type == CANCEL_PAIR_PROC)
    {
        $pair_sel_to_proc   = $_POST['ch_pair_sel'];
        $pair_sel_amt       = count($pair_sel_to_proc);

        if ($pair_sel_amt == 0)
        {
            echo 'No Pair to be Cancelled';
        }
        else
        {
            cancel_sel_pair($pair_sel_to_proc, $pair_sel_amt, $username, $usertype);
        }
    }
    else if ($proc_type == OBTAIN_USER_TYPE)
    {
        get_user_type($username);
    }
    else if ($proc_type == ADD_ADPS_USER)
    {
        add_adps_user($usertype);
    }
    else if ($proc_type == SIGN_OUT_ADPS_USER)
    {
        sign_out_adps_user();
    }
    else if ($proc_type == OBTAIN_IMAGE_PATH)
    {
        $image_name = $_POST[file_name];

        //echo $image_name;
        get_result_info($image_name);
    }
    else if ($proc_type == PROC_SEL_FULL)
    {
        $pair_sel_to_proc   = $_POST['ch_pair_sel'];
        $pair_sel_amt       = count($pair_sel_to_proc);
        $rad_pri            = $_POST['rad_proc_pri'];

        if ($pair_sel_amt == 0)
        {
            echo 'No Pair to be Processed';
        }
        else
        {
            if (!isset($rad_pri))
            {
                echo 'Known Error';
            }
            else
            {
                proc_sel_full($pair_sel_to_proc, $pair_sel_amt, $rad_pri, $username, $usertype);
            }
        }
    }
    else if ($proc_type == PROC_ONE_FULL)
    {
        $image_full_name    = trim($_POST['image_name']);
        $proc_priority      = $_POST['pri_value'];

        proc_one_full($image_full_name, $proc_priority, $username, $usertype);
    }
    else if ($proc_type == OBTAIN_LCATION_INFO)
    {
        //echo 'Location Infor';
        get_location_infor();
    }
    else if ($proc_type == UPDATE_LOCATION)
    {
        $sql_condi      = $_POST[ch_changed];
        $sql_condi_amt  = count($sql_condi);
        //echo 'Location Infor';
        update_location_infor($sql_condi, $sql_condi_amt);
    }
    else if ($proc_type == PROC_PSI)
    {
    	$image_ids		= $_POST[ch_sel];
    	$auto_slc		= $_POST[proc_par];
        $image_ids_amt  = count($image_ids);
		//echo 'PSI Proc';
		proc_psi($image_ids, $image_ids_amt, $auto_slc, $usertype);
    }
    else if ($proc_type == PROC_PSI_SEL_MST)
    {
    	$master_date		= $_POST[acq_date];
		//echo 'PSI Proc';
		proc_psi_mst_sel($master_date, $usertype);
    }


}


?>