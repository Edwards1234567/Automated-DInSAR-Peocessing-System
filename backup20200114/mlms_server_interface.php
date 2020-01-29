<?php

function do_login_interface($message_to_show)
{
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
    <title>Automatical DInSAR Processing System (ADPS)</title>
    <link rel="stylesheet" type="text/css" href="css/adps_index.css">
    <script language="javascript" src="adps_index.js" type="text/javascript" charset="GBK"></script>
    </head>

    <body>

    <br>

    <form id="form_login" name="form_login" method="post" action="mlms_login.php">

    <div id="login_frame" align="center">
        <div id="login_head">
            <?php echo $message_to_show; ?>
        </div>


        <div id="login_body_frame">
            <div id="login_body_left">
            </div>

            <div id="login_body_center">

                <div id="login_label">
                    User Name:
                </div>

                <div id="login_content">
                    <input type="text" name="txt_login_name" id="txt_login_name" class="login_text_box"/>
                </div>

                <div id="login_label">
                    Password:
                </div>

                <div id="login_content">
                    <input type="password" name="txt_login_pass" id="txt_login_pass" class="login_text_box"/>
                </div>

            </div>

            <div id="login_body_right">
            </div>
        </div>


        <div id="login_tail">
            <input type="submit" name="btn_login_submit" id="btn_login_submit" value="Login" class="orange_btn"
                onMouseOver="change_btn_style('btn_login_submit', 0)" onMouseOut="change_btn_style('btn_login_submit', 1)"/>
            <input type="reset" name="btn_login_clear" id="btn_login_clear" value="Clear" class="orange_btn"
                onMouseOver="change_btn_style('btn_login_clear', 0)" onMouseOut="change_btn_style('btn_login_clear', 1)"/>
        </div>
    </div>

    </form>

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
    <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
    <title>Automatical DInSAR Analysis System (ADPS) - Location Management</title>
    <link rel="stylesheet" type="text/css" href="css/mims_info_input.css">
    <script language="javascript" src="mlms_info_input.js" type="text/javascript" charset="GBK"></script>
    </head>

    <body>
    <br>

    <div id="license_info_frame" style="width: 1730px; padding-left: 30px;">
    <fieldset>
    <legend>中华人民共和国采矿许可证：</legend>
        <div id="lic_set_cont">
            <div id="lic_cont_line">
            	<div id="lic_change_sel_title">
						<input	type="checkbox"	id="sel_chg_sel_all" class="sel_all" onClick="sel_all_info(\'sel_chg_sel_all\', \'ch_change_name[]\')">
				</div>
                <div id="lic_lic_id_title">许可证号</div>
                <div id="lic_corporation_title">采矿权人</div>
                <div id="lic_location_title">地址</div>
                <div id="lic_mine_name_title">矿山名称</div>
                <div id="lic_comp_type_title">经济类型</div>
                <div id="lic_mine_type_title">开采矿种</div>
                <div id="lic_exp_method_title">开采方式</div>
                <div id="lic_prod_title">生产规模</div>
                <div id="lic_site_area_title">矿区面积</div>
                <div id="lic_val_date_start_title">有效期限（自）</div>
                <div id="lic_val_date_end_title">有效期限（至）</div>
                <div id="lic_issue_id_title">换发证号</div>
                <div id="lic_issue_date_title">颁发日期</div>
                <div id="lic_issue_dept_title">发证机关</div>
                <div id="lic_exp_dep_start_title">开采深度（由）</div>
                <div id="lic_exp_dep_end_title">开采深度（至）</div>
                <div id="lic_site_coors_title">矿区拐点坐标</div>
                <div id="lic_change_sel"></div>
            </div>
        </div>
    </fieldset>
    <br>
    <input name="btn_add_lic" type="button" value="添加信息" onClick="add_lic_info()" />
    <input name="btn_del_lic" type="button" value="删除信息" onClick="del_lic_info()" />
    <input name="btn_up_lic" type="button" value="更新信息" onClick="update_lic_info()" />
    <input name="btn_reset_lic" type="button" value="重置" onClick="reset_lic_info()" />
    <input name="btn_sign_out" type="button" value="注销" onClick="logout_lic_info()" />
    </div>

    <div id="coor_info_frame" style="width: 800px; height: 600px; overflow: auto; padding: 30px; position: fixed; visibility: hidden; top: 100px; left: 300px; background: #FFFFFF; border: solid;">
        <fieldset>
        <legend>矿区范围拐点坐标：</legend>
            <div id="lic_coor_cont">
                <div id="lic_coor_line" >
					<div id="lic_change_sel_title">
						<input	type="checkbox"	id="sel_coor_sel_all" class="sel_all" onClick="sel_all_coor('sel_coor_sel_all', 'ch_coor_name[]')">
					</div>'
                    <div id="lic_lic_id_title">许可证号</div>
                    <div id="lic_comp_type_title">点号</div>
                    <div id="lic_location_title">X坐标</div>
                    <div id="lic_mine_name_title">Y坐标</div>
                    <div id="lic_corporation_title">坐标类型</div>
                    <div id="lic_coor_sys_all_title"><input type="checkbox" id="coor_sys_sel_all" class="coors_sel_all"></div>
                </div>
            </div>
        </fieldset>
        <br>
        <input name="btn_add_coor" type="button" value="添加坐标" onClick="add_coor()" />
        <input name="btn_del_coor" type="button" value="删除坐标" onClick="del_coor()"/>
        <input name="btn_save_coor" type="button" value="保存坐标" onClick="save_coor()"/>
        <input name="btn_cancel" type="button" value="退出" onClick="cancel_coor()"/>
    </div>

    </body>
    </html>

    <?php
}

?>