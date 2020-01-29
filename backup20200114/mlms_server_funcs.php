<?php

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

function get_lic_infor()
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        $sql_cmd    = 'select * from license_info order by modified_time asc';
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
        $loca_amt   = mysqli_num_rows($query_rslt);

        if ($loca_amt < 1)
        {
            echo 'No License Information Inputted!';
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
                echo '<Property name = "license_id">'.$query_row[license_id].'</Property>';
                echo '<Property name = "mining_corporation">'.$query_row[mining_corporation].'</Property>';
                echo '<Property name = "location">'.$query_row[location].'</Property>';
                echo '<Property name = "mine_name">'.$query_row[mine_name].'</Property>';
                echo '<Property name = "company_type Name">'.$query_row[company_type].'</Property>';
                echo '<Property name = "mine_type">'.$query_row[mine_type].'</Property>';
                echo '<Property name = "exploition_method">'.$query_row[exploition_method].'</Property>';
                echo '<Property name = "production">'.$query_row[production].'</Property>';
                echo '<Property name = "site_area">'.$query_row[site_area].'</Property>';
                echo '<Property name = "valid_date_start">'.$query_row[valid_date_start].'</Property>';
                echo '<Property name = "valid_date_end">'.$query_row[valid_date_end].'</Property>';
                echo '<Property name = "issue_id">'.$query_row[issue_id].'</Property>';
                echo '<Property name = "issue_date">'.$query_row[issue_date].'</Property>';
                echo '<Property name = "issue_department">'.$query_row[issue_department].'</Property>';
                echo '<Property name = "exploition_depth_start">'.$query_row[exploition_depth_start].'</Property>';
                echo '<Property name = "exploition_depth_end">'.$query_row[exploition_depth_end].'</Property>';
                echo '<Property name = "coordinate_number">'.$query_row[coordinate_number].'</Property>';
                echo '</Record>';
            }

            echo '</root>';
        }
    }

    mysqli_close($local_info_db);
}

function get_coor_infor($license_id)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        $sql_cmd    	= 'select * from coordinate_info where license_id = "'.$license_id.'"';
        $query_rslt 	= mysqli_query($local_info_db, $sql_cmd);
        $loca_amt   	= mysqli_num_rows($query_rslt);
        $csys_sql_cmd	= 'select * from coordinate_types';
        $csys_query 	= mysqli_query($local_info_db, $csys_sql_cmd);
        $csys_amt   	= mysqli_num_rows($csys_query);
        $all_csys[$csys_amt];

        for ($j = 0; $j < $csys_amt; $j++)
        {
        	$csys_query_row	= mysqli_fetch_assoc($csys_query);
        	$all_csys[$j]	= $csys_query_row[coordinate_type];
        }

        if ($loca_amt < 1)
        {
        	echo($license_id);
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
                echo '<Property name = "license_id">'.$query_row[license_id].'</Property>';
                echo '<Property name = "point_id">'.$query_row[point_id].'</Property>';
                echo '<Property name = "point_x">'.$query_row[point_x].'</Property>';
                echo '<Property name = "point_y">'.$query_row[point_y].'</Property>';
                echo '<Property name = "coordinate_type">'.$query_row[coordinate_type].'</Property>';
                echo '<Property name = "ID">'.$query_row[Id].'</Property>';

                for ($j = 0; $j < $csys_amt; $j++)
                {
                	echo '<Property name = "all_coor_sys'.$j.'">'.$all_csys[$j].'</Property>';
                }

                echo '</Record>';
            }

            echo '</root>';
        }
    }

    mysqli_close($local_info_db);
}


function add_coor_infor($license_id)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
    	$sql_cmd    = 'insert into coordinate_info set license_id = "'.$license_id.'"';
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
    	$sql_cmd    = 'select license_id from coordinate_info where license_id = "'.$license_id.'"';
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
        $loca_amt   = mysqli_num_rows($query_rslt);
    	$sql_cmd    = 'update license_info set coordinate_number = '.$loca_amt.' where license_id = "'.$license_id.'"';
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
    }

    mysqli_close($local_info_db);
}


function delete_coor_infor($coor_ids, $coor_num)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
    	$sql_cmd    = 'select * from coordinate_info where Id = '.$coor_ids[0];
    	$query_rslt = mysqli_query($local_info_db, $sql_cmd);
    	$query_row  = mysqli_fetch_assoc($query_rslt);
    	$license_id	= $query_row[license_id];
    	$sql_cmd	= 'select coordinate_number from license_info where license_id = "'.$license_id.'"';
    	$query_rslt = mysqli_query($local_info_db, $sql_cmd);
    	$query_row  = mysqli_fetch_assoc($query_rslt);
    	$org_ncoor	= $query_row[coordinate_number];
    	$sql_cmd	= 'update license_info set coordinate_number = '.($org_ncoor - $coor_num).' where license_id = "'.$license_id.'"';
    	$query_rslt = mysqli_query($local_info_db, $sql_cmd);

    	for ($i = 0; $i < $coor_num; $i++)
    	{
	    	$sql_cmd    = 'delete from coordinate_info where Id = "'.$coor_ids[$i].'"';
	        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
    	}
    }

    mysqli_close($local_info_db);

    return $license_id;
}


function update_coor_infor($sql_condi, $sql_condi_amt, $coor_ids)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
		$sql_cmd	= 'select license_id from coordinate_info where Id = '.$coor_ids[0];
		$query_rslt = mysqli_query($local_info_db, $sql_cmd);
    	$query_row  = mysqli_fetch_assoc($query_rslt);
    	$license_id	= $query_row[license_id];

    	for ($i = 0; $i < $sql_condi_amt; $i++)
    	{
	    	$sql_cmd    = substr($sql_condi[$i], 1, strlen($sql_condi[$i]) - 2);
	        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
	    }
    }

    mysqli_close($local_info_db);

    return $license_id;
}


function add_license_info($add_cmd)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
    	$sql_cmd    = substr($add_cmd, 1, strlen($add_cmd) - 2);
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
    }

    mysqli_close($local_info_db);
}


function update_license_info($license_ids, $lic_new_ids, $sql_condi, $sql_condi_amt)
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
	        	if (strcmp($lic_new_ids[$i], $license_ids[$i]) != 0)
	        	{
	        		$sql_cmd	= 'insert into license_info set license_id = "ID_UPDATE_TEMP"';
	        		$query_rslt = mysqli_query($local_info_db, $sql_cmd);
	        		$sql_cmd	= 'update coordinate_info set license_id = "ID_UPDATE_TEMP" where license_id = "'.$license_ids[$i].'"';
	        		$query_rslt = mysqli_query($local_info_db, $sql_cmd);
	                $sql_cmd    = substr($sql_condi[$i], 1, strlen($sql_condi[$i]) - 2);
	                $query_rslt = mysqli_query($local_info_db, $sql_cmd);
	        		$sql_cmd	= 'update coordinate_info set license_id = "'.$lic_new_ids[$i].'" where license_id = "ID_UPDATE_TEMP"';
	        		$query_rslt = mysqli_query($local_info_db, $sql_cmd);
	        		$sql_cmd	= 'delete from license_info where license_id = "ID_UPDATE_TEMP"';
	        		$query_rslt = mysqli_query($local_info_db, $sql_cmd);
	        	}
	        	else
	        	{
	                $sql_cmd    = substr($sql_condi[$i], 1, strlen($sql_condi[$i]) - 2);
	                $query_rslt = mysqli_query($local_info_db, $sql_cmd);
	        	}
            }

            $sql_cmd    = 'select * from license_info order by modified_time asc';
            $query_rslt = mysqli_query($local_info_db, $sql_cmd);
            $loca_amt   = mysqli_num_rows($query_rslt);

            if ($loca_amt < 1)
            {
                echo 'No License Information Inputted!';
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
                    echo '<Property name = "license_id">'.$query_row[license_id].'</Property>';
                    echo '<Property name = "mining_corporation">'.$query_row[mining_corporation].'</Property>';
                    echo '<Property name = "location">'.$query_row[location].'</Property>';
                    echo '<Property name = "mine_name">'.$query_row[mine_name].'</Property>';
                    echo '<Property name = "company_type Name">'.$query_row[company_type].'</Property>';
                    echo '<Property name = "mine_type">'.$query_row[mine_type].'</Property>';
                    echo '<Property name = "exploition_method">'.$query_row[exploition_method].'</Property>';
                    echo '<Property name = "production">'.$query_row[production].'</Property>';
                    echo '<Property name = "site_area">'.$query_row[site_area].'</Property>';
                    echo '<Property name = "valid_date_start">'.$query_row[valid_date_start].'</Property>';
                    echo '<Property name = "valid_date_end">'.$query_row[valid_date_end].'</Property>';
                    echo '<Property name = "issue_id">'.$query_row[issue_id].'</Property>';
                    echo '<Property name = "issue_date">'.$query_row[issue_date].'</Property>';
                    echo '<Property name = "issue_department">'.$query_row[issue_department].'</Property>';
                    echo '<Property name = "exploition_depth_start">'.$query_row[exploition_depth_start].'</Property>';
                    echo '<Property name = "exploition_depth_end">'.$query_row[exploition_depth_end].'</Property>';
                    echo '<Property name = "coordinate_number">'.$query_row[coordinate_number].'</Property>';
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

    mysqli_close($local_info_db);
}


function delete_license_info($license_ids, $license_num)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
    	for ($i = 0; $i < $license_num; $i++)
    	{
	    	$sql_cmd    = 'delete from coordinate_info where license_id = "'.$license_ids[$i].'"';
	        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
	    	$sql_cmd    = 'delete from license_info where license_id = "'.$license_ids[$i].'"';
	        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
    	}
    }

    mysqli_close($local_info_db);
}


function sign_out_mlms_user()
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
        $sql_cmd    = 'select username, user_type from user_info where username = "'.$username.
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

            mysqli_close($user_info_db);
            return NOR_USR_LOGIN_OK;
        }
    }
}


function check_license_info($license_id, $text_id)
{
    @ $local_info_db    = mysqli_connect(DB_LOCATION, DB_LOGIN_NAME, DB_LOGIN_PASS, DB_NAME);

    if (mysqli_connect_errno())
    {
        echo 'Database Error';
    }
    else
    {
        $sql_cmd    = 'select license_id from license_info where license_id = "'.$license_id.'"';
        $query_rslt = mysqli_query($local_info_db, $sql_cmd);
        $loca_amt   = mysqli_num_rows($query_rslt);

        if ($loca_amt > 0)
        {
             xml_notification($text_id);
        }
        else
        {
             xml_notification('OK');
        }
    }

    mysqli_close($local_info_db);
}

