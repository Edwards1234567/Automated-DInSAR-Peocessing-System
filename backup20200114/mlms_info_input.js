var	update_lic_xml_http;
var	sign_out_xml_http;
var	check_id_xml_http;
var	get_coor_xml_http;
var	check_id_text_id;
var	check_id_line_id;
var	add_cnt;
var login_id_root;

function create_xml_http_request()
{
	var	xml_http_tmp;

	try
	{
		xml_http_tmp	= new XMLHttpRequest();
	}
	catch (ajaxEle)
	{
		try
		{
			xml_http_tmp	= new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (ajaxEle)
		{
			xml_http_tmp	= new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	return xml_http_tmp;
}


function get_url(str)
{
	return str + "?t="+((new Date()).valueOf());
}


function lic_infor_table(response_xml)
{
	var	i, j;
	var	infor_records	= response_xml.getElementsByTagName('Record');
	var	first_property	= infor_records[0].getElementsByTagName('Property');
	this.nrows			= infor_records.length;
	this.ncols			= first_property.length;
	this.data			= new Array(this.nrows);

	for(i =	0; i < this.nrows; i++)
	{
		this.data[i]	= new Array(this.ncols);
	}

	for(i =	0; i < infor_records.length; i++)
	{
		var	property	= infor_records[i].getElementsByTagName('Property');

		for(j =	0; j < first_property.length; j++)
		{
			this.data[i][j]	= property[j].firstChild.nodeValue;
		}
	}
}


function draw_lic_list(list_to_draw)
{
	var	list_html	=	'<div id="lic_cont_line">'									+
						'<div id="lic_change_sel_title">'							+
							'<input	type="checkbox"	id="sel_chg_sel_all" class="sel_all" onClick="sel_all_info(\'sel_chg_sel_all\', \'ch_change_name[]\')">'	+
						'</div>'													+
						'<div id="lic_lic_id_title">许可证号</div>'					+
						'<div id="lic_corporation_title">采矿权人</div>'			+
						'<div id="lic_location_title">地址</div>'					+
						'<div id="lic_mine_name_title">矿山名称</div>'				+
						'<div id="lic_comp_type_title">经济类型</div>'				+
						'<div id="lic_mine_type_title">开采矿种</div>'				+
						'<div id="lic_exp_method_title">开采方式</div>'				+
						'<div id="lic_prod_title">生产规模</div>'					+
						'<div id="lic_site_area_title">矿区面积</div>'				+
						'<div id="lic_val_date_start_title">有效期限（自）</div>'	+
						'<div id="lic_val_date_end_title">有效期限（至）</div>'		+
						'<div id="lic_issue_id_title">换发证号</div>'				+
						'<div id="lic_issue_date_title">颁发日期</div>'				+
						'<div id="lic_issue_dept_title">发证机关</div>'				+
						'<div id="lic_exp_dep_start_title">开采深度（由）</div>'	+
						'<div id="lic_exp_dep_end_title">开采深度（至）</div>'		+
						'<div id="lic_site_coors_title">矿区拐点坐标</div>'			+
						'<div id="lic_change_sel"></div>'							+
						'</div>';
	var	lic_cont   = document.getElementById('lic_set_cont');

	if (list_to_draw.ncols != 0)
	{
		for	(var i = 0;	i <	list_to_draw.nrows;	i++)
		{
			var	txt_name_id		= 'id_txt_'	+ list_to_draw.data[i][0];
			var	txt_name_corp	= 'corp_txt_' +	list_to_draw.data[i][0];
			var	txt_name_loct	= 'loct_txt_' +	list_to_draw.data[i][0];
			var	txt_name_mname	= 'mname_txt_' + list_to_draw.data[i][0];
			var	txt_name_ctype	= 'ctype_txt_' + list_to_draw.data[i][0];
			var	txt_name_mtype	= 'mtype_txt_' + list_to_draw.data[i][0];
			var	txt_name_exmt	= 'exmt_txt_' +	list_to_draw.data[i][0];
			var	txt_name_prod	= 'prod_txt_' +	list_to_draw.data[i][0];
			var	txt_name_area	= 'area_txt_' +	list_to_draw.data[i][0];
			var	txt_name_vdstrt	= 'vdstrt_txt_'	+ list_to_draw.data[i][0];
			var	txt_name_vdend	= 'vdend_txt_' + list_to_draw.data[i][0];
			var	txt_name_isid	= 'isid_txt_' +	list_to_draw.data[i][0];
			var	txt_name_isdate	= 'isdate_txt_'	+ list_to_draw.data[i][0];
			var	txt_name_isdept	= 'isdept_txt_'	+ list_to_draw.data[i][0];
			var	txt_name_dpstrt	= 'dpstrt_txt_'	+ list_to_draw.data[i][0];
			var	txt_name_dpend	= 'dpend_txt_' + list_to_draw.data[i][0];
			var	txt_name_coor	= 'coor_txt_' +	list_to_draw.data[i][0];
			var	check_id		= 'check_' + list_to_draw.data[i][0];
			list_html			+=	'<div id="lic_cont_line">' +
									'<div id="lic_change_sel_cont">' +
										'<input type="checkbox" id="' + check_id + '" class="change_sel" name="ch_change_name[]" value="' + list_to_draw.data[i][0] + '"></div>'	 +
									'</div>' +
									'<div id="lic_lic_id_cont">'  +
										'<input	type="text"	name="'	+ txt_name_id +	'" id="' + txt_name_id + '" class="txt_lic_id" value="'	+ list_to_draw.data[i][0] +	'" onKeyDown="lic_info_changed(\'' + txt_name_id + '\',	\''	+ check_id + '\')" onChange="check_lic_id(\'' + txt_name_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_corporation_cont">'  +
										'<input	type="text"	name="'	+ txt_name_corp	+ '" id="' + txt_name_corp + '"	class="txt_lic_corp" value="' +	list_to_draw.data[i][1]	+ '" onKeyDown="lic_info_changed(\'' + txt_name_corp + '\',	\''	+ check_id + '\')" onChange="set_same_content(\'' + txt_name_corp + '\', \'' + txt_name_mname + '\')"/>' +
									'</div>'	+
									'<div id="lic_location_cont">'	+
										'<input	type="text"	name="'	+ txt_name_loct	+ '" id="' + txt_name_loct + '"	class="txt_lic_loc"	value="' + list_to_draw.data[i][2] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_loct	+ '\', \'' + check_id +	'\')"/>' +
									'</div>'	+
									'<div id="lic_mine_name_cont">'	 +
										'<input	type="text"	name="'	+ txt_name_mname + '" id="'	+ txt_name_mname + '" class="txt_lic_mine_name"	value="' + list_to_draw.data[i][3] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_mname + '\',	\''	+ check_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_comp_type_cont">'	 +
										'<input	type="text"	name="'	+ txt_name_ctype + '" id="'	+ txt_name_ctype + '" class="txt_lic_comp_type"	value="' + list_to_draw.data[i][4] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_ctype + '\',	\''	+ check_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_mine_type_cont">'	 +
										'<input	type="text"	name="'	+ txt_name_mtype + '" id="'	+ txt_name_mtype + '" class="txt_lic_mine_type"	value="' + list_to_draw.data[i][5] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_mtype + '\',	\''	+ check_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_exp_method_cont">'  +
										'<input	type="text"	name="'	+ txt_name_exmt	+ '" id="' + txt_name_exmt + '"	class="txt_lic_exp_meth" value="' +	list_to_draw.data[i][6]	+ '" onKeyDown="lic_info_changed(\'' + txt_name_exmt + '\',	\''	+ check_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_prod_cont">'	+
										'<input	type="text"	name="'	+ txt_name_prod	+ '" id="' + txt_name_prod + '"	class="txt_lic_prod" value="' +	list_to_draw.data[i][7]	+ '" onKeyDown="lic_info_changed(\'' + txt_name_prod + '\',	\''	+ check_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_site_area_cont">'	 +
										'<input	type="text"	name="'	+ txt_name_area	+ '" id="' + txt_name_area + '"	class="txt_lic_site_area" value="' + list_to_draw.data[i][8] + '" onKeyDown="lic_info_changed(\'' +	txt_name_area +	'\', \'' + check_id	+ '\')"/>' +
									'</div>'	+
									'<div id="lic_val_date_start_cont">'  +
										'<input	type="text"	name="'	+ txt_name_vdstrt +	'" id="' + txt_name_vdstrt + '"	class="txt_lic_vdate_start"	value="' + list_to_draw.data[i][9] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_vdstrt +	'\', \'' + check_id	+ '\')" onChange="set_same_content(\'' + txt_name_vdstrt + '\', \'' + txt_name_isdate + '\')"/>' +
									'</div>'	+
									'<div id="lic_val_date_end_cont">'	+
										'<input	type="text"	name="'	+ txt_name_vdend + '" id="'	+ txt_name_vdend + '" class="txt_lic_vdate_end"	value="' + list_to_draw.data[i][10]	+ '" onKeyDown="lic_info_changed(\'' + txt_name_vdend +	'\', \'' + check_id	+ '\')"/>' +
									'</div>'	+
									'<div id="lic_issue_id_cont">'	+
										'<input	type="text"	name="'	+ txt_name_isid	+ '" id="' + txt_name_isid + '"	class="txt_lic_issue_id" value="' +	list_to_draw.data[i][11] + '" onKeyDown="lic_info_changed(\'' +	txt_name_isid +	'\', \'' + check_id	+ '\')"/>' +
									'</div>'	+
									'<div id="lic_issue_date_cont">'  +
										'<input	type="text"	name="'	+ txt_name_isdate +	'" id="' + txt_name_isdate + '"	class="txt_lic_issue_date" value="'	+ list_to_draw.data[i][12] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_isdate +	'\', \'' + check_id	+ '\')"/>' +
									'</div>'	+
									'<div id="lic_issue_dept_cont">'  +
										'<input	type="text"	name="'	+ txt_name_isdept +	'" id="' + txt_name_isdept + '"	class="txt_lic_issue_dept" value="'	+ list_to_draw.data[i][13] + '"	onKeyDown="lic_info_changed(\''	+ txt_name_isdept +	'\', \'' + check_id	+ '\')"/>' +
									'</div>'	+
									'<div id="lic_exp_dep_start_cont">'	 +
										'<input	type="text"	name="'	+ txt_name_dpstrt +	'" id="' + txt_name_dpstrt + '"	class="txt_lic_dep_start" value="' + list_to_draw.data[i][14] +	'" onKeyDown="lic_info_changed(\'' + txt_name_dpstrt + '\',	\''	+ check_id + '\')"/>' +
									'</div>'	+
									'<div id="lic_exp_dep_end_cont">'  +
										'<input	type="text"	name="'	+ txt_name_dpend + '" id="'	+ txt_name_dpend + '" class="txt_lic_dep_end" value="' + list_to_draw.data[i][15] +	'" onKeyDown="lic_info_changed(\'' + txt_name_dpend	+ '\', \'' + check_id +	'\')"/>' +
									'</div>'	+
									'<div id="lic_site_coors_cont">'	+
									'<div id="lic_coor_num_href_' + list_to_draw.data[i][0] + '">'	+
										'<a href=# onClick="show_coor_info(\'' + list_to_draw.data[i][0] + '\')">' + list_to_draw.data[i][16] + '</a>'	 +
									'</div>'	+
									'</div>'	+
									'<div id="lic_coors_num_cont">'	+
										'<input	type="text"	name="'	+ txt_name_coor	+ '" id="' + txt_name_coor + '"	value="' + list_to_draw.data[i][16]	+ '"/>'	+
									'</div>';
		}

		lic_cont.innerHTML = list_html;
	}
}


function draw_coor_list(list_to_draw, license_id)
{
	var	list_html	 =	'<div id="lic_coor_line">' +
							'<div id="lic_change_sel_title">'	+
								'<input	type="checkbox"	id="sel_coor_sel_all" class="sel_all" value="' + license_id + '" onClick="sel_all_info(\'sel_coor_sel_all\', \'ch_coor_name[]\')">'	+
							'</div>'	+
							'<div id="lic_lic_id_title">许可证号</div>'	+
							'<div id="lic_comp_type_title" onDblClick="auto_set_pid()">点号</div>' +
							'<div id="lic_location_title">X坐标</div>' +
							'<div id="lic_mine_name_title">Y坐标</div>'	+
							'<div id="lic_corporation_title">坐标类型</div>' +
							'<div id="lic_coor_sys_all_title"><input type="checkbox" id="coor_sys_sel_all" class="coors_sel_all"></div>' +
						'</div>';

	if (list_to_draw.nrows != 0)
	{
		var	lic_cont   = document.getElementById('lic_coor_cont');

		if (list_to_draw.ncols != 0)
		{
			for	(var i = 0;	i <	list_to_draw.nrows;	i++)
			{
				var index_root		= list_to_draw.data[i][0] + '_' + list_to_draw.data[i][5];
				var	txt_name_id		= 'id_txt_'	+ index_root;
				var	txt_name_pid	= 'pnt_id_txt_'	+ index_root;
				var	txt_name_x		= 'x_txt_' + index_root;
				var	txt_name_y		= 'y_txt_' + index_root;
				var	txt_name_csys	= 'csys_txt_' +	index_root;
				var check_id		= 'check_' + index_root;
				list_html			+=	'<div id="lic_coor_line">' +
										'<div id="lic_change_sel_cont">' +
											'<input type="checkbox" id="' + check_id + '" class="change_sel" name="ch_coor_name[]" value="' + index_root + '"></div>'	 +
										'</div>' +
										'<div id="lic_lic_id_cont">'  +
											'<input	type="text"	name="'	+ txt_name_id +	'" id="' + txt_name_id + '"	class="txt_lic_id" value="' + list_to_draw.data[i][0] + '" readonly/>' +
										'</div>'	+
										'<div id="lic_comp_type_cont">'  +
											'<input	type="text"	name="'	+ txt_name_pid + '"	id="' +	txt_name_pid + '" class="txt_lic_comp_type" value="' + list_to_draw.data[i][1] + '" onKeyDown="lic_info_changed(\'' + txt_name_pid + '\',	\''	+ check_id + '\')"/>' +
										'</div>'	+
										'<div id="lic_location_cont">'	+
											'<input	type="text"	name="'	+ txt_name_x + '" id="'	+ txt_name_x + '" class="txt_lic_loc" value="' + list_to_draw.data[i][2] + '" onKeyDown="lic_info_changed(\'' + txt_name_x + '\',	\''	+ check_id + '\')"/>' +
										'</div>'	+
										'<div id="lic_mine_name_cont">'	 +
											'<input	type="text"	name="'	+ txt_name_y + '" id="'	+ txt_name_y + '" class="txt_lic_mine_name"	value="' + list_to_draw.data[i][3] + '" onKeyDown="lic_info_changed(\'' + txt_name_y + '\',	\''	+ check_id + '\')"/>' +
										'</div>'	+
										'<div id="coor_info_cont">'	 +
											'<select id="' + txt_name_csys + '" class="opt_lic_comp_type" onChange="lic_info_changed(\'' + txt_name_csys + '\', \'' + check_id + '\')">';

				for (var j = 6; j < list_to_draw.ncols; j++)
				{
					if (list_to_draw.data[i][4] != list_to_draw.data[i][j])
					{
						list_html	+= '<option value="' + list_to_draw.data[i][j] + '">' + list_to_draw.data[i][j];
					}
					else
					{
						list_html	+= '<option value="' + list_to_draw.data[i][j] + '" selected>' + list_to_draw.data[i][j];
					}
				}

				list_html			+=	'</select>'+
											//'<input	type="text"	name="'	+ txt_name_csys	+ '" id="' + txt_name_csys + '"	class="txt_lic_comp_type" value="' + list_to_draw.data[i][4] + '" onKeyDown="lic_info_changed(\'' + txt_name_csys + '\',	\''	+ check_id + '\')"/>' +
										'</div>'	+
										'</div>';
			}
		}
	}

	lic_cont.innerHTML = list_html;
}




function update_lic_response()
{
	if (update_lic_xml_http.readyState == 4	&& update_lic_xml_http.status == 200)
	{
		//alert(update_lic_xml_http.responseText);

		if (update_lic_xml_http.responseXML)
		{
			var	lic_list   = new lic_infor_table(update_lic_xml_http.responseXML);
			draw_lic_list(lic_list);
		}
		else
		{
			draw_lic_list(0);
		}
	}
}

function check_lic_response()
{
	if (check_id_xml_http.readyState ==	4 && check_id_xml_http.status == 200)
	{
		if (check_id_xml_http.responseXML)
		{
			var	infor_records	= check_id_xml_http.responseXML.getElementsByTagName('Record');
			var	first_property	= infor_records[0].getElementsByTagName('Property');
			var check_result	= first_property[0].firstChild.nodeValue;

			if (check_result != 'OK')
			{
				var err_lic_txt	= document.getElementById(check_result);
				err_lic_txt.style.background	= '#FF0000';
				alert('This license ID has already existed!');
			}
		}
		else
		{
			alert(check_id_xml_http.responseText);
		}
	}
}

function get_coor_response()
{
	if (get_coor_xml_http.readyState ==	4 && get_coor_xml_http.status == 200)
	{
		//alert(get_coor_xml_http.responseText);

		if (get_coor_xml_http.responseXML)
		{
			var	coor_list			= new lic_infor_table(get_coor_xml_http.responseXML);
			var license_id			= coor_list.data[0][0];
			var coor_num_div_id		= 'lic_coor_num_href_' + license_id;
			var coor_num_div		= document.getElementById(coor_num_div_id);
			coor_num_div.innerHTML	= '<a href=# onClick="show_coor_info(\'' + license_id + '\')">' + coor_list.nrows + '</a>';
			draw_coor_list(coor_list, license_id);
		}
		else
		{
			var coor_num_div_id		= 'lic_coor_num_href_' + get_coor_xml_http.responseText;
			var coor_num_div		= document.getElementById(coor_num_div_id);
			coor_num_div.innerHTML	= '<a href=# onClick="show_coor_info(\'' + get_coor_xml_http.responseText + '\')">0</a>';
			draw_coor_list(0, get_coor_xml_http.responseText);
			//alert(get_coor_xml_http.responseText);
		}
	}
}


function auto_set_pid()
{
	var all_coor_check	= document.getElementsByName('ch_coor_name[]');

	for (var i = 0; i < all_coor_check.length; i++)
	{
		var chg_pnt_id				= 'pnt_id_txt_' + all_coor_check[i].value;
		var chg_pnt					= document.getElementById(chg_pnt_id);
		chg_pnt.value				= (i + 1).toString();
		chg_pnt.style.background	= '#00FFFF';
		all_coor_check[i].checked	= true;
	}
}


function set_same_content(source_cont, dest_cont)
{
	var source_container	= document.getElementById(source_cont);
	var dest_container		= document.getElementById(dest_cont);
	dest_container.value	= source_container.value;
	dest_container.style.background	= '#00FFFF';
}


function lic_info_changed(text_id, check_id)
{
	var coor_sys_sel_all			= document.getElementById('coor_sys_sel_all');

	if (coor_sys_sel_all.checked)
	{
		var csys_flag	= text_id.split('_')[0];

		if (csys_flag == 'csys')
		{
			var all_coor_check	= document.getElementsByName('ch_coor_name[]');
			var	curr_sel		= document.getElementById(text_id);

			for (var i = 0; i < all_coor_check.length; i++)
			{
				var chg_sel_id				= 'csys_txt_' + all_coor_check[i].value;
				var chg_sel					= document.getElementById(chg_sel_id);
				chg_sel.value				= curr_sel.value;
				chg_sel.style.background	= '#00FFFF';
				all_coor_check[i].checked	= true;
			}
		}
		else
		{
			var	txt_loc_name				= document.getElementById(text_id);
			txt_loc_name.style.background	= '#00FFFF';
			var	check_change				= document.getElementById(check_id);
			check_change.checked			= true;
		}
	}
	else
	{
		var	txt_loc_name				= document.getElementById(text_id);
		txt_loc_name.style.background	= '#00FFFF';
		var	check_change				= document.getElementById(check_id);
		check_change.checked			= true;
	}
}

function show_coor_info(license_id, coor_number)
{
	var	coor_pannel	= document.getElementById('coor_info_frame');
	coor_pannel.style.visibility  =	'visible';
	var	post_items	= 'valid_proc=5&license_id=' + license_id;

	get_coor_xml_http.open('POST', get_url("./mlms_server_operations.php"),	true);
	get_coor_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	get_coor_xml_http.send(post_items);
}


function add_coor()
{
	var	post_item	= 'valid_proc=7';
	var cur_lic_id	= document.getElementById('sel_coor_sel_all').value;
	post_item		+= '&license_id=' + cur_lic_id;

	get_coor_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
	get_coor_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	get_coor_xml_http.send(post_item);
}


function del_coor()
{

	var sel_coor_ids	= document.getElementsByName('ch_coor_name[]');
	var checked_number	= 0;

	for	(var i = 0;	i <	sel_coor_ids.length; i++)
	{
		if (sel_coor_ids[i].checked && !sel_coor_ids[i].disabled)
		{
			checked_number++;
			break;
		}
	}

	if (checked_number > 0)
	{
		if(confirm('Are you sure to delete the seleted information?'))
		{
			var	post_item		= 'valid_proc=8';

			for	(var i = 0;	i <	sel_coor_ids.length; i++)
			{
				if (sel_coor_ids[i].checked && !sel_coor_ids[i].disabled)
				{
					var	coor_id	= sel_coor_ids[i].value.split('_');
					post_item	+= '&coor_ids[]=' + coor_id[1];
				}
			}

			if (post_item != 'valid_proc=8')
			{
				get_coor_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
				get_coor_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
				get_coor_xml_http.send(post_item);
			}
		}
	}
}


function save_coor()
{
	var	check_cont	= document.getElementsByName('ch_coor_name[]');
	var	post_item	= 'valid_proc=9';

	for	(var i = 0;	i <	check_cont.length; i++)
	{
		if (check_cont[i].checked && !check_cont[i].disabled)
		{
			var	index_root		= check_cont[i].value;
			var coor_id			= index_root.split('_')[1];
			var	txt_name_pid	= 'pnt_id_txt_'	+ index_root;
			var	txt_name_x		= 'x_txt_' + index_root;
			var	txt_name_y		= 'y_txt_' + index_root;
			var	txt_name_csys	= 'csys_txt_' +	index_root;

			var	txt_pid			= document.getElementById(txt_name_pid);
			var	txt_coor_x		= document.getElementById(txt_name_x);
			var	txt_coor_y		= document.getElementById(txt_name_y);
			var	txt_coor_sys	= document.getElementById(txt_name_csys);
			txt_pid.value		= (txt_pid.value == "") ? 1 : txt_pid.value;
			txt_coor_x.value	= (txt_coor_x.value == "") ? 0 : txt_coor_x.value;
			txt_coor_y.value	= (txt_coor_y.value == "") ? 0 : txt_coor_y.value;

			post_item		+= '&coor_ids[]=' + coor_id;
			post_item		+= '&ch_changed[]=\'update coordinate_info set point_id = ' + txt_pid.value +
							   ', point_x = ' + txt_coor_x.value +
							   ', point_y = ' + txt_coor_y.value +
							   ', coordinate_type = "' + txt_coor_sys.value	+
							   '" where Id = ' + coor_id + '\'';
		}
	}

	if (post_item == 'valid_proc=9')
	{
		alert('No Information Updated!');
	}
	else
	{
		get_coor_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
		get_coor_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
		get_coor_xml_http.send(post_item);
	}
}


function cancel_coor()
{
	var	coor_pannel	= document.getElementById('coor_info_frame');

	coor_pannel.style.visibility  =	'hidden';
}




function sel_all_info(sel_all_id, check_box_name)
{
	var sel_all		= document.getElementById(sel_all_id);
	var	check_cont	= document.getElementsByName(check_box_name);

	if (sel_all.checked)
	{
		for	(var i = 0;	i <	check_cont.length; i++)
		{
			check_cont[i].checked	= true;
		}
	}
	else
	{

		for	(var i = 0;	i <	check_cont.length; i++)
		{
			check_cont[i].checked	= false;
		}
	}
}


function check_lic_id(txt_name_id)
{
	var txt_id			= document.getElementById(txt_name_id);
	var	post_item		= 'valid_proc=4&license_id=' + txt_id.value.toString() + '&text_id=' + txt_name_id;

	check_id_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
	check_id_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	check_id_xml_http.send(post_item);
}


function add_lic_info()
{
	var	post_item		= 'valid_proc=2';
	var login_id_tail	= (add_cnt < 10) ? ('000' + add_cnt.toString()) : ((add_cnt < 100) ? ('00' + add_cnt.toString()) : ((add_cnt < 1000) ? ('0' + add_cnt.toString()) : add_cnt.toString()));
	var tmp_lic_id		= 'A' + login_id_root + login_id_tail;
	post_item			+= '&insert_flag=\'insert into license_info set license_id = "' + tmp_lic_id + '", company_type ="有限责任公司", exploition_method = "地下开采", issue_department = "山西省国土资源厅"\'';
	add_cnt++;

	update_lic_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
	update_lic_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	update_lic_xml_http.send(post_item);
}


function update_lic_info()
{
	var	check_cont	= document.getElementsByName('ch_change_name[]');
	var	post_item	= 'valid_proc=3';

	for	(var i = 0;	i <	check_cont.length; i++)
	{
		if (check_cont[i].checked && !check_cont[i].disabled)
		{
			var	license_id		= check_cont[i].value;
			var	txt_name_id		= 'id_txt_'	+ license_id;
			var	txt_name_corp	= 'corp_txt_' +	license_id;
			var	txt_name_loct	= 'loct_txt_' +	license_id;
			var	txt_name_mname	= 'mname_txt_' + license_id;
			var	txt_name_ctype	= 'ctype_txt_' + license_id;
			var	txt_name_mtype	= 'mtype_txt_' + license_id;
			var	txt_name_exmt	= 'exmt_txt_' +	license_id;
			var	txt_name_prod	= 'prod_txt_' +	license_id;
			var	txt_name_area	= 'area_txt_' +	license_id;
			var	txt_name_vdstrt	= 'vdstrt_txt_'	+ license_id;
			var	txt_name_vdend	= 'vdend_txt_' + license_id;
			var	txt_name_isid	= 'isid_txt_' +	license_id;
			var	txt_name_isdate	= 'isdate_txt_'	+ license_id;
			var	txt_name_isdept	= 'isdept_txt_'	+ license_id;
			var	txt_name_dpstrt	= 'dpstrt_txt_'	+ license_id;
			var	txt_name_dpend	= 'dpend_txt_' + license_id;

			var	txt_id			= document.getElementById(txt_name_id);
			var	txt_corp		= document.getElementById(txt_name_corp);
			var	txt_loct		= document.getElementById(txt_name_loct);
			var	txt_mname		= document.getElementById(txt_name_mname);
			var	txt_ctype		= document.getElementById(txt_name_ctype);
			var	txt_mtype		= document.getElementById(txt_name_mtype);
			var	txt_exmt		= document.getElementById(txt_name_exmt);
			var	txt_prod		= document.getElementById(txt_name_prod);
			var	txt_area		= document.getElementById(txt_name_area);
			var	txt_vdstrt		= document.getElementById(txt_name_vdstrt);
			var	txt_vdend		= document.getElementById(txt_name_vdend);
			var	txt_isid		= document.getElementById(txt_name_isid);
			var	txt_isdate		= document.getElementById(txt_name_isdate);
			var	txt_isdept		= document.getElementById(txt_name_isdept);
			var	txt_dpstrt		= document.getElementById(txt_name_dpstrt);
			var	txt_dpend		= document.getElementById(txt_name_dpend);

			txt_corp.value		= (txt_corp.value == "") ? 'UNKNOWN' : txt_corp.value;
			txt_loct.value		= (txt_loct.value == "") ? 'UNKNOWN' : txt_loct.value;
			txt_mname.value		= (txt_mname.value == "") ?	'UNKNOWN' :	txt_mname.value;
			txt_ctype.value		= (txt_ctype.value == "") ?	'UNKNOWN' :	txt_ctype.value;
			txt_mtype.value		= (txt_mtype.value == "") ?	'UNKNOWN' :	txt_mtype.value;
			txt_exmt.value		= (txt_exmt.value == "") ? 'UNKNOWN' : txt_exmt.value;
			txt_prod.value		= (txt_prod.value == "") ? 0 : txt_prod.value;
			txt_area.value		= (txt_area.value == "") ? 0 : txt_area.value;
			txt_vdstrt.value	= (txt_vdstrt.value	== "" || txt_vdstrt.value.length !=	10 || txt_vdstrt.value.indexOf('-')	!= 4 ||	txt_vdstrt.value.lastIndexOf('-') != 7)	? '0000-00-00' : txt_vdstrt.value;
			txt_vdend.value		= (txt_vdend.value == "" ||	txt_vdend.value.length != 10 ||	txt_vdend.value.indexOf('-') !=	4 || txt_vdend.value.lastIndexOf('-') != 7)	? '0000-00-00' : txt_vdend.value;
			txt_isid.value		= (txt_isid.value == "") ? '0000' :	txt_isid.value;
			txt_isdate.value	= (txt_isdate.value	== "" || txt_isdate.value.length !=	10 || txt_isdate.value.indexOf('-')	!= 4 ||	txt_isdate.value.lastIndexOf('-') != 7)	? '0000-00-00' : txt_isdate.value;
			txt_isdept.value	= (txt_isdept.value	== "") ? 'UNKNOWN' : txt_isdept.value;
			txt_dpstrt.value	= (txt_dpstrt.value	== "") ? 0 : txt_dpstrt.value;
			txt_dpend.value		= (txt_dpend.value == "") ?	0 :	txt_dpend.value;

			post_item		+= '&ch_lic_id[]=' + license_id;
			post_item		+= '&ch_new_lic_id[]=' + txt_id.value;

			post_item		+= '&ch_changed[]=\'update license_info	set	license_id = "'	+ txt_id.value +
							   '", mining_corporation =	"' + txt_corp.value	+
							   '", location	= "' + txt_loct.value +
							   '", mine_name = "' +	txt_mname.value	+
							   '", company_type	= "' + txt_ctype.value +
							   '", mine_type = "' +	txt_mtype.value	+
							   '", exploition_method = "' +	txt_exmt.value +
							   '", production =	' +	txt_prod.value +
							   ', site_area	= '	+ txt_area.value +
							   ', valid_date_start = "'	+ txt_vdstrt.value +
							   '", valid_date_end =	"' + txt_vdend.value +
							   '", issue_id	= "' + txt_isid.value +
							   '", issue_date =	"' + txt_isdate.value +
							   '", issue_department	= "' + txt_isdept.value	+
							   '", exploition_depth_start =	' +	txt_dpstrt.value +
							   ', exploition_depth_end = ' + txt_dpend.value +
							   ' where license_id =	"' + license_id	+ '"\'';
		}
	}

	if (post_item == 'valid_proc=3')
	{
		alert('No Information Updated!');
	}
	else
	{
		update_lic_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
		update_lic_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
		update_lic_xml_http.send(post_item);
	}
}


function del_lic_info()
{
	var	check_cont		= document.getElementsByName('ch_change_name[]');
	var checked_number	= 0;

	for	(var i = 0;	i <	check_cont.length; i++)
	{
		if (check_cont[i].checked && !check_cont[i].disabled)
		{
			checked_number++;
			break;
		}
	}

	if (checked_number != 0)
	{
		if(confirm('Are you sure to delete the seleted information?'))
		{
			var	post_item	= 'valid_proc=6';

			for	(var i = 0;	i <	check_cont.length; i++)
			{
				if (check_cont[i].checked && !check_cont[i].disabled)
				{
					var	license_id	= check_cont[i].value;
					post_item		+= '&license_ids[]=' + license_id.toString();
				}
			}

			if (post_item != 'valid_proc=6')
			{
				update_lic_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
				update_lic_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
				update_lic_xml_http.send(post_item);
			}
		}
	}
}


function reset_lic_info()
{
	var	post_items	= 'valid_proc=1';

	update_lic_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
	update_lic_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	update_lic_xml_http.send(post_items);
}

function logout_lic_info()
{
	if(confirm('Are you to sign out?'))
	{
		var	post_items		= 'valid_proc=10';

		sign_out_xml_http.open('POST', get_url("./mlms_server_operations.php"),	true);
		sign_out_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
		sign_out_xml_http.send(post_items);

		location.href='mining_license.html';
		//self.liction='mining_license.html';
	}
}


window.onload =	function()
{
	update_lic_xml_http						= create_xml_http_request();
	sign_out_xml_http						= create_xml_http_request();
	check_id_xml_http						= create_xml_http_request();
	get_coor_xml_http						= create_xml_http_request();
	update_lic_xml_http.onreadystatechange	= update_lic_response;
	check_id_xml_http.onreadystatechange	= check_lic_response;
	get_coor_xml_http.onreadystatechange	= get_coor_response;
	var	post_items							= 'valid_proc=1';
	var	login_time							= new Date();
	var	login_year							= '20' + login_time.getYear().toString();
	var	login_month							= login_time.getMonth();
	var	login_date							= (login_time.getDate()	< 10) ?	('0' + login_time.getDate().toString())	: login_time.getDate().toString();
	var	login_hour							= (login_time.getHours() < 10) ? ('0' +	login_time.getHours().toString()) :	login_time.getHours().toString();
	var	login_min							= (login_time.getMinutes() < 10) ? ('0'	+ login_time.getMinutes().toString()) :	login_time.getMinutes().toString();
	var	login_sec							= (login_time.getSeconds() < 10) ? ('0'	+ login_time.getSeconds().toString()) :	login_time.getSeconds().toString();
	login_id_root							= login_year + login_month + login_date	+ login_hour + login_min + login_sec;
	add_cnt									= 0;

	update_lic_xml_http.open('POST', get_url("./mlms_server_operations.php"), true);
	update_lic_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	update_lic_xml_http.send(post_items);
}