<?php

function sql_from_to_num($from_info, $to_info, $content)
{
    $sql_cmd    = '';

    if ($from_info != '')
    {
        $sql_cmd    = $content.' >= '.$from_info;
    }

    if ($to_info != '')
    {
        if ($sql_cmd == '')
        {
            $sql_cmd    = $content.' <= '.$to_info;
        }
        else
        {
            $sql_cmd    = $sql_cmd.' and '.$content.' <= '.$to_info;
        }
    }

    return $sql_cmd;
}

function sql_from_to_str($from_info, $to_info, $content)
{
    $sql_cmd    = '';

    if ($from_info != '')
    {
        $sql_cmd    = $content.' >= "'.$from_info.'"';
    }

    if ($to_info != '')
    {
        if ($sql_cmd == '')
        {
            $sql_cmd    = $content.' <= "'.$to_info.'"';
        }
        else
        {
            $sql_cmd    = $sql_cmd.' and '.$content.' <= "'.$to_info.'"';
        }
    }

    return $sql_cmd;
}

function sql_or_num($info, $amount, $name)
{
    $sql_cmd    = $name.' = '.$info[0];

    for ($i = 1; $i < $amount; $i++)
    {
        $sql_cmd    = $sql_cmd.' or '.$name.' = '.$info[$i];
    }

    return $sql_cmd;
}

function sql_and_num($info, $amount, $name)
{
    $sql_cmd    = $name.' = '.$info[0];

    for ($i = 1; $i < $amount; $i++)
    {
        $sql_cmd    = $sql_cmd.' and '.$name.' = '.$info[$i];
    }

    return $sql_cmd;
}

function sql_or_str($info, $amount, $name)
{
    $sql_cmd    = $name.' = "'.$info[0].'"';

    for ($i = 1; $i < $amount; $i++)
    {
        $sql_cmd    = $sql_cmd.' or '.$name.' = "'.$info[$i].'"';
    }

    return $sql_cmd;
}

function calc_proc_type($rad_fft, $rad_dem, $rad_resol)
{
    $proc_type  = 0;

    if ($rad_fft != 0)
    {
        $proc_type |= PROC_WITH_FFT;
    }

    if ($rad_dem == 2)
    {
        $proc_type |= PROC_FLAT_DEM;
    }
    else if ($rad_dem == 1)
    {
        $proc_type |= PROC_LITTLE_FLAT_DEM | PROC_FLAT_DEM;
    }

    if ($rad_resol != 0)
    {
        $proc_type |= PROC_FULL_RESOL;
    }

    return $proc_type;
}

function xml_notification($note_info)
{
    header('Content-type: text/xml');
    echo '<?xml version="1.0" ?>
          <root>';
    echo '<Record>';
    echo '<Property name = "Notification">'.$note_info.'</Property>';
    echo '</Record>';
    echo '</root>';
}

function get_image_amt()
{
    @ $image_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($image_info_db);
        return 'DB Error';
    }
    else
    {
        $sql_cmd    = 'select image_id from image_infor';
        $query_rslt = mysqli_query($image_info_db, $sql_cmd);
        $image_amt  = mysqli_num_rows($query_rslt);

        mysqli_close($image_info_db);
        return $image_amt;
    }
}

function get_pair_amt()
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        return 'DB Error';
    }
    else
    {
        $sql_cmd    = 'select pair_id from pair_infor';
        $query_rslt = mysqli_query($pair_info_db, $sql_cmd);
        $pair_amt   = mysqli_num_rows($query_rslt);

        mysqli_close($pair_info_db);
        return $pair_amt;
    }
}

function get_pair_proc_max($username)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        return 0;
    }
    else
    {
        $sql_cmd    = 'select day_proc_amt from user_infor where user_name = "'.$username.'"';
        $query_rslt = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt   = mysqli_num_rows($query_rslt);

        if ($rslt_amt != 1)
        {
            mysqli_close($pair_info_db);
            return 0;
        }

        $query_row  = mysqli_fetch_assoc($query_rslt);

        if ($query_row[day_proc_amt] >= 0)
        {
            return $query_row[day_proc_amt];
            mysqli_close($pair_info_db);
        }
        else
        {
            return 'inf';
            mysqli_close($pair_info_db);
        }
    }
}

function get_full_proc_max($username)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        return 0;
    }
    else
    {
        $sql_cmd    = 'select day_full_amt from user_infor where user_name = "'.$username.'"';
        $query_rslt = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt   = mysqli_num_rows($query_rslt);

        if ($rslt_amt != 1)
        {
            mysqli_close($pair_info_db);
            return 0;
        }

        $query_row  = mysqli_fetch_assoc($query_rslt);

        return $query_row[day_full_amt];
        mysqli_close($pair_info_db);
    }
}

function get_pair_status($pair_sel_to_proc, $pair_sel_amt)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        xml_notification('Datebase Error');
    }
    else
    {
        $sql_pair_condi = sql_or_num($pair_sel_to_proc, $pair_sel_amt, 'pair_id');
        $sql_cmd        = 'select pair_id, process_status, result_name, master_id from pair_infor where '.$sql_pair_condi;
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $pair_amt       = mysqli_num_rows($query_rslt);

        if ($pair_amt == 0)
        {
            xml_notification('Unknown Error');
        }
        else
        {
            header('Content-type: text/xml');

            echo '<?xml version="1.0" ?>
                  <root>';

            for ($i = 0; $i < $pair_amt; $i++)
            {
                $query_row  = mysqli_fetch_assoc($query_rslt);
                $image_name = hidden_image_path($query_row[result_name]);

                echo '<Record>
                      <Property name = "ID">'.$query_row[pair_id].'</Property>
                      <Property name = "Status">'.$query_row[process_status].'</Property>
                      <Property name = "Result">'.$image_name.'</Property>';

                $sql_img_cmd    = 'select track, sar_sensors.sensor_type from image_infor inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id where image_id = '.$query_row[master_id];
                $query_img_rslt = mysqli_query($pair_info_db, $sql_img_cmd);
                $query_img_row  = mysqli_fetch_assoc($query_img_rslt);

                echo '<Property name = "Track">'.$query_img_row[track].'</Property>
                      <Property name = "Sensor">'.$query_img_row[sensor_type].'</Property>
                      </Record>';
            }

            echo '</root>';
        }
    }

    mysqli_close($pair_info_db);
}

function get_user_type($username)
{
    @ $user_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'error';
    }
    else
    {
        $sql_cmd    = 'select user_type from user_infor where user_name = "'.$username.'"';
        $query_rslt = mysqli_query($user_info_db, $sql_cmd);
        $user_amt   = mysqli_num_rows($query_rslt);

        if ($user_amt != 1)
        {
            echo 'error';
        }
        else
        {
            $query_row  = mysqli_fetch_assoc($query_rslt);

            echo $query_row[user_type];
        }
    }

    mysqli_close($user_info_db);
}

function get_result_info($image_name)
{
    $image_path         = 'http://129.94.56.7:8080/RESULT/';
    $image_full_name    = $image_path.$image_name;

    //echo $image_full_name;

    $image_infor        = GetImageSize($image_full_name);
    $image_width        = $image_infor[0];
    $image_height       = $image_infor[1];

    if ($image_infor != false)
    {
        header('Content-type: text/xml');

        echo '<?xml version="1.0" ?>
              <root>';
        echo '<Record>';
        echo '<Property name = "Path">'.$image_path.'</Property>';
        echo '<Property name = "Full Name">'.$image_full_name.'</Property>';
        echo '<Property name = "Width">'.$image_width.'</Property>';
        echo '<Property name = "Height">'.$image_height.'</Property>';
        echo '</Record>';
        echo '</root>';
    }
    else
    {
        echo 'No Image Found!';
    }
}

function get_location_infor()
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        $sql_cmd    = 'select sar_sensors.sensor_id, sar_sensors.sensor_type, track, frame, location_description from location_infor inner join sar_sensors on location_infor.sensor_type = sar_sensors.sensor_id';
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
        $loca_amt   = mysqli_num_rows($query_rslt);

        if ($loca_amt < 1)
        {
            echo 'No Track and Frame Inputted!';
        }
        else
        {
            header('Content-type: text/xml');
            echo '<?xml version="1.0" ?>
                  <root>';

            for ($i = 0; $i < $loca_amt; $i++)
            {
                $query_row  = mysqli_fetch_assoc($query_rslt);

                echo '<Record>';
                echo '<Property name = "Sensor ID">'.$query_row[sensor_id].'</Property>';
                echo '<Property name = "Sensor">'.$query_row[sensor_type].'</Property>';
                echo '<Property name = "Track">'.$query_row[track].'</Property>';
                echo '<Property name = "Frame">'.$query_row[frame].'</Property>';
                echo '<Property name = "Location Name">'.$query_row[location_description].'</Property>';
                echo '</Record>';
            }

            echo '</root>';
        }
    }

    mysqli_close($local_info_db);
}

function update_location_infor($sql_condi, $sql_condi_amt)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        if ($sql_condi_amt != 0)
        {
            for ($i = 0; $i < $sql_condi_amt; $i++)
            {
                $sql_cmd    = substr($sql_condi[$i], 1, strlen($sql_condi[$i]) - 2);
                $query_rslt = mysqli_query($local_info_db, $sql_cmd);
            }

            $sql_cmd    = 'select sar_sensors.sensor_id, sar_sensors.sensor_type, track, frame, location_description from location_infor inner join sar_sensors on location_infor.sensor_type = sar_sensors.sensor_id';
            $query_rslt = mysqli_query($local_info_db, $sql_cmd);
            $loca_amt   = mysqli_num_rows($query_rslt);

            if ($loca_amt < 1)
            {
                echo 'Unknown Error!';
            }
            else
            {
                header('Content-type: text/xml');
                echo '<?xml version="1.0" ?>
                      <root>';

                for ($i = 0; $i < $loca_amt; $i++)
                {
                    $query_row  = mysqli_fetch_assoc($query_rslt);

                    echo '<Record>';
                    echo '<Property name = "Sensor ID">'.$query_row[sensor_id].'</Property>';
                    echo '<Property name = "Sensor">'.$query_row[sensor_type].'</Property>';
                    echo '<Property name = "Track">'.$query_row[track].'</Property>';
                    echo '<Property name = "Frame">'.$query_row[frame].'</Property>';
                    echo '<Property name = "Location Name">'.$query_row[location_description].'</Property>';
                    echo '</Record>';
                }

                echo '</root>';
            }
        }
        else
        {
            echo 'No Information to be Updated!';
        }
    }
}

function add_adps_user($user_type)
{
    if ($user_type & PER_MAN_USER)
    {
        $user_name      = trim($_POST['add_user_name']);
        $user_pass      = trim($_POST['add_user_pass']);

        if ($user_name == '' || !isset($user_name) || $user_pass == '' || !isset($user_pass))
        {
            echo 'No Username or Password Inputted!';
            return;
        }

        $user_authority = $_POST['user_authority'];
        $proc_amount    = $_POST['proc_amount'];
        $proc_full_amt  = $_POST['proc_full_amount'];
        $user_email     = trim($_POST['user_email']);


        if ($proc_amount == '' || !isset($proc_amount))
        {
            $proc_amount    = 0;
        }

        if ($proc_full_amt == '' || !isset($proc_full_amt))
        {
            $proc_full_amt  = 0;
        }

        if ($user_email == '' || !isset($user_email))
        {
            $user_email     = 'NONE';
        }

        @ $user_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

        if (mysqli_connect_errno())
        {
            echo 'Database Error! Please Try Again Later!';
            mysqli_close($user_info_db);
            return;
        }
        else
        {
            $sql_cmd    = 'select user_name from user_infor where user_name = "'.$user_name.'"';
            $query_rslt = mysqli_query($user_info_db, $sql_cmd);
            $user_amt   = mysqli_num_rows($query_rslt);

            if ($user_amt == 0)
            {
                $sql_cmd    = 'insert user_infor set user_name = "'.$user_name.'", password = "'.$user_pass.'", user_type = '.$user_authority.
                               ', nor_proc_amt = '.$proc_amount.', full_proc_amt = '.$proc_full_amt.
                               ', day_proc_amt = '.$proc_amount.', day_full_amt = '.$proc_full_amt.', email_addr = "'.$user_email.'"';
                $query_rslt = mysqli_query($user_info_db, $sql_cmd);

				@mkdir('packages/'.$user_name.'/');
                echo 'Adding User Successfully!';
                mysqli_close($user_info_db);
                return;
            }
            else if ($user_amt >= 1)
            {
                echo 'The Username already Exists. Please Try Another One!';
                mysqli_close($user_info_db);
                return;
            }
        }
    }
    else
    {
        echo 'There is no authority for this account to manage user information!';
        return;
    }
}

function hidden_image_path($full_path)
{
    $file_name  = strrchr($full_path, '/');

    if ($file_name)
    {
        return $file_name;
    }
    else
    {
        return $full_path;
    }
}

function sign_out_adps_user()
{
    session_start();
    unset($_SESSION['login_name']);
    unset($_SESSION['login_type']);
    session_destroy();
}

function check_login_info($username, $password)
{
    if ($username == '' || !isset($username))
    {
        return NO_USERNAME_LOGIN;
    }

    if ($password == '' || !isset($password))
    {
        return NO_PASSWORD_LOGIN;
    }

    @ $user_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($user_info_db);
        return DB_CONN_ERROR;
    }
    else
    {
        $sql_cmd    = 'select user_name, user_type from user_infor where user_name = "'.$username.
                      '" and password = "'.$password.'"';
        $query_rslt = mysqli_query($user_info_db, $sql_cmd);
        $user_amt   = mysqli_num_rows($query_rslt);
        $query_row  = mysqli_fetch_assoc($query_rslt);

        if ($user_amt != 1)
        {
            mysqli_close($user_info_db);
            return LOGIN_ERROR;
        }
        else
        {
            session_start();

            $_SESSION[login_name]   = $username;
            $_SESSION[login_type]   = $query_row[user_type];

            if ($query_row[user_type] & PER_MAN_USER)
            {
                mysqli_close($user_info_db);
                return ADMIN_LOGIN_OK;
            }
            else
            {
                if ($query_row[user_type] & PER_MAN_LOCATION)
                {
                    mysqli_close($user_info_db);
                    return LOCATION_LOGIN_OK;
                }

                $sql_cmd            = 'select login_time, nor_proc_amt, full_proc_amt, day_proc_amt, day_full_amt from user_infor where user_name = "'.$username.'"';
                $query_rslt         = mysqli_query($user_info_db, $sql_cmd);
                $query_row          = mysqli_fetch_assoc($query_rslt);
                $last_login_date    = substr($query_row[login_time], 0, 10);
                $cur_login_date     = date('Y-m-d', time());

                if (strcmp($last_login_date, $cur_login_date) != 0)
                {
                    $sql_cmd        = 'update user_infor set day_proc_amt = '.$query_row[nor_proc_amt].', day_full_amt = '.$query_row[full_proc_amt].', login_time = "'.date('Y-m-d H:i:s', time()).'" where user_name = "'.$username.'"';
                    $query_rslt     = mysqli_query($user_info_db, $sql_cmd);
                }

                delete_packages($username);
                mysqli_close($user_info_db);
                return NOR_USR_LOGIN_OK;
            }
        }
    }
}



function delete_packages($user_name)
{
	$package_dir_name	= 'packages/'.$user_name.'/';
	$package_dir		= opendir($package_dir_name);

	while (($pack_filename = readdir($package_dir)) !== false)
	{
		if ($pack_filename!= "." && $pack_filename != "..")
		{
			unlink($package_dir_name.$pack_filename);
		}
	}
}



function search_show_pair($sensor_type, $sensor_amt, $polar_type, $polar_amt, $proc_status, $proc_amt, $local_name,
                          $track_info, $start_frame, $end_frame, $from_date, $to_date,
                          $btemp_amt, $min_btemp, $max_btemp, $bperp_amt, $min_bperp, $max_bperp)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        xml_notification('Database Error!');
    }
    else
    {
        $sql_cmd            = 'select pair_id, master_id, slave_id, btemp, bperp, result_name, process_status from pair_infor where master_id = any(select image_id from image_infor inner join location_infor on image_infor.track = location_infor.track and image_infor.frame = location_infor.frame';
        $sql_sensor_cond    = sql_or_num($sensor_type, $sensor_amt, 'image_infor.sensor_type');
        $sql_polar_cond     = sql_or_str($polar_type, $polar_amt, 'polarization');
        $sql_status_cond    = sql_or_str($proc_status, $proc_amt, 'process_status');
        $sql_btemp_cond     = sql_from_to_num($min_btemp, $max_btemp, 'btemp');
        $sql_bperp_cond     = sql_from_to_num($min_bperp, $max_bperp, 'abs(bperp)');
        $sql_cmd            = $sql_cmd.' where ('.$sql_sensor_cond.') and ('.$sql_polar_cond.') and ('.$sql_status_cond.')';

        $sql_date_cond      = sql_from_to_str($from_date, $to_date, 'date');

        if ($sql_date_cond != '')
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_date_cond.')';
        }

        if ($local_name != '')
        {
            $sql_cmd        = $sql_cmd.' and (location_description like "%'.$local_name.'%")';
        }

        if ($track_info != '')
        {
            $sql_cmd        = $sql_cmd.' and location_infor.track = '.$track_info;
        }

        $sql_frame_cond     = sql_from_to_num($start_frame, $end_frame, 'location_infor.frame');

        if ($sql_frame_cond != '')
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_frame_cond.')';
        }

        if ($btemp_amt != 0)
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_btemp_cond.')';
        }

        if ($bperp_amt != 0)
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_bperp_cond.')';
        }

        $sql_cmd            = $sql_cmd.') order by abs(bperp) asc';

        //echo '<br>'.$sql_cmd.'<br>';

        $query_rslt = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt   = mysqli_num_rows($query_rslt);

        if ($rslt_amt == 0)
        {
            xml_notification('No Image can be Found under this Condition!');
        }
        else
        {
            header('Content-type: text/xml');

            echo '<?xml version="1.0" ?>
                  <root>';

            for ($i = 0; $i < $rslt_amt; $i++)
            {
                $query_row      = mysqli_fetch_assoc($query_rslt);
                $sql_mst_cmd    = 'select date, track, frame, heading, polarization, centre_lat, centre_lon, look_angle, rsr, sar_sensors.sensor_type from image_infor inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id where image_id = '.$query_row[master_id];
                $sql_slv_cmd    = 'select date, frame from image_infor inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id where image_id = '.$query_row[slave_id];

                $query_mst_rslt = mysqli_query($pair_info_db, $sql_mst_cmd);
                $mst_rslt_amt   = mysqli_num_rows($query_mst_rslt);
                $query_slv_rslt = mysqli_query($pair_info_db, $sql_slv_cmd);
                $slv_rslt_amt   = mysqli_num_rows($query_slv_rslt);


                $mst_query_row  = mysqli_fetch_assoc($query_mst_rslt);
                $slv_query_row  = mysqli_fetch_assoc($query_slv_rslt);
                $image_name     = hidden_image_path($query_row[result_name]);

                echo '<Record>
                      <Property name = "ID">'.$query_row[pair_id].'</Property>
                      <Property name = "Status">'.$query_row[process_status].'</Property>
                      <Property name = "Btemp">'.$query_row[btemp].'</Property>
                      <Property name = "Bperp">'.abs($query_row[bperp]).'</Property>
                      <Property name = "Sensor">'.$mst_query_row[sensor_type].'</Property>
                      <Property name = "M Date">'.$mst_query_row[date].'</Property>
                      <Property name = "S Date">'.$slv_query_row[date].'</Property>
                      <Property name = "Track">'.$mst_query_row[track].'</Property>
                      <Property name = "M Frame">'.$mst_query_row[frame].'</Property>
                      <Property name = "S Frame">'.$slv_query_row[frame].'</Property>
                      <Property name = "Heading">'.$mst_query_row[heading].'</Property>
                      <Property name = "Polar">'.$mst_query_row[polarization].'</Property>
                      <Property name = "Centre Lat">'.$mst_query_row[centre_lat].'</Property>
                      <Property name = "Centre Lon">'.$mst_query_row[centre_lon].'</Property>
                      <Property name = "Look Angle">'.$mst_query_row[look_angle].'</Property>
                      <Property name = "RSR">'.$mst_query_row[rsr].'</Property>
                      <Property name = "Result">'.$image_name.'</Property>
                      </Record>';
/*
                if ($mst_rslt_amt != 1 || $slv_rslt_amt != 1)
                {
                    xml_notification('Searching Error!');
                }
                else
                {
                    $mst_query_row  = mysqli_fetch_assoc($query_mst_rslt);
                    $slv_query_row  = mysqli_fetch_assoc($query_slv_rslt);
                    $image_name     = hidden_image_path($query_row[result_name]);

                    echo '<Record>
                          <Property name = "ID">'.$query_row[pair_id].'</Property>
                          <Property name = "Status">'.$query_row[process_status].'</Property>
                          <Property name = "Btemp">'.$query_row[btemp].'</Property>
                          <Property name = "Bperp">'.abs($query_row[bperp]).'</Property>
                          <Property name = "Sensor">'.$mst_query_row[sensor_type].'</Property>
                          <Property name = "M Date">'.$mst_query_row[date].'</Property>
                          <Property name = "S Date">'.$slv_query_row[date].'</Property>
                          <Property name = "Track">'.$mst_query_row[track].'</Property>
                          <Property name = "M Frame">'.$mst_query_row[frame].'</Property>
                          <Property name = "S Frame">'.$slv_query_row[frame].'</Property>
                          <Property name = "Heading">'.$mst_query_row[heading].'</Property>
                          <Property name = "Polar">'.$mst_query_row[polarization].'</Property>
                          <Property name = "Centre Lat">'.$mst_query_row[centre_lat].'</Property>
                          <Property name = "Centre Lon">'.$mst_query_row[centre_lon].'</Property>
                          <Property name = "Look Angle">'.$mst_query_row[look_angle].'</Property>
                          <Property name = "RSR">'.$mst_query_row[rsr].'</Property>
                          <Property name = "Result">'.$image_name.'</Property>
                          </Record>';
                }*/
            }

            echo '</root>';
        }

        mysqli_close($pair_info_db);
    }
}

function search_show_image($sensor_type, $sensor_amt, $polar_type, $polar_amt, $local_name,
                           $track_info, $start_frame, $end_frame, $from_date, $to_date)
{
    @ $image_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($image_info_db);
        xml_notification('Database Error!');
    }
    else
    {
        $sql_cmd            = 'select sar_sensors.sensor_type, location_infor.track, location_infor.frame, location_infor.location_description, image_infor.prf, image_infor.rsr, image_infor.image_id, image_infor.date, image_infor.heading, image_infor.polarization, image_infor.centre_lat, image_infor.centre_lon, image_infor.look_angle, image_infor.data_path from location_infor inner join image_infor on location_infor.track = image_infor.track and location_infor.frame = image_infor.frame inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id';
        $sql_sensor_cond    = sql_or_num($sensor_type, $sensor_amt, 'image_infor.sensor_type');
        $sql_polar_cond     = sql_or_str($polar_type, $polar_amt, 'polarization');
        $sql_cmd            = $sql_cmd.' where ('.$sql_sensor_cond.') and ('.$sql_polar_cond.')';

        $sql_date_cond      = sql_from_to_str($from_date, $to_date, 'date');

        if ($sql_date_cond != '')
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_date_cond.')';
        }

        if ($local_name != '')
        {
            $sql_cmd        = $sql_cmd.' and (location_description like "%'.$local_name.'%")';
        }

        if ($track_info != '')
        {
            $sql_cmd        = $sql_cmd.' and location_infor.track = '.$track_info;
        }

        $sql_frame_cond     = sql_from_to_num($start_frame, $end_frame, 'location_infor.frame');

        if ($sql_frame_cond != '')
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_frame_cond.')';
        }

        $sql_cmd            = $sql_cmd.' order by date desc';

        //echo $sql_cmd.'<br><br>';

        $query_rslt = mysqli_query($image_info_db, $sql_cmd);
        $rslt_amt   = mysqli_num_rows($query_rslt);

        if ($rslt_amt == 0)
        {
            xml_notification('No Image can be Found under this Condition!');
        }
        else
        {
            header('Content-type: text/xml');

            echo '<?xml version="1.0" ?>
                  <root>';

            for ($i = 0; $i < $rslt_amt; $i++)
            {
                $query_row  = mysqli_fetch_assoc($query_rslt);

                echo '<Record>
                      <Property name = "ID">'.$query_row[image_id].'</Property>
                      <Property name = "Sensor">'.$query_row[sensor_type].'</Property>
                      <Property name = "Date">'.$query_row[date].'</Property>
                      <Property name = "Track">'.$query_row[track].'</Property>
                      <Property name = "Frame">'.$query_row[frame].'</Property>
                      <Property name = "Heading">'.$query_row[heading].'</Property>
                      <Property name = "Polar">'.$query_row[polarization].'</Property>
                      <Property name = "Centre Lat">'.$query_row[centre_lat].'</Property>
                      <Property name = "Centre Lon">'.$query_row[centre_lon].'</Property>
                      <Property name = "Look Angle">'.$query_row[look_angle].'</Property>
                      <Property name = "PRF">'.$query_row[prf].'</Property>
                      <Property name = "RSR">'.$query_row[rsr].'</Property>
                      </Record>';

/*
                echo '<Record>
                      <Property name = "ID">'.$query_row[image_id].'</Property>
                      <Property name = "传感器">'.$query_row[sensor_type].'</Property>
                      <Property name = "日期">'.$query_row[date].'</Property>
                      <Property name = "轨道号">'.$query_row[track].'</Property>
                      <Property name = "影像号">'.($query_row[begin_frame] + 0.5).'</Property>
                      <Property name = "升/降轨">'.$query_row[heading].'</Property>
                      <Property name = "极化">'.$query_row[polarization].'</Property>
                      <Property name = "经度">'.$query_row[centre_lon].'</Property>
                      <Property name = "纬度">'.$query_row[centre_lat].'</Property>
                      <Property name = "视角">'.$query_row[look_angle].'</Property>
                      <Property name = "脉冲频率">'.$query_row[prf].'</Property>
                      <Property name = "采样率">'.$query_row[rsr].'</Property>
                      <Property name = "路径">'.$query_row[data_path].'</Property>
                      </Record>';
*/
            }

            echo '</root>';
        }

        mysqli_close($image_info_db);
    }
}

function search_pair_on_image($image_sel, $image_sel_amt, $polar_type, $polar_amt, $proc_status, $proc_amt, $from_date, $to_date,
                              $btemp_amt, $bperp_amt, $min_btemp, $max_btemp, $min_bperp, $max_bperp)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        xml_notification('Database Error!');
    }
    else
    {
        $sql_img_id_cond    = sql_or_num($image_sel, $image_sel_amt, 'image_id');
        $sql_cmd            = 'select pair_id, master_id, slave_id, btemp, bperp, result_name, process_status from pair_infor where master_id = any(select image_id from image_infor inner join location_infor on image_infor.track = location_infor.track and image_infor.frame = location_infor.frame where ('.$sql_img_id_cond.')';
        $sql_polar_cond     = sql_or_str($polar_type, $polar_amt, 'polarization');
        $sql_cmd            = $sql_cmd.' and ('.$sql_polar_cond.')';

        $sql_date_cond      = sql_from_to_str($from_date, $to_date, 'date');

        if ($sql_date_cond != '')
        {
            $sql_cmd        = $sql_cmd.' and ('.$sql_date_cond.')';
        }

        $sql_cmd            = $sql_cmd.') order by abs(bperp) asc';

        //echo '<br>'.$sql_cmd.'<br>';

        $query_rslt = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt   = mysqli_num_rows($query_rslt);

        if ($rslt_amt == 0)
        {
            xml_notification('No Image can be Found under this Condition!');
        }
        else
        {
            header('Content-type: text/xml');

            echo '<?xml version="1.0" ?>
                  <root>';

            for ($i = 0; $i < $rslt_amt; $i++)
            {
                $query_row      = mysqli_fetch_assoc($query_rslt);
                $sql_mst_cmd    = 'select date, track, frame, heading, polarization, centre_lat, centre_lon, look_angle, rsr, sar_sensors.sensor_type from image_infor inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id where image_id = '.$query_row[master_id];
                $sql_slv_cmd    = 'select date, frame from image_infor inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id where image_id = '.$query_row[slave_id];
                $query_mst_rslt = mysqli_query($pair_info_db, $sql_mst_cmd);
                $mst_rslt_amt   = mysqli_num_rows($query_mst_rslt);
                $query_slv_rslt = mysqli_query($pair_info_db, $sql_slv_cmd);
                $slv_rslt_amt   = mysqli_num_rows($query_slv_rslt);

                if ($mst_rslt_amt != 1 || $slv_rslt_amt != 1)
                {
                    xml_notification('Searching Error!');
                }
                else
                {
                    $mst_query_row  = mysqli_fetch_assoc($query_mst_rslt);
                    $slv_query_row  = mysqli_fetch_assoc($query_slv_rslt);
                    $image_name     = hidden_image_path($query_row[result_name]);

                    echo '<Record>
                          <Property name = "ID">'.$query_row[pair_id].'</Property>
                          <Property name = "Status">'.$query_row[process_status].'</Property>
                          <Property name = "Btemp">'.$query_row[btemp].'</Property>
                          <Property name = "Bperp">'.abs($query_row[bperp]).'</Property>
                          <Property name = "Sensor">'.$mst_query_row[sensor_type].'</Property>
                          <Property name = "M Date">'.$mst_query_row[date].'</Property>
                          <Property name = "S Date">'.$slv_query_row[date].'</Property>
                          <Property name = "Track">'.$mst_query_row[track].'</Property>
                          <Property name = "M Frame">'.$mst_query_row[frame].'</Property>
                          <Property name = "S Frame">'.$slv_query_row[frame].'</Property>
                          <Property name = "Heading">'.$mst_query_row[heading].'</Property>
                          <Property name = "Polar">'.$mst_query_row[polarization].'</Property>
                          <Property name = "Centre Lat">'.$mst_query_row[centre_lat].'</Property>
                          <Property name = "Centre Lon">'.$mst_query_row[centre_lon].'</Property>
                          <Property name = "Look Angle">'.$mst_query_row[look_angle].'</Property>
                          <Property name = "RSR">'.$mst_query_row[rsr].'</Property>
                          <Property name = "Result">'.$image_name.'</Property>
                          </Record>';
                }
            }

            echo '</root>';
        }

        mysqli_close($pair_info_db);
    }
}

function proc_sel_pair($pair_sel_to_proc, $pair_sel_amt, $rad_fft, $rad_dem, $rad_pri, $username, $user_type)
{
    if (($user_type & PER_PROC_PAIR) == 0)
    {
        echo 'There is no authority for this account to process DInSAR pairs!';
        return;
    }

    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        // This part is deleted by Alex Ng on 18-Jun-2013, because the add time is no long used to decide the priority
        /*
        if ($rad_pri == 0)
        {
            $add_time   = date('Y-m-d H:i:s', (time() + 4000000));
        }
        else if ($proc_priority == 1)
        {
            $add_time   = date('Y-m-d H:i:s', time());
        }
        else if ($proc_priority == 2)
        {
            $add_time   = date('Y-m-d H:i:s', (time() - 4000000));
        }
        else
        {
            $add_time   = date('Y-m-d H:i:s', (time() - 8000000));
        }        
         */

        $add_time   = date('Y-m-d H:i:s', time());
        
        $sql_cmd        = 'select day_proc_amt from user_infor where user_name = "'.$username.'"';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $query_row      = mysqli_fetch_assoc($query_rslt);
        $cur_proc_amt   = $query_row[day_proc_amt] - $pair_sel_amt;

        if ($query_row[day_proc_amt] < 0)
        {
            $proc_pair_amt  = $pair_sel_amt;
        }
        else
        {
            if ($cur_proc_amt >= 0)
            {
                $proc_pair_amt  = $pair_sel_amt;
            }
            else
            {
                $proc_pair_amt  = $query_row[day_proc_amt];
            }

            $sql_cmd        = 'update user_infor set day_proc_amt = '.$cur_proc_amt.' where user_name ="'.$username.'"';
            $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        }

        // The following line is deleted by Alex Ng on 18-Jun-2013 to enable the priority processing function
        // $proc_type      = calc_proc_type($rad_fft, $rad_dem, 0); 
        // This line has been replaced by the following line
        $proc_type      = $rad_fft + $rad_pri * 2;
        
        
        $sql_pair_condi = sql_or_num($pair_sel_to_proc, $pair_sel_amt, 'pair_id');
        $sql_cmd        = 'update pair_infor set process_status = 1, process_type = '.$proc_type.', add_time = "'.$add_time.
                          '", process_user = "'.$username.'" where ('.$sql_pair_condi.') and process_status != 2';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);

        $sql_cmd        = 'select busy_tag from restriction';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $query_row      = mysqli_fetch_assoc($query_rslt);

        if ($query_row[busy_tag] == 0)
        {
            system(SYSTEM_ADPS_RUN, $proc_result);
        }

        echo 'ok';
    }

    mysqli_close($pair_info_db);
}

function proc_sel_full($pair_sel_to_proc, $pair_sel_amt, $rad_pri, $username, $user_type)
{
    if (($user_type & PER_PROC_FULL) == 0)
    {
        echo 'There is no authority for this account to process full resolution DInSAR pairs!';
        return;
    }

    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        if ($rad_pri == 0)
        {
            $add_time   = date('Y-m-d H:i:s', (time() + 4000000));
        }
        else if ($rad_pri == 1)
        {
            $add_time   = date('Y-m-d H:i:s', time());
        }
        else if ($rad_pri == 2)
        {
            $add_time   = date('Y-m-d H:i:s', (time() - 4000000));
        }
        else
        {
            $add_time   = date('Y-m-d H:i:s', (time() - 8000000));
        }

        $sql_cmd        = 'select day_full_amt from user_infor where user_name = "'.$username.'"';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $query_row      = mysqli_fetch_assoc($query_rslt);
        $cur_proc_amt   = $query_row[day_full_amt] - $pair_sel_amt;

        if ($cur_proc_amt >= 0)
        {
            $sql_cmd        = 'update user_infor set day_full_amt = '.$cur_proc_amt.' where user_name ="'.$username.'"';
            $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);

            $order_id       = strtoupper($username).date('Ymd', time()).'0'.(100 - $cur_proc_amt);
            $sql_pair_condi = sql_or_num($pair_sel_to_proc, $pair_sel_amt, 'pair_id');
            $sql_cmd        = 'update pair_infor set full_res_status = 1, full_add_time = "'.$add_time.
                              '", full_proc_user = "'.$username.'", full_res_order_id = "'.$order_id.'" where ('.$sql_pair_condi.') and process_status = 3';
            $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);

            echo 'OK';
        }
        else
        {
            echo 'The amount of selected pairs is larger than current full resolution processing amount!';
        }
    }
}

function proc_one_full($image_full_name, $proc_priority, $username, $usertype)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        if ($proc_priority == 0)
        {
            $add_time   = date('Y-m-d H:i:s', (time() + 4000000));
        }
        else if ($proc_priority == 1)
        {
            $add_time   = date('Y-m-d H:i:s', time());
        }
        else if ($proc_priority == 2)
        {
            $add_time   = date('Y-m-d H:i:s', (time() - 4000000));
        }
        else
        {
            $add_time   = date('Y-m-d H:i:s', (time() - 8000000));
        }

        $sql_cmd        = 'select day_full_amt from user_infor where user_name = "'.$username.'"';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $query_row      = mysqli_fetch_assoc($query_rslt);
        $cur_proc_amt   = $query_row[day_full_amt] - 1;

        if ($cur_proc_amt >= 0)
        {
            $sql_cmd        = 'update user_infor set day_full_amt = '.$cur_proc_amt.' where user_name ="'.$username.'"';
            $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);

            $order_id       = strtoupper($username).date('Ymd', time()).'0'.(100 - $cur_proc_amt);
            $sql_cmd        = 'update pair_infor set full_res_status = 1, full_add_time = "'.$add_time.
                              '", full_proc_user = "'.$username.'", full_res_order_id = "'.$order_id.'" where result_name = "'.$image_full_name.'" and process_status = 3';
            $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);

            echo 'The request of processing the full resolution result for this image has been sent!';
        }
        else
        {
            echo 'There in no more process amount for full resolution results!';
        }
    }
}

function proc_psi_mst_sel($master_date, $user_type)
{
    if (($user_type & PER_PROC_PAIR) == 0)
    {
        echo 'There is no authority for this account to process PSI!';
        return;
    }

	@ $psi_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

	$sql_cmd		= 'select cur_psi_id, psi_tag from restriction';
	$query_cpi_rslt	= mysqli_query($psi_info_db, $sql_cmd);
	$query_cpi_row	= mysqli_fetch_assoc($query_cpi_rslt);
	$sql_cmd		= 'update image_infor set master_flag = 1 where date = "'.$master_date.'" and psi_id = '.$query_cpi_row[cur_psi_id];

	mysqli_query($psi_info_db, $sql_cmd);

/*
	if ($query_cpi_row[cur_psi_id] == $query_cpi_row[psi_tag])
	{

	$psi_cmd	= 'ADPSConnect.exe 129.94.56.126 37651';

	if (system($psi_cmd) < 0)
	{
		echo 'Can not trigger the processing module!';
	}

		echo 'RUN';
	}
	else
	{
		echo 'OK0 ';
	}*/
	
	// The section above was commented out in order to implement AutoPSI in ADPS server

	if ($query_cpi_row[cur_psi_id] == $query_cpi_row[psi_tag] + 1)
	{


		$psi_cmd	= 'ADPSConnect.exe 129.94.56.126 37651';

		if (system($psi_cmd) < 0)
		{
			echo 'Can not trigger the processing module!';
		}
		echo 'RUN';
	}
	else
	{
		echo 'OK1';
	}
	
}

function proc_psi($image_ids, $image_ids_amt, $auto_slc, $user_type)
{

    if (($user_type & PER_PROC_PAIR) == 0)
    {
        echo 'There is no authority for this account to process PSI!';
        return;
    }

	@ $psi_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

	$sql_cmd		= 'select cur_psi_id, psi_tag from restriction';
	$query_cpi_rslt	= mysqli_query($psi_info_db, $sql_cmd);
	$query_cpi_row	= mysqli_fetch_assoc($query_cpi_rslt);
	$cur_psi_id		= $query_cpi_row[cur_psi_id] + 1;
	$sql_cmd		= 'update restriction set cur_psi_id = '.$cur_psi_id;

	mysqli_query($psi_info_db, $sql_cmd);

	for ($i = 0; $i < $image_ids_amt; $i++)
	{
		$sql_cmd		= 'update image_infor set psi_id = '.$cur_psi_id.', psi_proc_par = '.$auto_slc.' where image_id = '.$image_ids[$i];

		mysqli_query($psi_info_db, $sql_cmd);
	}

	if ($auto_slc == 2 || $auto_slc == 3)
	{

		$psi_cmd	= 'ADPSConnect.exe 129.94.56.126 37651';

		if (system($psi_cmd) < 0)
		{
			echo 'error';
		}
		else
		{
                 echo 'else';
			sleep(15);
			if (file_exists('./psi/bsl.csv'))
			{
				$bsl_file	= fopen('./psi/bsl.csv', 'r');

				while(1)
				{
					$bsl_info	= fgets($bsl_file);

					if (feof($bsl_file))
					{
						break;
					}

					echo($bsl_info.'<br>');
				}

				fclose($bsl_file);

			}
			else
			{
				echo 'error';
			}
		}
	}
	else
	{
		if ($query_cpi_row[cur_psi_id] == $query_cpi_row[psi_tag])
		{

		$psi_cmd	= 'ADPSConnect.exe 129.94.56.126 37651';

		if (system($psi_cmd) < 0)
		{
			echo 'Can not trigger the processing module!';
		}

			echo 'RUN';
		}
		else
		{
			echo 'OK2';
		}
	}


	mysqli_close($pair_info_db);
}

function cancel_sel_pair($pair_sel_to_proc, $pair_sel_amt, $username, $user_type)
{
    if (($user_type & (PER_CANCEL_PROC | PER_CANCEL_OTHER_PROC)) == 0)
    {
        mysqli_close($pair_info_db);
        echo 'There is no authority for this account to cancel DInSAR pairs in process waiting queque!';
        return;
    }

    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        $sql_pair_condi = sql_or_num($pair_sel_to_proc, $pair_sel_amt, 'pair_id');
        $sql_cmd        = 'update pair_infor set process_status = 0 where ('.$sql_pair_condi.') and process_status = 1';

        if (($user_type & PER_CANCEL_OTHER_PROC) == 0)
        {
            $sql_cmd    = $sql_cmd.' and process_user = "'.$username.'"';
        }

        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);

        echo 'ok';
    }

    mysqli_close($pair_info_db);
}


function compose_pair_zip($user_name, $result_type, $pair_ids, $pair_amt)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        echo 'Database Error';
    }
    else
    {
        $sql_pair_id    = sql_or_num($pair_ids, $pair_amt, 'pair_id');
        $sql_cmd        = 'select result_name, master_id from pair_infor where ('.$sql_pair_id.') and process_status = 3';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt       = mysqli_num_rows($query_rslt);

        if ($rslt_amt < 1)
        {
            echo 'No Result to be Added into the Package!';
        }
        else if ($result_type == DL_ALL_RESULTS && $rslt_amt > 30)
        {
            echo 'Please do not select more than THIRTY DInSAR results to download!';
        }
        else if ($result_type == DL_ALL_GIS_INFO && $rslt_amt > 30)
        {
            echo 'Please do not select more than ONE HUNDRED GIS Info to download!';
        }
        else
        {
            $pair_zip   = new ZipArchive();

            if ($result_type == DL_ALL_RESULTS)
            {
                $filename   = 'packages/'.$user_name."/".$user_name."_image.".time().".zip";

                if ($pair_zip->open($filename, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE) !== true)
                {
                    mysqli_close($pair_info_db);
                    exit("Cannot open <".$filename.">\n");
                }

                for ($i = 0; $i < $rslt_amt; $i++)
                {
                    $query_row      = mysqli_fetch_assoc($query_rslt);
                    $sql_track_cmd  = 'select track, sensor_type from image_infor where image_id = '.$query_row[master_id];
                    $query_trk_rslt = mysqli_query($pair_info_db, $sql_track_cmd);
                    $query_trk_row  = mysqli_fetch_assoc($query_trk_rslt);
                    $sql_sensor_cmd = 'select sensor_type from sar_sensors where sensor_id = '.$query_trk_row[sensor_type];
                    $query_sen_rslt = mysqli_query($pair_info_db, $sql_sensor_cmd);
                    $query_sen_row  = mysqli_fetch_assoc($query_sen_rslt);
                    $dinsar_name    = 'D:/ADPS/ADPS_STORAGE/RESULT/'.$query_sen_row[sensor_type].'/track'.$query_trk_row[track].'/'.$query_row[result_name];

                    $pair_zip->addFile($dinsar_name, 'RESULTS/'.$query_row[result_name]);
                }

                //echo 'Composing Package - '.$filename.' OK!';

                $pair_zip->close();
            }
            else
            {
                $filename   = 'packages/'.$user_name."/".$user_name."_gis.".time().".zip";

                if ($pair_zip->open($filename, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE) !== true)
                {
                    exit("Cannot open <".$filename.">\n");
                }

                for ($i = 0; $i < $rslt_amt; $i++)
                {
                    $query_row      = mysqli_fetch_assoc($query_rslt);
                    $sql_track_cmd  = 'select track, sensor_type from image_infor where image_id = '.$query_row[master_id];
                    $query_trk_rslt = mysqli_query($pair_info_db, $sql_track_cmd);
                    $query_trk_row  = mysqli_fetch_assoc($query_trk_rslt);
                    $sql_sensor_cmd = 'select sensor_type from sar_sensors where sensor_id = '.$query_trk_row[sensor_type];
                    $query_sen_rslt = mysqli_query($pair_info_db, $sql_sensor_cmd);
                    $query_sen_row  = mysqli_fetch_assoc($query_sen_rslt);
                    $rslt_gis_name  = 'D:/ADPS/ADPS_STORAGE/RESULT/'.$query_sen_row[sensor_type].'/track'.$query_trk_row[track].'/'.$query_row[result_name].'w';


                    $pair_zip->addFile($rslt_gis_name, 'GIS_INFO/'.$query_row[result_name].'w');
                }

                //echo 'Composing Package - '.$filename.' OK!';

                $pair_zip->close();
            }

            $package_file   = fopen($filename, "r");
            Header("Content-type: application/octet-stream");
            Header("Accept-Ranges: bytes");
            Header("Accept-Length: ".filesize($filename));
            Header("Content-Disposition: attachment; filename=".$filename);
            echo fread($package_file, filesize($filename));
            fclose($package_file);
            mysqli_close($pair_info_db);
        }

    }

}

function generate_infor_table($image_pair_table, $list_term_id, $list_term_amt, $user_name)
{
    @ $pair_info_db = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        mysqli_close($pair_info_db);
        echo 'Database Error';
        return;
    }

    if ($image_pair_table == 0)
    {
        $sql_img_id     = sql_or_num($list_term_id, $list_term_amt, 'image_id');
        $sql_cmd        = 'select sar_sensors.sensor_type, location_infor.track, location_infor.frame, location_infor.location_description, image_infor.rsr, image_infor.date, image_infor.heading, image_infor.polarization, image_infor.centre_lat, image_infor.centre_lon, image_infor.look_angle from location_infor inner join image_infor on location_infor.track = image_infor.track and location_infor.frame = image_infor.frame inner join sar_sensors on image_infor.sensor_type = sar_sensors.sensor_id where ('.$sql_img_id.')';
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt       = mysqli_num_rows($query_rslt);

        if ($rslt_amt < 1)
        {
            echo 'No Result to be downloaded as a table!';
        }
        else
        {
            $filename   = 'tables/'.$user_name.'_image_table.csv';
            $table_file = fopen($filename, 'w');

            if ($table_file)
            {
                fwrite($table_file, 'Sensor,Date,Track,Frame,Location,Heading,Polarization,Centre Lat,Centre Lon,Look Angle,RSR'."\r\n");

                for ($i = 0; $i < $rslt_amt; $i++)
                {
                    $query_row  = mysqli_fetch_assoc($query_rslt);

                    $table_line = $query_row[sensor_type].','.$query_row[date].','.$query_row[track].','.$query_row[frame].',"'.
                                  $query_row[location_description].'",'.$query_row[heading].','.$query_row[polarization].','.
                                  $query_row[centre_lat].','.$query_row[centre_lon].','.$query_row[look_angle].','.$query_row[rsr]."\r\n";

                    fwrite($table_file, $table_line);
                }

                fclose($table_file);

                $dl_table_file  = fopen($filename, "r");

                Header("Content-type: application/octet-stream");
                Header("Accept-Ranges: bytes");
                Header("Accept-Length: ".filesize($filename));
                Header("Content-Disposition: attachment; filename=".$filename);
                echo fread($dl_table_file, filesize($filename));
                fclose($dl_table_file);
            }
            else
            {
                echo 'Cannot create the table file!';
            }
        }
    }
    else
    {
        $sql_pair_id    = sql_or_num($list_term_id, $list_term_amt, 'pair_id');
        $sql_cmd        = 'select master_id, slave_id, btemp, bperp, result_name from pair_infor where '.$sql_pair_id;
        $query_rslt     = mysqli_query($pair_info_db, $sql_cmd);
        $rslt_amt       = mysqli_num_rows($query_rslt);

        if ($rslt_amt < 1)
        {
            echo 'No Result to be downloaded as a table!';
        }
        else
        {
            $filename   = 'tables/'.$user_name.'_pair_table.csv';
            $table_file = fopen($filename, 'w');

            if ($table_file)
            {
                fwrite($table_file, 'Sensor,Btemp,Bperp,Mst Date,Slv Date,Track,Mst Frame,Slv Frame,Centre Lat,Centre Lon,Look Angle,Heading,Polarization,Results'."\r\n");

                for ($i = 0; $i < $rslt_amt; $i++)
                {
                    $query_row      = mysqli_fetch_assoc($query_rslt);
                    $mst_sql_cmd    = 'select sar_sensors.sensor_type, date, track, frame, heading, polarization, centre_lat, centre_lon, look_angle from image_infor inner join sar_sensors on sar_sensors.sensor_id = image_infor.sensor_type where image_id = '.$query_row[master_id];
                    $slv_sql_cmd    = 'select date, frame from image_infor where image_id = '.$query_row[slave_id];
                    $mst_query_rslt = mysqli_query($pair_info_db, $mst_sql_cmd);
                    $slv_query_rslt = mysqli_query($pair_info_db, $slv_sql_cmd);
                    $mst_query_row  = mysqli_fetch_assoc($mst_query_rslt);
                    $slv_query_row  = mysqli_fetch_assoc($slv_query_rslt);
                    $table_line     = $mst_query_row[sensor_type].','.$query_row[btemp].','.$query_row[bperp].','.$mst_query_row[date].',"'.
                                      $slv_query_row[date].'",'.$mst_query_row[track].','.$mst_query_row[frame].','.$slv_query_row[frame].','.
                                      $mst_query_row[centre_lat].','.$mst_query_row[centre_lon].','.$mst_query_row[look_angle].','.$mst_query_row[heading].','.
                                      $mst_query_row[polarization].',"'.HTTP_HOME.'RESULT/'.$mst_query_row[sensor_type].'/track'.$mst_query_row[track].'/'.$query_row[result_name].'"'."\r\n";

                    fwrite($table_file, $table_line);
                }

                fclose($table_file);

                $dl_table_file  = fopen($filename, "r");

                Header("Content-type: application/octet-stream");
                Header("Accept-Ranges: bytes");
                Header("Accept-Length: ".filesize($filename));
                Header("Content-Disposition: attachment; filename=".$filename);
                echo fread($dl_table_file, filesize($filename));
                fclose($dl_table_file);
            }
            else
            {
                echo 'Cannot create the table file!';
            }
        }
    }

    mysqli_close($pair_info_db);
}

?>