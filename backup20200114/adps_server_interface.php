<?php

function do_login_interface($message_to_show)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS)</title>
    <link rel="stylesheet" type="text/css" href="css/adps_index.css">
    <script language="javascript" src="adps_index.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>

    <br>

    <form id="form_login" name="form_login" method="post" action="adps_login.php">

    <div id="login_frame" align="center">
        <div id="login_head">
            <?php echo $message_to_show; ?>
        </div>


        <div id="login_body_frame">
            <div id="login_body_left">
            </div>

            <div id="login_body_center">

                <div id="login_label">
                    用户名:
                </div>

                <div id="login_content">
                    <input type="text" name="txt_login_name" id="txt_login_name" class="login_text_box"/>
                </div>

                <div id="login_label">
                    密码:
                </div>

                <div id="login_content">
                    <input type="password" name="txt_login_pass" id="txt_login_pass" class="login_text_box"/>
                </div>

            </div>

            <div id="login_body_right">
            </div>
        </div>


        <div id="login_tail">
            <input type="submit" name="btn_login_submit" id="btn_login_submit" value="登录" class="orange_btn"
                onMouseOver="change_btn_style('btn_login_submit', 0)" onMouseOut="change_btn_style('btn_login_submit', 1)"/>
            <input type="reset" name="btn_login_clear" id="btn_login_clear" value="清除" class="orange_btn"
                onMouseOver="change_btn_style('btn_login_clear', 0)" onMouseOut="change_btn_style('btn_login_clear', 1)"/>
        </div>
    </div>

    </form>

    </body>
    </html>

    <?php
}


function do_search_frame($user_type)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - Login Successful</title>
    <link rel="stylesheet" type="text/css" href="css/adps_search_inter.css">
    <script language="javascript" src="adps_search_frame.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>
        <div id="parent_frame">
            <iframe name="parent_interface_frame" id="parent_interface_frame" width="1024" height="800" frameborder="0" src="adps_search_interface.php" onLoad="adjust_frame_size()"></iframe>
        </div>

        <?php if ($user_type & (PER_PROC_PAIR | PER_PROC_FULL)) { ?>
        <div id="proc_para_frame">
            <iframe name="proc_dialog_frame" id="proc_dialog_frame" width="300" height="300" frameborder="1" src="adps_proc_para.php"></iframe>
        </div>
        <?php } ?>
    </body>

    </html>

    <?php
}

function do_search_frame_interface()
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - Login Successful</title>
    <link rel="stylesheet" type="text/css" href="css/adps_search_inter.css">
    </head>

    <frameset rows="110,*" cols="*" frameborder="no" border="0" framespacing="0">
        <frame src="adps_search_infor.php" name="top_frame" scrolling="auto" noresize="noresize" id="top_frame" />

        <frameset id="frame_bottom" cols="300,*" frameborder="auto" border="0" framespacing="0">
            <frame src="adps_search_pannel.php" name="left_frame" scrolling="auto" noresize="noresize" id="left_frame" />
            <frame src="adps_search_contents.php" name="main_frame" id="main_frame" scrolling="auto" />
        </frameset>
    </frameset>

    <noframes>
        <body>
        </body>
    </noframes>

    </html>

    <?php
}

function do_search_pannel_interface($user_type)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - Login Successful</title>
    <link rel="stylesheet" type="text/css" href="css/adps_search_inter.css">
    <script language="javascript" src="adps_search_inter.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>

        <div id="pannel_frame">
            <div id="pannel_top">
            </div>

            <div id="pannel_content_title">
                搜索处理功能
            </div>

            <?php if ($user_type & PER_SEARCH) { ?>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                星载传感器类型
            </div>
            <div id="pannel_content_center">
                <input type="checkbox" name="chk_sensor_type[]" id="chk_sensor_type[]" value="1" class="small_check_box" checked="checked"/> PALSAR
                <input type="checkbox" name="chk_sensor_type[]" id="chk_sensor_type[]" value="4" class="small_check_box"/> CSK                

                <input type="checkbox" name="chk_sensor_type[]" id="chk_sensor_type[]" value="2" class="small_check_box"/> ASAR
                <input type="checkbox" name="chk_sensor_type[]" id="chk_sensor_type[]" value="3" class="small_check_box"/> TSX
				<input type="checkbox" name="chk_sensor_type[]" id="chk_sensor_type[]" value="5" class="small_check_box"/> GF3
				
            </div>
            
            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                单张图像或者像对
            </div>
            <div id="pannel_content_center">
                <input type="radio" name="rad_image_pair[]" id="rad_image_pair[]" value="0" class="small_radio" onClick="change_operations(0)"/> SAR 图像
                <input type="radio" name="rad_image_pair[]" id="rad_image_pair[]" value="1" class="small_radio" checked="checked" onClick="change_operations(1)"/> DInSAR 像对
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                成像地点
            </div>
            <div id="pannel_content_center">
                <input type="text" name="txt_local_name" id="txt_local_name" class="long_text_box"/>
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                轨道和像幅
            </div>
            <div id="pannel_content_center">
                <input type="text" name="txt_track" id="txt_track" class="med_text_box"/>
            </div>
            <div id="pannel_content_center">
                <input type="text" name="txt_start_frame" id="txt_start_frame" class="med_text_box"/> -
                <input type="text" name="txt_end_frame" id="txt_end_frame" class="med_text_box"/>
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                获取日期
            </div>
            <div id="pannel_content_center">
                <input type="text" name="txt_from_date" id="txt_from_date" class="med_text_box"/> -
                <input type="text" name="txt_to_date" id="txt_to_date" class="med_text_box"/>
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                极化方式
            </div>
            <div id="pannel_content_center">
                <input type="checkbox" name="chk_polar_type[]" id="chk_polar_type[]" value="HH" class="small_check_box" checked="checked"/> HH
                <input type="checkbox" name="chk_polar_type[]" id="chk_polar_type[]" value="HV" class="small_check_box" checked="checked"/> HV
                <input type="checkbox" name="chk_polar_type[]" id="chk_polar_type[]" value="VH" class="small_check_box" checked="checked"/> VH
                <input type="checkbox" name="chk_polar_type[]" id="chk_polar_type[]" value="VV" class="small_check_box" checked="checked"/> VV
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                处理状态
            </div>
            <div id="pannel_content_left">
                <input type="checkbox" name="chk_proc_status[]" id="chk_proc_status[]" value="0" class="small_check_box" checked="checked"/> 未处理
                <input type="checkbox" name="chk_proc_status[]" id="chk_proc_status[]" value="3" class="small_check_box" checked="checked"/> 成功
                <input type="checkbox" name="chk_proc_status[]" id="chk_proc_status[]" value="4" class="small_check_box" checked="checked"/> 失败
            </div>
            <div id="pannel_content_left">
                <input type="checkbox" name="chk_proc_status[]" id="chk_proc_status[]" value="1" class="small_check_box" checked="checked"/> 待处理
                <input type="checkbox" name="chk_proc_status[]" id="chk_proc_status[]" value="2" class="small_check_box" checked="checked"/> 处理中
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                基线信息
            </div>
            <div id="pannel_content_left">
                <input type="checkbox" name="chk_btemp" id="chk_btemp" value="1" class="small_check_box"/> 时间基线
                Min: <input type="text" name="txt_min_btemp" id="txt_min_btemp" class="short_text_box"/>
                Max: <input type="text" name="txt_max_btemp" id="txt_max_btemp" class="short_text_box"/>
            </div>
            <div id="pannel_content_left">
                <input type="checkbox" name="chk_bperp" id="chk_bperp" value="1" class="small_check_box"/> 空间基线
                Min: <input type="text" name="txt_min_bperp" id="txt_min_bperp" class="short_text_box"/>
                Max: <input type="text" name="txt_max_bperp" id="txt_max_bperp" class="short_text_box"/>
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
               每页显示结果数量
            </div>
            <div id="pannel_content_center">
                <input type="text" name="txt_res_per_page" id="txt_res_per_page" class="long_text_box" value="40"/>
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_title">
                执行方式
            </div>
            <div id="pannel_operation_button">
            <div id="pannel_content_center">
                <input type="button" name="btn_search" id="btn_search" value="像对查询" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_search', 3)" onMouseOut="change_btn_style('btn_search', 2)"
                    onClick="submit_search_condi(1)"/>
            </div>

            <?php if ($user_type & (PER_PROC_PAIR | PER_PROC_FULL)) { ?>

            <div id="pannel_content_center">
                <input type="button" name="btn_process" id="btn_process" value="添加处理" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_process', 3)" onMouseOut="change_btn_style('btn_process', 2)"
                    onClick="add_to_process(0)"/>
            </div>

            <?php } ?>

            <?php if ($user_type & (PER_CANCEL_PROC | PER_CANCEL_OTHER_PROC)) { ?>

            <div id="pannel_content_center">
                <input type="button" name="btn_cancel" id="btn_cancel" value="取消处理" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_cancel', 3)" onMouseOut="change_btn_style('btn_cancel', 2)"
                    onClick="cancel_processes()"/>
            </div>

            <?php } ?>

            <?php if ($user_type & PER_PROC_FULL) { ?>

            <div id="pannel_content_center">
                <input type="button" name="btn_full_process" id="btn_full_process" value="Process Full Resol Results" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_full_process', 3)" onMouseOut="change_btn_style('btn_full_process', 2)"
                    onClick="add_to_process(1)"/>
            </div>

            <?php } ?>

            <?php if ($user_type & PER_DL_ALL_RESULT) { ?>

            <div id="pannel_content_center">
                <input type="button" name="btn_dl_all_res" id="btn_dl_all_res" value="结果集获取" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_dl_all_res', 3)" onMouseOut="change_btn_style('btn_dl_all_res', 2)"
                    onClick="dl_all_sel_img()"/>
            </div>

            <?php } ?>

            <?php if ($user_type & PER_DL_ALL_GIS_RESULT) { ?>

            <div id="pannel_content_center">
                <input type="button" name="btn_dl_all_gis" id="btn_dl_all_gis" value="GIS信息获取" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_dl_all_gis', 3)" onMouseOut="change_btn_style('btn_dl_all_gis', 2)"
                    onClick="dl_all_sel_gis()"/>
            </div>

            <?php } ?>

            <?php if ($user_type & PER_DL_TABLE) { ?>

            <div id="pannel_content_center">
                <input type="button" name="btn_dl_pair_table" id="btn_dl_pair_table" value="Download Pair Table" class="big_orange_btn"
                    onMouseOver="change_btn_style('btn_dl_pair_table', 3)" onMouseOut="change_btn_style('btn_dl_pair_table', 2)"
                    onClick="dl_table_info(1)"/>
            </div>

            <?php } ?>

            </div>

            <?php } ?>

            <div id="pannel_bottom">
            </div>

            <div id="sort_table_check" style="visibility: hidden; position: absolute; left: 0; top: 0;">
                <input type="checkbox" id="ck_sort_table" name="ck_sort_table" onclick="sort_table()">
                <input type="button" name="btn_forw_backw" id="btn_forw_backw" value="Next" onclick="turn_page()">
                <input type="text" name="txt_nor_or_full" id="txt_nor_or_full" value="0"/>
            </div>


        </div>

    </body>

    </html>


    <?php
}

function do_search_infor_interface($username, $image_amt, $pair_amt, $proc_amt, $full_proc_amt)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - Login Successful</title>
    <link rel="stylesheet" type="text/css" href="css/adps_search_inter.css">
    <script language="javascript" src="adps_sys_infor.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>

        <br>

        <div id="infor_frame" style="padding-left: 30px; width: 1220px">
            <div id="infor_short_left">
            </div>
            <div id="infor_short_content_left">
                <div id="infor_content_line_center_padding">
                    "<label style="color: #CC0000; font-weight: bold;"><?php echo $username ?></label>",
                    欢迎来到全自动雷达差分干涉处理系统 ----
                    <a href=# onClick="hide_show_pannel()" id="hide_show_href">隐藏面板</a> |
                    <a href=# onClick="adps_sign_out()">登出</a> |
                    <a href=#>帮助</a>
                </div>
                <div id="infor_content_line_center">
                    SAR 图像数量: <label style="color: #CC0000; font-weight: bold;"><?php echo $image_amt ?></label>,
                    DInSAR 像对数量: <label style="color: #CC0000; font-weight: bold;"><?php echo $pair_amt ?></label>,
                    最大处理数量: <label style="color: #CC0000; font-weight: bold;"><?php echo $proc_amt ?></label>,
                    最大全景数量: <label style="color: #CC0000; font-weight: bold;"><?php echo $full_proc_amt ?></label>.
                </div>
            </div>
            <div id="infor_short_right">
            </div>

            <div id="infor_content_introduction">
                <img src="images/none.png" width="16" height="16"/> 已就绪 |
                <img src="images/todo.png" width="16" height="16"/> 等待中 |
                <img src="images/table-status-loading.gif" width="16" height="16"/> 运行中|
                <img src="images/finish.png" width="16" height="16"/> 成功 |
                <img src="images/fail.png" width="16" height="16"/> 失败 |
                <div id="infor_content_status">查询状态: <img src="images/none.png" width="16" height="16"/></div>
            </div>
        </div>

    </body>

    </html>


    <?php
}

function do_search_content_interface()
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - Login Successful</title>
    <link rel="stylesheet" type="text/css" href="css/adps_search_result.css">
    <script language="javascript" src="adps_search_result.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>
        <div id="content_frame"></div>

    </body>

    </html>


    <?php
}

function do_proc_para_interface($user_type)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - Login Successful</title>
    <link rel="stylesheet" type="text/css" href="css/adps_search_inter.css">
    <script language="javascript" src="adps_search_inter.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>

        <br>

        <div id="pannel_frame">
            <div id="pannel_top">
            </div>

            <div id="pannel_content_title">
                Processing Parameters
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_center">
                <input type="radio" name="rad_fft_proc[]" id="rad_fft_proc[]" value="0" class="small_radio" checked="checked"/> Without FFT
                <input type="radio" name="rad_fft_proc[]" id="rad_fft_proc[]" value="1" class="small_radio"/> With FFT
            </div>
            <div id="pannel_content_title">
                FFT Selection
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_content_center">

                <?php

                if (($user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 0)
                {
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="0" class="small_radio" checked="checked"/> Low';
                }
                else if (($user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 32)
                {
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="0" class="small_radio" checked="checked"/> Low';
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="1" class="small_radio"/> Med';
                }
                else if (($user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 64)
                {
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="0" class="small_radio" checked="checked"/> Low';
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="1" class="small_radio"/> Med';
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="2" class="small_radio"/> High';
                }
                else if (($user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 96)
                {
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="0" class="small_radio" checked="checked"/> Low';
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="1" class="small_radio"/> Med';
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="2" class="small_radio"/> High';
                  	echo '<input type="radio" name="rad_proc_pri[]" id="rad_proc_pri[]" value="3" class="small_radio"/> ASAP';
                }

                ?>
            </div>
            <div id="pannel_content_title">
                Priority
            </div>

            <div id="pannel_med">
            </div>

            <div id="pannel_operation_button">
            <div id="pannel_content_center">
                <input type="button" name="btn_proc_yes" id="btn_proc_yes" value="YES" class="small_orange_btn"
                    onMouseOver="change_btn_style('btn_proc_yes', 1)" onMouseOut="change_btn_style('btn_proc_yes', 0)"
                    onClick="proc_para_sub()"/>
                <input type="button" name="btn_proc_no" id="btn_proc_no" value="NO" class="small_orange_btn"
                    onMouseOver="change_btn_style('btn_proc_no', 1)" onMouseOut="change_btn_style('btn_proc_no', 0)"
                    onClick="no_proc_para_sub()"/>
            </div>
            <div id="pannel_content_title">
                Start Processing?
            </div>
            </div>

            <div id="pannel_bottom">
            </div>



            <div id="pannel_med" style="visibility: hidden; height: 0px">
            </div>

            <div id="pannel_content_center" style="visibility: hidden"; height: 0px>
                <input type="radio" name="rad_dem_proc[]" id="rad_dem_proc[]" value="0" class="small_radio" checked="checked"/> Complex
                <input type="radio" name="rad_dem_proc[]" id="rad_dem_proc[]" value="0" class="small_radio"/> Normal
                <input type="radio" name="rad_dem_proc[]" id="rad_dem_proc[]" value="0" class="small_radio"/> Flat
            </div>
            <div id="pannel_content_title" style="visibility: hidden; height: 0px">
                DEM Coregistrtation
            </div>

        </div>

    </body>

    </html>


    <?php
}

function do_add_user_interface()
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - User Management</title>
    <script language="javascript" src="adps_add_user.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>

    <div style="width: 660px">
          <fieldset><legend>Add ADPS Users</legend>

          <fieldset style="text-align: center;"><legend>User Name</legend>
          <input id="txt_usr_name" name="txt_usr_name" type="text" />
          </fieldset>

          <fieldset style="text-align: center;"><legend>Initial Password</legend>
          Password: <input type="password" name="txt_password" id="txt_password" /> --
          Comfirmation: <input type="password" name="txt_password_confirm" id="txt_password_confirm" />
          </fieldset>

          <fieldset style="text-align: center;"><legend>User Authorities</legend>
          <div style="text-align:left; padding-left: 20px;">
          <input id="ch_man_user" name="ch_man_user" type="checkbox" value="256" /> Managing User Information
          <input id="ch_add_loca" name="ch_add_loca" type="checkbox" value="16384" /> Adding Location Information
          </div>
          <div style="text-align:left; padding-left: 20px;">
          <input id="ch_search" name="ch_search" type="checkbox" value="1" checked /> Searching Image
          <input id="ch_view" name="ch_view" type="checkbox" value="2" /> Viewing Image
          <input id="ch_download" name="ch_download" type="checkbox" value="4" /> Downloading Image
          <input id="ch_download_gis" name="ch_download_gis" type="checkbox" value="2048" /> Downloading GIS Info
          </div>
          <div style="text-align:left; padding-left: 20px;">
          <input id="ch_download_sel_img" name="ch_download_sel_img" type="checkbox" value="4096" /> Downloading All Selected Images
          <input id="ch_download_sel_gis" name="ch_download_sel_gis" type="checkbox" value="8192" /> Downloading GIS Info of All Selected Images
          </div>
          <div style="text-align:left; padding-left: 20px;">
          <input id="ch_download_table" name="ch_download_table" type="checkbox" value="128" /> Downloading Table
          <input id="ch_proc_pair" name="ch_proc_pair" type="checkbox" value="8" /> Processing Pair
          <input id="ch_proc_full" name="ch_proc_full" type="checkbox" value="16" /> Processing Full Resolution Result
          </div>
          <div style="text-align:left; padding-left: 20px;">
          <input id="ch_cancel_self" name="ch_cancel_self" type="checkbox" value="512" /> Cancelling Own Processes
          <input id="ch_cancel_other" name="ch_cancel_other" type="checkbox" value="1024" /> Cancelling Others' Processes
          </div>
          </fieldset>

          <fieldset style="text-align: center;"><legend>Processing Priorities</legend>
          <input name="rad_pri[]" type="radio" value="0" checked /> Low
          <input name="rad_pri[]" type="radio" value="32" /> Med
          <input name="rad_pri[]" type="radio" value="64" /> High
          <input name="rad_pri[]" type="radio" value="96" /> ASAP
          </fieldset>

          <fieldset style="text-align: center;"><legend>Processing Amount of DInSAR Results per Day</legend>
          <input name="rad_proc[]" type="radio" value="10" checked /> Ten
          <input name="rad_proc[]" type="radio" value="20" /> Twenty
          <input name="rad_proc[]" type="radio" value="30" /> Thirty
          <input name="rad_proc[]" type="radio" value="50" /> Fifty
          <input name="rad_proc[]" type="radio" value="-1" /> Infinite
          </fieldset>

          <fieldset style="text-align: center;"><legend>Processing Amount of Full Resolution Results per Day</legend>
          <input name="rad_full_proc[]" type="radio" value="1" checked /> One
          <input name="rad_full_proc[]" type="radio" value="2" /> Two
          <input name="rad_full_proc[]" type="radio" value="4" /> Four
          <input name="rad_full_proc[]" type="radio" value="10" /> Ten
          <input name="rad_full_proc[]" type="radio" value="20" /> Twenty
          </fieldset>

          <fieldset style="text-align: center;"><legend>User Email Address</legend>
          <input name="txt_user_email" type="text" value="" id="txt_user_email" />
          </fieldset>

          <fieldset style="text-align: center;"><legend>Operations</legend>
          <input name="btn_submit" type="button" value="Add User" onClick="add_user()" />
          <input name="btn_cancel" type="button" value="Reset Information" onClick="reset_setting()" />
          <input name="btn_quite" type="button" value="Sign Out" onClick="admin_sign_out()" />
          </fieldset>

          </fieldset>
    </div>

    </body>
    </html>


    <?php
}

function do_show_image_interface($image_name, $usertype)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - User Management</title>
    <script language="javascript" src="adps_show_image.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>
        <div id="show_image_frame">
        </div>
    </body>
    </html>

    <?php
}

function do_dl_image_interface($image_name, $user_type, $track_info, $sen_name)
{
    $image_path         = 'RESULT/'.$sen_name.'/track'.$track_info.'/';
    $image_full_name    = $image_path.$image_name;
    $image_url          = HTTP_HOME.$image_full_name;
    $image_kmz_url		= HTTP_HOME.$image_full_name.'.kmz';
    $image_kmz_rname 	= RESULT_MOUNT_HOME.$image_full_name.'.kmz';
    $image_gis_url      = HTTP_HOME.$image_full_name.'w';
    $image_infor        = getimagesize($image_url);
    $image_width        = (string)($image_infor[0]);
    $image_height       = (string)($image_infor[1]);


    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Processing System (ADPS) - User Management</title>
    <script language="javascript" src="adps_dl_image.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>
        <div id="operation_btns" style="padding-left: 20px; padding-bottom: 10px;">
        <a href= <?php echo '"'.$image_url.'"'; ?> target="_blank">DInSAR Image (Right click this link or image below to save Image)</a>

        <?php if ($user_type & PER_DL_GIS_RESULT) {?>
        | <a href= <?php echo '"'.$image_gis_url.'"'; ?> target="_blank">GIS Infor of DInSAR Image</a>
        <?php } ?>

        <?php if ($user_type & PER_DL_GIS_RESULT)
        {
        	if (file_exists($image_kmz_rname))
        	{
        ?>
        | <a href= <?php echo '"'.$image_kmz_url.'"'; ?> target="_blank">KMZ of DInSAR Image</a>
        <?php
        	}
        } ?>

        <?php if ($user_type & PER_PROC_FULL) {?>
        | <a href=# onClick='full_res_proc()'>Processing Full Resolution Image</a>
        <?php } ?>

		| <a href=# onClick='check_weather_info(href)'>Checking Weather Info</a>

        </div>

        <fieldset><legend>DInSAR Result: <?php echo $image_name; ?></legend>
            <div id="image_frame" onClick="change_image_size()"><img src= <?php echo '"'.$image_full_name.'"'; ?> width= <?php echo '"'.$image_width.'"'; ?> height= <?php echo '"'.$image_height.'"'; ?> /></div>
        </fieldset>

        <div id="image_width_infor" style="visibility: hidden; position: absolute; left: 0; top: 0;">
            <input type="text" name="txt_width_infor" id="txt_width_infor" value="<?php echo $image_width; ?>"/>
        </div>
        <div id="image_height_infor" style="visibility: hidden; position: absolute; left: 0; top: 0;">
            <input type="text" name="txt_height_infor" id="txt_height_infor" value="<?php echo $image_height; ?>"/>
        </div>
        <div id="image_name_infor" style="visibility: hidden; position: absolute; left: 0; top: 0;">
            <input type="text" name="txt_name_infor" id="txt_name_infor" value="<?php echo $image_full_name; ?>"/>
        </div>
        <div id="download_infor" style="visibility: hidden; position: absolute; left: 0; top: 0;">
            <iframe id="download_url" height="0" width="0" src=""></iframe>
        </div>
        <div id="show_image_para" style="position: absolute; left: 0; top: 0; visibility: hidden;">
            <input type="text" name="txt_user_type" id="txt_user_type" value="<?php echo $user_type; ?>"/>
        </div>
    </body>
    </html>


    <?php
}

function do_location_man_interface()
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Automatical DInSAR Analysis System (ADPS) - Location Management</title>
    <link rel="stylesheet" type="text/css" href="css/adps_location_input.css">
    <script language="javascript" src="adps_location_input.js" type="text/javascript" charset="GB2312"></script>
    </head>

    <body>
    <br>

    <div id="location_infor_frame" style="width: 620px; padding-left: 30px;">
    <fieldset>
    <legend>Location Information for Tracks & Frames</legend>
        <div id="loca_set_cont">
            <div id="loc_cont_line">
                <div id="loc_sensor_title">Sensor</div>
                <div id="loc_track_title">Track</div>
                <div id="loc_frame_title">Frame</div>
                <div id="loc_name_title">Location Description</div>
            </div>
        </div>
    </fieldset>
    <br>
    <input name="btn_up_loca" type="button" value="Update Location Infor" onClick="update_loca_info()" />
    <input name="btn_reset_loca" type="button" value="Reset" onClick="reset_loca_info()" />
    <input name="btn_sign_out" type="button" value="Sign Out" onClick="logout_loca_info()" />
    </div>

    </body>
    </html>

    <?php
}

?>