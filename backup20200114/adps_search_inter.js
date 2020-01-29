var search_info_xml_http;
var refresh_info_xml_http;
var get_user_type_xml_http;
var timeout_id          = -999;
var user_type           = 0;
var g_image_pair_table  = 0;
var g_start_page_idx    = 0;
var g_end_page_idx      = 0;
var g_res_per_page      = -1;

var PER_SEARCH              = 1;
var PER_VIEW_RESULT         = 2;
var PER_DL_RESULT           = 4;
var PER_PROC_PAIR           = 8;
var PER_PROC_FULL           = 16;
var PER_PRI_LOW             = 32;
var PER_PRI_HIGH            = 64;
var PER_DL_TABLE            = 128;
var PER_MAN_USER            = 256;
var PER_CANCEL_PROC         = 512;
var PER_CANCEL_OTHER_PROC   = 1024;
var PER_DL_GIS_RESULT       = 2048;
var PER_DL_ALL_RESULT       = 4096;
var PER_DL_ALL_GIS_RESULT   = 8192;


function create_xml_http_request()
{
    var xml_http_tmp;

	try
	{
		xml_http_tmp    = new XMLHttpRequest();
	}
	catch (ajaxEle)
	{
	 	try
	 	{
			xml_http_tmp    = new ActiveXObject("Msxml2.XMLHTTP");
	 	}
	 	catch (ajaxEle)
	 	{
			xml_http_tmp    = new ActiveXObject("Microsoft.XMLHTTP");
	 	}
	}

	return xml_http_tmp;
}

function draw_image_pair_list(list_to_draw, image_or_pair)
{
    var i, j, k;
    var list_html       = "";

    if (list_to_draw.nrows != 0)
    {
        if (list_to_draw.ncols == 1)
        {
            list_html   +=  '<div id="image_content_line">' +
                                '<div id="image_notify_title">' +
                                list_to_draw.names[0] +
                                '</div>' +
                            '</div>';
            list_html   +=  '<div id="image_content_line">' +
                                '<div id="image_notify_content">' +
                                list_to_draw.data[0][0] +
                                '</div>' +
                            '</div>';
        }
        else
        {
            g_image_pair_table  = list_to_draw;

            if (image_or_pair == 0)
            {
                if (user_type & PER_SEARCH)
                {
                    list_html   +=  '<div id="image_content_line">';
                    list_html   +=      '<div id="image_sel_title">' +
                                            '<input type="checkbox" id="ch_image_sel_all" name="ch_image_sel_all" class="small_check_box" value="0" onClick="image_sel_all()"/>' +
                                        '</div>';
                    list_html   +=      '<div id="image_sensor_title" onClick="sort_table_cols(\'image_sensor_title\', 0, 1)" onMouseOver="change_title_style(\'image_sensor_title\', 0, 1)" onMouseOut="change_title_style(\'image_sensor_title\', 1, 1)">' +
                                            list_to_draw.names[1] +
                                        '</div>';
                    list_html   +=      '<div id="image_date_title" onClick="sort_table_cols(\'image_date_title\', 0, 2)" onMouseOver="change_title_style(\'image_date_title\', 0, 2)" onMouseOut="change_title_style(\'image_date_title\', 1, 2)">' +
                                            list_to_draw.names[2] +
                                        '</div>';
                    list_html   +=      '<div id="image_track_title" onClick="sort_table_cols(\'image_track_title\', 0, 3)" onMouseOver="change_title_style(\'image_track_title\', 0, 3)" onMouseOut="change_title_style(\'image_track_title\', 1, 3)">' +
                                            list_to_draw.names[3] +
                                        '</div>';
                    list_html   +=      '<div id="image_frame_title" onClick="sort_table_cols(\'image_frame_title\', 0, 4)" onMouseOver="change_title_style(\'image_frame_title\', 0, 4)" onMouseOut="change_title_style(\'image_frame_title\', 1, 4)">' +
                                            list_to_draw.names[4] +
                                        '</div>';
                    list_html   +=      '<div id="image_heading_title" onClick="sort_table_cols(\'image_heading_title\', 0, 5)" onMouseOver="change_title_style(\'image_heading_title\', 0, 5)" onMouseOut="change_title_style(\'image_heading_title\', 1, 5)">' +
                                            list_to_draw.names[5] +
                                        '</div>';
                    list_html   +=      '<div id="image_polar_title" onClick="sort_table_cols(\'image_polar_title\', 0, 6)" onMouseOver="change_title_style(\'image_polar_title\', 0, 6)" onMouseOut="change_title_style(\'image_polar_title\', 1, 6)">' +
                                            list_to_draw.names[6] +
                                        '</div>';
                    list_html   +=      '<div id="image_lat_title" onClick="sort_table_cols(\'image_lat_title\', 0, 7)" onMouseOver="change_title_style(\'image_lat_title\', 0, 7)" onMouseOut="change_title_style(\'image_lat_title\', 1, 7)">' +
                                            list_to_draw.names[7] +
                                        '</div>';
                    list_html   +=      '<div id="image_lon_title" onClick="sort_table_cols(\'image_lon_title\', 0, 8)" onMouseOver="change_title_style(\'image_lon_title\', 0, 8)" onMouseOut="change_title_style(\'image_lon_title\', 1, 8)">' +
                                            list_to_draw.names[8] +
                                        '</div>';
                    list_html   +=      '<div id="image_angle_title" onClick="sort_table_cols(\'image_angle_title\', 0, 9)" onMouseOver="change_title_style(\'image_angle_title\', 0, 9)" onMouseOut="change_title_style(\'image_angle_title\', 1, 9)">' +
                                            list_to_draw.names[9] +
                                        '</div>';
                    list_html   +=      '<div id="image_prf_title" onClick="sort_table_cols(\'image_prf_title\', 0, 10)" onMouseOver="change_title_style(\'image_prf_title\', 0, 10)" onMouseOut="change_title_style(\'image_prf_title\', 1, 10)">' +
                                            list_to_draw.names[10] +
                                        '</div>';
                    list_html   +=      '<div id="image_rsr_title" onClick="sort_table_cols(\'image_rsr_title\', 0, 11)" onMouseOver="change_title_style(\'image_rsr_title\', 0, 11)" onMouseOut="change_title_style(\'image_rsr_title\', 1, 11)">' +
                                            list_to_draw.names[11] +
                                        '</div>';
                    list_html   +=  '</div>';

                    var image_per_page  = list_to_draw.nrows;

                    if (g_end_page_idx > 0 && g_end_page_idx < list_to_draw.nrows)
                    {
                        image_per_page  = g_end_page_idx;
                    }

                    for (i = g_start_page_idx; i < image_per_page; i++)
                    {
                        if (i % 2 == 0)
                        {
                            list_html   +=  '<div id="image_content_line">';
                            list_html   +=      '<div id="image_sel_even">' +
                                                    '<input type="checkbox" name="ch_image_sel[]" class="small_check_box" value="' +
                                                    list_to_draw.data[i][0] + '">' +
                                                '</div>';
                            list_html   +=      '<div id="image_sensor_even">' +
                                                    list_to_draw.data[i][1] +
                                                '</div>';
                            list_html   +=      '<div id="image_date_even">' +
                                                    list_to_draw.data[i][2] +
                                                '</div>';
                            list_html   +=      '<div id="image_track_even">' +
                                                    list_to_draw.data[i][3] +
                                                '</div>';
                            list_html   +=      '<div id="image_frame_even">' +
                                                    list_to_draw.data[i][4] +
                                                '</div>';
                            list_html   +=      '<div id="image_heading_even">' +
                                                    list_to_draw.data[i][5] +
                                                '</div>';
                            list_html   +=      '<div id="image_polar_even">' +
                                                    list_to_draw.data[i][6] +
                                                '</div>';
                            list_html   +=      '<div id="image_lat_even">' +
                                                    list_to_draw.data[i][7] +
                                                '</div>';
                            list_html   +=      '<div id="image_lon_even">' +
                                                    list_to_draw.data[i][8] +
                                                '</div>';
                            list_html   +=      '<div id="image_angle_even">' +
                                                    list_to_draw.data[i][9] +
                                                '</div>';
                            list_html   +=      '<div id="image_prf_even">' +
                                                    list_to_draw.data[i][10] +
                                                '</div>';
                            list_html   +=      '<div id="image_rsr_even">' +
                                                    list_to_draw.data[i][11] +
                                                '</div>';
                            list_html   +=  '</div>';
                        }
                        else
                        {
                            list_html   +=  '<div id="image_content_line">';
                            list_html   +=      '<div id="image_sel_odd">' +
                                                    '<input type="checkbox" name="ch_image_sel[]" class="small_check_box" value="' +
                                                    list_to_draw.data[i][0] + '">' +
                                                '</div>';
                            list_html   +=      '<div id="image_sensor_odd">' +
                                                    list_to_draw.data[i][1] +
                                                '</div>';
                            list_html   +=      '<div id="image_date_odd">' +
                                                    list_to_draw.data[i][2] +
                                                '</div>';
                            list_html   +=      '<div id="image_track_odd">' +
                                                    list_to_draw.data[i][3] +
                                                '</div>';
                            list_html   +=      '<div id="image_frame_odd">' +
                                                    list_to_draw.data[i][4] +
                                                '</div>';
                            list_html   +=      '<div id="image_heading_odd">' +
                                                    list_to_draw.data[i][5] +
                                                '</div>';
                            list_html   +=      '<div id="image_polar_odd">' +
                                                    list_to_draw.data[i][6] +
                                                '</div>';
                            list_html   +=      '<div id="image_lat_odd">' +
                                                    list_to_draw.data[i][7] +
                                                '</div>';
                            list_html   +=      '<div id="image_lon_odd">' +
                                                    list_to_draw.data[i][8] +
                                                '</div>';
                            list_html   +=      '<div id="image_angle_odd">' +
                                                    list_to_draw.data[i][9] +
                                                '</div>';
                            list_html   +=      '<div id="image_prf_odd">' +
                                                    list_to_draw.data[i][10] +
                                                '</div>';
                            list_html   +=      '<div id="image_rsr_odd">' +
                                                    list_to_draw.data[i][11] +
                                                '</div>';
                            list_html   +=  '</div>';
                        }
                    }

                    if (g_end_page_idx > 0)
                    {
                        if (g_start_page_idx > 0)
                        {
                            if (g_end_page_idx < list_to_draw.nrows)
                            {
                                var end_page_idx    = g_end_page_idx;
				list_html 	    += '<tr><th colspan="8"><br/><hr width="100%"></th><tr>';
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      '<a href="#" onclick="turn_res_page(0, ' + image_or_pair + ')"><< Previous Page</a> Results: ' +
                                                            (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1 +
                                                            ' <a href="#" onclick="turn_res_page(1, ' + image_or_pair + ')">>> Next Page</a>';
                                list_html           +=  '</div>';
                            }
                            else
                            {
                                var end_page_idx    = list_to_draw.nrows;
				list_html 	    += '<tr><th colspan="8"><br/><hr width="100%"></th><tr>';
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      '<a href="#" onclick="turn_res_page(0, ' + image_or_pair + ')"><< Previous Page</a> Results: ' + (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1;
                                list_html           +=  '</div>';
                            }
                        }
                        else
                        {
                            if (g_end_page_idx < list_to_draw.nrows)
                            {
                                var end_page_idx    = g_end_page_idx;
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      'Results: ' + (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1 +
                                                            ' <a href="#" onclick="turn_res_page(1, ' + image_or_pair + ')">>> Next Page</a>';
                                list_html           +=  '</div>';
                            }
                            else
                            {
                                var end_page_idx    = list_to_draw.nrows;
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      'Results: ' + (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1;
                                list_html           +=  '</div>';
                            }
                        }
                    }
                }
            }
            else
            {
                if (user_type & PER_SEARCH)
                {
                    list_html   +=  '<div id="image_content_line">';

                    if (user_type & (PER_PROC_PAIR | PER_PROC_FULL | PER_CANCEL_PROC | PER_CANCEL_OTHER_PROC | PER_DL_TABLE))
                    {
                        list_html   +=      '<div id="image_sel_title">' +
                                                '<input type="checkbox" id="ch_pair_sel_all" name="ch_pair_sel_all" class="small_check_box" value="0" onClick="pair_sel_all()"/>' +
                                            '</div>';
                    }

                    list_html   +=      '<div id="pair_status_title"  onClick="sort_table_cols(\'pair_status_title\', 1, 1)" onMouseOver="change_title_style(\'pair_status_title\', 0, 1)" onMouseOut="change_title_style(\'pair_status_title\', 1, 1)">' +
                                            list_to_draw.names[1] +
                                        '</div>';
                    list_html   +=      '<div id="pair_btemp_title" onClick="sort_table_cols(\'pair_btemp_title\', 1, 2)" onMouseOver="change_title_style(\'pair_btemp_title\', 0, 2)" onMouseOut="change_title_style(\'pair_btemp_title\', 1, 2)">' +
                                            list_to_draw.names[2] +
                                        '</div>';
                    list_html   +=      '<div id="pair_bperp_title" onClick="sort_table_cols(\'pair_bperp_title\', 1, 3)" onMouseOver="change_title_style(\'pair_bperp_title\', 0, 3)" onMouseOut="change_title_style(\'pair_bperp_title\', 1, 3)">' +
                                            list_to_draw.names[3] +
                                        '</div>';
                    list_html   +=      '<div id="pair_sensor_title" onClick="sort_table_cols(\'pair_sensor_title\', 1, 4)" onMouseOver="change_title_style(\'pair_sensor_title\', 0, 4)" onMouseOut="change_title_style(\'pair_sensor_title\', 1, 4)">' +
                                            list_to_draw.names[4] +
                                        '</div>';
                    list_html   +=      '<div id="pair_mdate_title" onClick="sort_table_cols(\'pair_mdate_title\', 1, 5)" onMouseOver="change_title_style(\'pair_mdate_title\', 0, 5)" onMouseOut="change_title_style(\'pair_mdate_title\', 1, 5)">' +
                                            list_to_draw.names[5] +
                                        '</div>';
                    list_html   +=      '<div id="pair_sdate_title" onClick="sort_table_cols(\'pair_sdate_title\', 1, 6)" onMouseOver="change_title_style(\'pair_sdate_title\', 0, 6)" onMouseOut="change_title_style(\'pair_sdate_title\', 1, 6)">' +
                                            list_to_draw.names[6] +
                                        '</div>';
                    list_html   +=      '<div id="pair_track_title" onClick="sort_table_cols(\'pair_track_title\', 1, 7)" onMouseOver="change_title_style(\'pair_track_title\', 0, 7)" onMouseOut="change_title_style(\'pair_track_title\', 1, 7)">' +
                                            list_to_draw.names[7] +
                                        '</div>';
                    list_html   +=      '<div id="pair_mframe_title" onClick="sort_table_cols(\'pair_mframe_title\', 1, 8)" onMouseOver="change_title_style(\'pair_mframe_title\', 0, 8)" onMouseOut="change_title_style(\'pair_mframe_title\', 1, 8)">' +
                                            list_to_draw.names[8] +
                                        '</div>';
                    list_html   +=      '<div id="pair_sframe_title" onClick="sort_table_cols(\'pair_sframe_title\', 1, 9)" onMouseOver="change_title_style(\'pair_sframe_title\', 0, 9)" onMouseOut="change_title_style(\'pair_sframe_title\', 1, 9)">' +
                                            list_to_draw.names[9] +
                                        '</div>';
                    list_html   +=      '<div id="pair_heading_title" onClick="sort_table_cols(\'pair_heading_title\', 1, 10)" onMouseOver="change_title_style(\'pair_heading_title\', 0, 10)" onMouseOut="change_title_style(\'pair_heading_title\', 1, 10)">' +
                                            list_to_draw.names[10] +
                                        '</div>';
                    list_html   +=      '<div id="pair_polar_title" onClick="sort_table_cols(\'pair_polar_title\', 1, 11)" onMouseOver="change_title_style(\'pair_polar_title\', 0, 11)" onMouseOut="change_title_style(\'pair_polar_title\', 1, 11)">' +
                                            list_to_draw.names[11] +
                                        '</div>';
                    list_html   +=      '<div id="pair_lat_title" onClick="sort_table_cols(\'pair_lat_title\', 1, 12)" onMouseOver="change_title_style(\'pair_lat_title\', 0, 12)" onMouseOut="change_title_style(\'pair_lat_title\', 1, 12)">' +
                                            list_to_draw.names[12] +
                                        '</div>';
                    list_html   +=      '<div id="pair_lon_title" onClick="sort_table_cols(\'pair_lon_title\', 1, 13)" onMouseOver="change_title_style(\'pair_lon_title\', 0, 13)" onMouseOut="change_title_style(\'pair_lon_title\', 1, 13)">' +
                                            list_to_draw.names[13] +
                                        '</div>';
                    list_html   +=      '<div id="pair_angle_title" onClick="sort_table_cols(\'pair_angle_title\', 1, 14)" onMouseOver="change_title_style(\'pair_angle_title\', 0, 14)" onMouseOut="change_title_style(\'pair_angle_title\', 1, 14)">' +
                                            list_to_draw.names[14] +
                                        '</div>';
                    list_html   +=      '<div id="pair_rsr_title" onClick="sort_table_cols(\'pair_rsr_title\', 1, 15)" onMouseOver="change_title_style(\'pair_rsr_title\', 0, 15)" onMouseOut="change_title_style(\'pair_rsr_title\', 1, 15)">' +
                                            list_to_draw.names[15] +
                                        '</div>';
                    list_html   +=  '</div>';

                    var status_icon;

                    var pair_per_page   = list_to_draw.nrows;

                    if (g_end_page_idx > 0 && g_end_page_idx < list_to_draw.nrows)
                    {
                        pair_per_page   = g_end_page_idx;
                    }

                    for (i = g_start_page_idx; i < pair_per_page; i++)
                    {
                        var image_str   = convert_status(list_to_draw.data[i][1], list_to_draw.data[i][16], list_to_draw.data[i][0], list_to_draw.data[i][7], list_to_draw.data[i][4]);

                        if (i % 2 == 0)
                        {
                            list_html   +=  '<div id="image_content_line">';

                            if (user_type & (PER_PROC_PAIR | PER_PROC_FULL | PER_CANCEL_PROC | PER_CANCEL_OTHER_PROC | PER_DL_TABLE))
                            {
                                list_html   +=      '<div id="image_sel_even">' +
                                                        '<input type="checkbox" name="ch_pair_sel[]" class="small_check_box" value="' +
                                                        list_to_draw.data[i][0] + '">' +
                                                    '</div>';
                            }

                            list_html   +=      '<div id="pair_status_even"><div id="pair_status_icon_' + list_to_draw.data[i][0] + '">' +
                                                    image_str +
                                                '</div></div>';
                            list_html   +=      '<div id="pair_btemp_even">' +
                                                    list_to_draw.data[i][2] +
                                                '</div>';
                            list_html   +=      '<div id="pair_bperp_even">' +
                                                    Math.abs(list_to_draw.data[i][3]) +
                                                '</div>';
                            list_html   +=      '<div id="pair_sensor_even">' +
                                                    list_to_draw.data[i][4] +
                                                '</div>';
                            list_html   +=      '<div id="pair_mdate_even">' +
                                                    list_to_draw.data[i][5] +
                                                '</div>';
                            list_html   +=      '<div id="pair_sdate_even">' +
                                                    list_to_draw.data[i][6] +
                                                '</div>';
                            list_html   +=      '<div id="pair_track_even">' +
                                                    list_to_draw.data[i][7] +
                                                '</div>';
                            list_html   +=      '<div id="pair_mframe_even">' +
                                                    list_to_draw.data[i][8] +
                                                '</div>';
                            list_html   +=      '<div id="pair_sframe_even">' +
                                                    list_to_draw.data[i][9] +
                                                '</div>';
                            list_html   +=      '<div id="pair_heading_even">' +
                                                    list_to_draw.data[i][10] +
                                                '</div>';
                            list_html   +=      '<div id="pair_polar_even">' +
                                                    list_to_draw.data[i][11] +
                                                '</div>';
                            list_html   +=      '<div id="pair_lat_even">' +
                                                    list_to_draw.data[i][12] +
                                                '</div>';
                            list_html   +=      '<div id="pair_lon_even">' +
                                                    list_to_draw.data[i][13] +
                                                '</div>';
                            list_html   +=      '<div id="pair_angle_even">' +
                                                    list_to_draw.data[i][14] +
                                                '</div>';
                            list_html   +=      '<div id="pair_rsr_even">' +
                                                    list_to_draw.data[i][15] +
                                                '</div>';
                            list_html   +=  '</div>';
                        }
                        else
                        {
                            list_html   +=  '<div id="image_content_line">';

                            if (user_type & (PER_PROC_PAIR | PER_PROC_FULL | PER_CANCEL_PROC | PER_CANCEL_OTHER_PROC | PER_DL_TABLE))
                            {
                                list_html   +=      '<div id="image_sel_odd">' +
                                                        '<input type="checkbox" name="ch_pair_sel[]" class="small_check_box" value="' +
                                                        list_to_draw.data[i][0] + '">' +
                                                    '</div>';
                            }

                            list_html   +=      '<div id="pair_status_odd"><div id="pair_status_icon_' + list_to_draw.data[i][0] + '">' +
                                                    image_str +
                                                '</div></div>';
                            list_html   +=      '<div id="pair_btemp_odd">' +
                                                    list_to_draw.data[i][2] +
                                                '</div>';
                            list_html   +=      '<div id="pair_bperp_odd">' +
                                                    Math.abs(list_to_draw.data[i][3]) +
                                                '</div>';
                            list_html   +=      '<div id="pair_sensor_odd">' +
                                                    list_to_draw.data[i][4] +
                                                '</div>';
                            list_html   +=      '<div id="pair_mdate_odd">' +
                                                    list_to_draw.data[i][5] +
                                                '</div>';
                            list_html   +=      '<div id="pair_sdate_odd">' +
                                                    list_to_draw.data[i][6] +
                                                '</div>';
                            list_html   +=      '<div id="pair_track_odd">' +
                                                    list_to_draw.data[i][7] +
                                                '</div>';
                            list_html   +=      '<div id="pair_mframe_odd">' +
                                                    list_to_draw.data[i][8] +
                                                '</div>';
                            list_html   +=      '<div id="pair_sframe_odd">' +
                                                    list_to_draw.data[i][9] +
                                                '</div>';
                            list_html   +=      '<div id="pair_heading_odd">' +
                                                    list_to_draw.data[i][10] +
                                                '</div>';
                            list_html   +=      '<div id="pair_polar_odd">' +
                                                    list_to_draw.data[i][11] +
                                                '</div>';
                            list_html   +=      '<div id="pair_lat_odd">' +
                                                    list_to_draw.data[i][12] +
                                                '</div>';
                            list_html   +=      '<div id="pair_lon_odd">' +
                                                    list_to_draw.data[i][13] +
                                                '</div>';
                            list_html   +=      '<div id="pair_angle_odd">' +
                                                    list_to_draw.data[i][14] +
                                                '</div>';
                            list_html   +=      '<div id="pair_rsr_odd">' +
                                                    list_to_draw.data[i][15] +
                                                '</div>';
                            list_html   +=  '</div>';
                        }
                    }

                    if (g_end_page_idx > 0)
                    {
                        if (g_start_page_idx > 0)
                        {
                            if (g_end_page_idx < list_to_draw.nrows)
                            {
                                var end_page_idx    = g_end_page_idx;
				list_html 	    += '<tr><th colspan="8"><br/><hr width="100%"></th><tr>';
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      '<a href="#" onclick="turn_res_page(0, ' + image_or_pair + ')"><< Previous Page</a> Results: ' +
                                                            (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1 +
                                                            ' <a href="#" onclick="turn_res_page(1, ' + image_or_pair + ')">>> Next Page</a>';
                                list_html           +=  '</div>';
                            }
                            else
                            {
                                var end_page_idx    = list_to_draw.nrows;
				list_html 	    += '<tr><th colspan="8"><br/><hr width="100%"></th><tr>';
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      '<a href="#" onclick="turn_res_page(0, ' + image_or_pair + ')"><< Previous Page</a> Results: ' + (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1;
                                list_html           +=  '</div>';
                            }
                        }
                        else
                        {
                            if (g_end_page_idx < list_to_draw.nrows)
                            {
                                var end_page_idx    = g_end_page_idx;
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      'Results: ' + (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1 +
                                                            ' <a href="#" onclick="turn_res_page(1, ' + image_or_pair + ')">>> Next Page</a>';
                                list_html           +=  '</div>';
                            }
                            else
                            {
                                var end_page_idx    = list_to_draw.nrows;
                                list_html           +=  '<div id="image_content_line">';
                                list_html           +=      'Results: ' + (g_start_page_idx * 1 + 1) + ' - ' + end_page_idx * 1;
                                list_html           +=  '</div>';
                            }
                        }
                    }
                }
            }
        }

        var content_web         = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementById('content_frame');
        content_web.innerHTML   = list_html;
    }
}

function get_url(str)
{
	return str + "?t="+((new Date()).valueOf());
}

function chk_num_val(str)
{
    var num_str = '1234567890';

    if (str == '')
    {
        return -1;
    }

    for (var i = 0; i < str.length; i++)
    {
        var str_sub = str.substring(i, 1);

        if (num_str.indexOf(str_sub) == -1)
        {
            return -1;
        }
    }

    return str;
}

function convert_status(status_id, result_path, pair_id, track_num, sensor_name)
{
    var image_str;

    switch(status_id)
    {
        case '0':
            image_str   = '<img src="images/none.png" width="14" height="14"/>';
        break;

        case '1':
            image_str   = '<img src="images/todo.png" width="14" height="14"/>';
        break;

        case '2':
            image_str   = '<img src="images/table-status-loading.gif" width="14" height="14"/>';
        break;

        case '3':

            if (user_type & (PER_VIEW_RESULT | PER_DL_RESULT | PER_PROC_PAIR | PER_PROC_FULL))
            {
                image_str   = '<a href="adps_show_results.php?sensor_name=' + sensor_name + '&track_num=' + track_num + '&pair_to_show=' + result_path + '" target="_blank"><img src="images/finish.png" width="14" height="14" border=0/></a>';
            }
            else
            {
                image_str   = '<img src="images/finish.png" width="14" height="14" border=0/>';
            }

        break;

        case '4':
            image_str   = '<img src="images/fail.png" width="14" height="14"/>';
        break;

        default:
            image_str   = '<img src="images/fail.png" width="14" height="14"/>';
        break;
    }

    return image_str;
}

function image_pair_table(response_xml)
{
    var i, j;
    var infor_records   = response_xml.getElementsByTagName('Record');
	var first_property  = infor_records[0].getElementsByTagName('Property');
	this.nrows          = infor_records.length;
	this.ncols          = first_property.length;
	this.data           = new Array(this.nrows);
	this.names          = new Array(this.ncols);

	for(j = 0; j < this.ncols; j++)
	{
		this.names[j]   = first_property[j].getAttribute("name");
	}

	for(i = 0; i < this.nrows; i++)
	{
		this.data[i]    = new Array(this.ncols);
	}

	for(i = 0; i < infor_records.length; i++)
	{
		var property    = infor_records[i].getElementsByTagName('Property');

		for(j = 0; j < first_property.length; j++)
		{
			this.data[i][j] = property[j].firstChild.nodeValue;
		}
	}
}


function search_image_response()
{
    var image_list;

    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200 && search_info_xml_http.responseXML)
    {
        //alert(search_info_xml_http.responseText);

        image_list          = new image_pair_table(search_info_xml_http.responseXML);

        draw_image_pair_list(image_list, 0);

        var search_status   = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');

        if (image_list.ncols <= 1)
        {
            search_status.innerHTML = '<img src="images/fail.png" width="16" height="16"/> Searched Results: 0';
        }
        else
        {
            search_status.innerHTML = '<img src="images/finish.png" width="16" height="16"/> Searched Results: ' + image_list.nrows;

            if(timeout_id != -999)
        	{
        		clearTimeout(timeout_id);
        		timeout_id  = -999;
        	}
        }
    }
}

function search_pair_response()
{
    var image_list;

    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200)// && search_info_xml_http.responseXML)
    {
        //alert(search_info_xml_http.responseText);

        image_list  = new image_pair_table(search_info_xml_http.responseXML);

        draw_image_pair_list(image_list, 1);

        var search_status       = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');

        if (image_list.ncols <= 1)
        {
            search_status.innerHTML = '<img src="images/fail.png" width="16" height="16"/> Searched Results: 0';
        }
        else
        {
            search_status.innerHTML = '<img src="images/finish.png" width="16" height="16"/> Searched Results: ' + image_list.nrows;

            if(timeout_id != -999)
        	{
        		clearTimeout(timeout_id);
        		timeout_id  = -999;
        	}

            refresh_pair_info();
        }
    }
}

function show_pair_on_image_response()
{
    var image_list;

    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200 && search_info_xml_http.responseXML)
    {
        image_list  = new image_pair_table(search_info_xml_http.responseXML);

        draw_image_pair_list(image_list, 1);

        var search_status       = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
        var image_pair_sel      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('rad_image_pair[]');

        if (image_list.ncols <= 1)
        {
            search_status.innerHTML = '<img src="images/fail.png" width="16" height="16"/> Searched Results: 0';
        }
        else
        {
            image_pair_sel[1].checked   = true;
            search_status.innerHTML     = '<img src="images/finish.png" width="16" height="16"/> Searched Results: ' + image_list.nrows;

            change_operations(1);

            if(timeout_id != -999)
        	{
        		clearTimeout(timeout_id);
        		timeout_id  = -999;
        	}

            refresh_pair_info();
        }
    }
}

function proc_pair_response()
{
    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200)
    {

        //alert(search_info_xml_http.responseText);

        if (search_info_xml_http.responseText == 'ok')
        {
            var proc_status         = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
            proc_status.innerHTML   = 'Processing Selected Pairs: <img src="images/finish.png" width="16" height="16"/>';

            if(timeout_id != -999)
        	{
        		clearTimeout(timeout_id);
        		timeout_id  = -999;
        	}

            refresh_pair_info();
        }
        else
        {
            var proc_status         = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
            proc_status.innerHTML   = 'Processing Selected Pairs: <img src="images/fail.png" width="16" height="16"/>';
            alert(search_info_xml_http.responseText);
        }
    }
}

function refresh_pair_response()
{
    if (refresh_info_xml_http.readyState == 4 && refresh_info_xml_http.status == 200 && refresh_info_xml_http.responseXML)
    {
        pair_status_list    = new image_pair_table(refresh_info_xml_http.responseXML);

        for (var i = 0; i < pair_status_list.nrows; i++)
        {
            var status_icon_id      = 'pair_status_icon_' + pair_status_list.data[i][0];
            var status_icon         = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementById(status_icon_id);
            var image_str           = convert_status(pair_status_list.data[i][1], pair_status_list.data[i][2], pair_status_list.data[i][0], pair_status_list.data[i][3], pair_status_list.data[i][4]);
            status_icon.innerHTML   = image_str;
        }
    }
}

function cancel_proc_response()
{
    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200)
    {
        if (search_info_xml_http.responseText == 'ok')
        {
            var proc_status         = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
            proc_status.innerHTML   = 'Selected Pairs Cancelled: <img src="images/finish.png" width="16" height="16"/>';

            if(timeout_id != -999)
        	{
        		clearTimeout(timeout_id);
        		timeout_id  = -999;
        	}

            refresh_pair_info();
        }
        else
        {
            var proc_status         = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
            proc_status.innerHTML   = 'Cancellation Error: <img src="images/failed.png" width="16" height="16"/>';

            alert(search_info_xml_http.responseText);
        }
    }
}

function get_user_type_response()
{
    if (get_user_type_xml_http.readyState == 4 && get_user_type_xml_http.status == 200)
    {
        if (get_user_type_xml_http.responseText != 'error' && get_user_type_xml_http.responseText != 'Login Error')
        {
            user_type   = get_user_type_xml_http.responseText;
        }
        else
        {
            alert('There is something wrong when user logged in. Please try to sign in again!');
        }
    }
}


function proc_psi_response()
{
    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200)
    {
        if (search_info_xml_http.responseText != 'error')
        {
        	alert(search_info_xml_http.responseText);
        }
        else
        {
            alert('There is something wrong when starting PSI processes!');
        }
    }
}


function sel_psi_mst_response()
{
    if (search_info_xml_http.readyState == 4 && search_info_xml_http.status == 200)
    {
        if (search_info_xml_http.responseText != 'error')
        {/*

	        var content_web			= top.frames['parent_interface_frame'].frames['main_frame'].document.getElementById('content_frame');
	        var list_html			= content_web.innerHTML;
	        content_web.innerHTML	= search_info_xml_http.responseText;*/

	        var dl_table_addr  = 'psi/bsl.csv';
	        window.open(dl_table_addr);
        	var mst_date			= prompt('Please type in the acquisition date of the master.');
        	var post_items			= 'valid_proc=15';

        	if (mst_date == null || mst_date.length != 8)
        	{
        		post_items	+= '&acq_date=0';
        	}
        	else
        	{
        		post_items	+= '&acq_date=' + mst_date;
        	}

    		search_info_xml_http.onreadystatechange = proc_psi_response;

		    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
		    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
		    search_info_xml_http.send(post_items);

        	//content_web.innerHTML	= list_html;
        }
        else
        {
            alert('There is something wrong when starting PSI processes!');
        }
    }
}


function change_btn_style(btn_id, style_type)
{
    var select_btn  = document.getElementById(btn_id);

    if (style_type == 0)
    {
        select_btn.className    = 'small_orange_btn';
    }
    else if (style_type == 1)
    {
        select_btn.className    = 'small_yellow_btn';
    }
    else if (style_type == 2)
    {
        select_btn.className    = 'big_orange_btn';
    }
    else
    {
        select_btn.className    = 'big_yellow_btn';
    }
}

function change_operations(select_operation)
{
    var operation_pannel        = document.getElementById('pannel_operation_button');
    operation_pannel.innerHTML  = '';

    if (select_operation == 0)
    {
        if (user_type & PER_SEARCH)
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                                      +
                '    <input type="button" name="btn_search_img" id="btn_search_img" value="Search Images" class="big_orange_btn"'       +
                '        onMouseOver="change_btn_style(\'btn_search_img\', 3)" onMouseOut="change_btn_style(\'btn_search_img\', 2)"'    +
                '        onClick="submit_search_condi(0)"/>'                                                                            +
                '</div>'                                                                                                                +
                '<div id="pannel_content_center">'                                                                                      +
                '    <input type="button" name="btn_show_pair" id="btn_show_pair" value="Show Pairs" class="big_orange_btn"'            +
                '        onMouseOver="change_btn_style(\'btn_show_pair\', 3)" onMouseOut="change_btn_style(\'btn_show_pair\', 2)"'      +
                '        onClick="submit_pair_on_image_condi()"/>'                                                                      +
                '</div>';

            if (user_type & PER_DL_TABLE)
            {
                operation_pannel.innerHTML  +=
                    '<div id="pannel_content_center">'                                                                                              +
                    '    <input type="button" name="btn_dl_img_table" id="btn_dl_img_table" value="Download Image Table" class="big_orange_btn"'    +
                    '        onMouseOver="change_btn_style(\'btn_dl_img_table\', 3)" onMouseOut="change_btn_style(\'btn_dl_img_table\', 2)"'        +
                    '        onClick="dl_table_info(0)"/>'                                                                                           +
                    '</div>';
            }

            if (user_type & (PER_PROC_PAIR | PER_PROC_FULL))
            {
                operation_pannel.innerHTML  +=
                    '<div id="pannel_content_center">'                                                                                              +
                    '    <input type="button" name="btn_psi_proc" id="btn_psi_proc" value="Process PSI" class="big_orange_btn"'    +
                    '        onMouseOver="change_btn_style(\'btn_psi_proc\', 3)" onMouseOut="change_btn_style(\'btn_psi_proc\', 2)"'        +
                    '        onClick="sel_psi_img(0)"/>'                                                                                           +
                    '</div>';
            }

            operation_pannel.innerHTML  +=
                '<div id="pannel_content_title">'   +
                '    Operations'                    +
                '</div>';
        }
    }
    else
    {
        if (user_type & PER_SEARCH)
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                              +
                '    <input type="button" name="btn_search" id="btn_search" value="Search Pairs" class="big_orange_btn"'        +
                '        onMouseOver="change_btn_style(\'btn_search\', 3)" onMouseOut="change_btn_style(\'btn_search\', 2)"'    +
                '        onClick="submit_search_condi(1)"/>' +
                '</div>';
        }

        if (user_type & (PER_PROC_PAIR | PER_PROC_FULL))
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                              +
                '    <input type="button" name="btn_process" id="btn_process" value="Add to Process" class="big_orange_btn"'    +
                '        onMouseOver="change_btn_style(\'btn_process\', 3)" onMouseOut="change_btn_style(\'btn_process\', 2)"'  +
                '        onClick="add_to_process(0)"/>' +
                '</div>';
        }

        if (user_type & (PER_CANCEL_PROC | PER_CANCEL_OTHER_PROC))
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                              +
                '    <input type="button" name="btn_cancel" id="btn_cancel" value="Cancel Processing" class="big_orange_btn"'   +
                '        onMouseOver="change_btn_style(\'btn_cancel\', 3)" onMouseOut="change_btn_style(\'btn_cancel\', 2)"'    +
                '        onClick="cancel_processes()"/>' +
                '</div>';
        }

        if (user_type & PER_PROC_FULL)
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                                              +
                '<input type="button" name="btn_full_process" id="btn_full_process" value="Process Full Resol Results" class="big_orange_btn"'  +
                '    onMouseOver="change_btn_style(\'btn_full_process\', 3)" onMouseOut="change_btn_style(\'btn_full_process\', 2)"'            +
                '    onClick="add_to_process(1)"/>'                                                                                             +
                '</div>';
        }

        if (user_type & PER_DL_ALL_RESULT)
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                                  +
                '<input type="button" name="btn_dl_all_res" id="btn_dl_all_res" value="Get Results Packet" class="big_orange_btn"'  +
                '    onMouseOver="change_btn_style(\'btn_dl_all_res\', 3)" onMouseOut="change_btn_style(\'btn_dl_all_res\', 2)"'    +
                '    onClick="dl_all_sel_img()"/>'                                                                                  +
                '</div>';
        }

        if (user_type & PER_DL_ALL_GIS_RESULT)
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                                  +
                '<input type="button" name="btn_dl_all_gis" id="btn_dl_all_gis" value="Get GIS Info Packet" class="big_orange_btn"' +
                '    onMouseOver="change_btn_style(\'btn_dl_all_gis\', 3)" onMouseOut="change_btn_style(\'btn_dl_all_gis\', 2)"'    +
                '    onClick="dl_all_sel_gis()"/>'                                                                                  +
                '</div>';
        }

        if (user_type & PER_DL_TABLE)
        {
            operation_pannel.innerHTML  +=
                '<div id="pannel_content_center">'                                                                                              +
                '    <input type="button" name="btn_dl_pair_table" id="btn_dl_pair_table" value="Download Pair Table" class="big_orange_btn"'   +
                '        onMouseOver="change_btn_style(\'btn_dl_pair_table\', 3)" onMouseOut="change_btn_style(\'btn_dl_pair_table\', 2)"'      +
                '        onClick="dl_table_info(1)"/>'                                                                                           +
                '</div>';

        }

        operation_pannel.innerHTML  +=
            '<div id="pannel_content_title">'   +
            '    Operations'                    +
            '</div>';
    }
}

function add_to_process(nor_or_full)
{
    var win_width;
    var win_height;
    var i;
    var pair_sel_amt    = 0;
    var pair_sel        = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');

    if (pair_sel.length == 0)
    {
        return;
    }

    for (i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            pair_sel_amt++;
        }
    }

    if (pair_sel_amt == 0)
    {
        return;
    }

    if (window.ActiveXObject)
    {
        win_width   = top.document.documentElement.clientWidth - top.document.documentElement.scrollLeft;
        win_height  = top.document.documentElement.clientHeight - top.document.documentElement.scrollTop;
    }
    else
    {
        win_width   = top.document.documentElement.clientWidth - top.window.pageXOffset;
        win_height  = top.document.documentElement.clientHeight - top.window.pageYOffset;
    }

    var para_frame              = top.document.getElementById('proc_para_frame');
    para_frame.style.position   = 'absolute';
    para_frame.style.visibility = 'visible';

    if (win_width / 2 - 150 >= 0)
    {
        para_frame.style.left   = win_width / 2 - 150 + 'px';
    }
    else
    {
        para_frame.style.left   = win_width / 2 + 'px';
    }

    if (win_height / 2 - 200 >= 0)
    {
        para_frame.style.top    = win_height / 2 - 200 + 'px';
    }
    else
    {
        para_frame.style.top    = win_height / 2 + 'px';
    }

    var nor_or_full_cont    = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_nor_or_full');
    var fft_option_ch       = top.frames['proc_dialog_frame'].document.getElementsByName('rad_fft_proc[]');
    var dem_option_ch       = top.frames['proc_dialog_frame'].document.getElementsByName('rad_dem_proc[]');

    if (nor_or_full == 0)
    {
        nor_or_full_cont.value  = '0';

        for (i = 0; i < fft_option_ch.length; i++)
        {
            fft_option_ch[i].disabled  = false;
        }

        for (i = 0; i < dem_option_ch.length; i++)
        {
            dem_option_ch[i].disabled  = false;
        }
    }
    else
    {
        nor_or_full_cont.value  = '1';

        for (i = 0; i < fft_option_ch.length; i++)
        {
            fft_option_ch[i].disabled  = true;
        }

        for (i = 0; i < dem_option_ch.length; i++)
        {
            dem_option_ch[i].disabled  = true;
        }
    }
}

function proc_para_sub()
{
    change_btn_style('btn_proc_yes', 0);

    var nor_or_full_cont        = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_nor_or_full');
    var para_frame              = top.document.getElementById('proc_para_frame');
    para_frame.style.visibility = 'hidden';
    var pair_sel                = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');
    var post_items;

    if (nor_or_full_cont.value == '0')
    {
        post_items              = 'valid_proc=3';
    }
    else
    {
        post_items              = 'valid_proc=10';
    }

    if (pair_sel.length == 0)
    {
        return;
    }

    for (i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            post_items  += '&ch_pair_sel[]=' + pair_sel[i].value;
        }
    }

    if (post_items == 'valid_proc=3')
    {
        return;
    }

    var fft_sel     = top.frames['proc_dialog_frame'].document.getElementsByName('rad_fft_proc[]');
    var dem_sel     = top.frames['proc_dialog_frame'].document.getElementsByName('rad_dem_proc[]');
    var pri_sel     = top.frames['proc_dialog_frame'].document.getElementsByName('rad_proc_pri[]');
    var fft_sel_amt = 0;
    var dem_sel_amt = 0;
    var pri_sel_amt = 0;

    for (var i = 0; i < fft_sel.length; i++)
    {
        if (fft_sel[i].checked && !fft_sel[i].disabled)
        {
            post_items  += '&rad_fft_proc=' + fft_sel[i].value;
            fft_sel_amt++;
        }
    }

    for (var i = 0; i < dem_sel.length; i++)
    {
        if (dem_sel[i].checked && !dem_sel[i].disabled)
        {
            post_items  += '&rad_dem_proc=' + dem_sel[i].value;
            dem_sel_amt++;
        }
    }

    for (var i = 0; i < pri_sel.length; i++)
    {
        if (pri_sel[i].checked && !pri_sel[i].disabled)
        {
            post_items  += '&rad_proc_pri=' + pri_sel[i].value;
            pri_sel_amt++;
        }
    }

    if (fft_sel_amt != 1 && dem_sel_amt != 1 && pri_sel_amt != 1)
    {
        alert('Unknown Error!');
        return;
    }

    search_info_xml_http.onreadystatechange = proc_pair_response;

    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    search_info_xml_http.send(post_items);

    var proc_status         = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
    proc_status.innerHTML   = 'Requiring Processing: <img src="images/table-status-loading.gif" width="16" height="16"/>';
}

function no_proc_para_sub()
{
    change_btn_style('btn_proc_no', 0);

    var para_frame              = top.document.getElementById('proc_para_frame');
    para_frame.style.visibility = 'hidden';
}

function submit_search_condi(image_pair_id)
{
    var sensor_type     = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('chk_sensor_type[]');
    var image_or_pair   = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('rad_image_pair[]');
    var local_name      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_local_name');
    var track_info      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_track');
    var start_frame     = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_start_frame');
    var end_frame       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_end_frame');
    var from_date       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_from_date');
    var to_date         = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_to_date');
    var polar_type      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('chk_polar_type[]');
    var proc_status     = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('chk_proc_status[]');
    var btemp_info      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('chk_btemp');
    var bperp_info      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('chk_bperp');
    var min_btemp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_min_btemp');
    var max_btemp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_max_btemp');
    var min_bperp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_min_bperp');
    var max_bperp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_max_bperp');

    var post_items      = 'valid_proc=1';
    var sensor_type_amt = 0;
    var polar_type_amt  = 0;
    var proc_status_amt = 0;
    var image_pair_sel  = 0;
    var i;

    for (i = 0; i < sensor_type.length; i++)
    {
        if (sensor_type[i].checked && !sensor_type[i].disabled)
        {
            post_items      += '&chk_sensor_type[]=' + sensor_type[i].value;
            sensor_type_amt++;
        }
    }

    for (i = 0; i < polar_type.length; i++)
    {
        if (polar_type[i].checked && !polar_type[i].disabled)
        {
            post_items      += '&chk_polar_type[]=' + polar_type[i].value;
            polar_type_amt++;
        }
    }

    for (i = 0; i < proc_status.length; i++)
    {
        if (proc_status[i].checked && !proc_status[i].disabled)
        {
            post_items      += '&chk_proc_status[]=' + proc_status[i].value;
            proc_status_amt++;
        }
    }

    for (i = 0; i < image_or_pair.length; i++)
    {
        if (image_or_pair[i].checked && !image_or_pair[i].disabled)
        {
            post_items      += '&rad_image_pair=' + image_or_pair[i].value;
            image_pair_sel  = image_or_pair[i].value;
        }
    }

    if (image_pair_sel == 1 && (sensor_type_amt == 0 || polar_type_amt == 0 || proc_status_amt == 0))
    {
        alert('Please at Least Select One Option for "Sensor Type", "Polarization Type" and "Processing Status"');
        return;
    }

    if (image_pair_sel == 0 && (sensor_type_amt == 0 || polar_type_amt == 0))
    {
        alert('Please at Least Select One Option for "Sensor Type" and "Polarization Type"');
        return;
    }

	var org_len = post_items.length;
    post_items  += '&txt_local_name=' + local_name.value;
    post_items  += '&txt_track=' + track_info.value;
    post_items  += '&txt_start_frame=' + start_frame.value;
    post_items  += '&txt_end_frame=' + end_frame.value;
    post_items  += '&txt_from_date=' + from_date.value;
    post_items  += '&txt_to_date=' + to_date.value;
    var new_len	= post_items.length;

    if (btemp_info.checked && !btemp_info.disabled && image_pair_sel == 1)
    {
        if (min_btemp.value == '' && max_btemp.value == '')
        {
            alert('Please Input Temporal Baseline Conditions!');
            return;
        }

        post_items  += '&chk_btemp=' + btemp_info.value;
        post_items  += '&txt_min_btemp=' + min_btemp.value;
        post_items  += '&txt_max_btemp=' + max_btemp.value;
    }

    if (bperp_info.checked && !bperp_info.disabled && image_pair_sel == 1)
    {
        if (min_bperp.value == '' && max_bperp.value == '')
        {
            alert('Please Input Perpendicular Baseline Conditions!');
            return;
        }

        post_items  += '&chk_bperp=' + bperp_info.value;
        post_items  += '&txt_min_bperp=' + min_bperp.value;
        post_items  += '&txt_max_bperp=' + max_bperp.value;
    }

    var per_page_set    = document.getElementById('txt_res_per_page');
    g_res_per_page      = chk_num_val(per_page_set.value) * 1;
    g_start_page_idx    = 0;

    if (g_res_per_page > 0)
    {
        g_end_page_idx  = g_start_page_idx + g_res_per_page;
    }
    else
    {
        g_end_page_idx  = 0;
    }

    if (image_pair_id == 0)
    {
        search_info_xml_http.onreadystatechange = search_image_response;
    }
    else
    {
        search_info_xml_http.onreadystatechange = search_pair_response;
    }

    if (org_len == new_len - 87)
    {
    	if (confirm('The limitation conditions are very simple, which might lead very slow searching speed. To avoid long time waiting, please input more specific limitations, such as the location name.\n\n Are you sure to continue?'))
    	{
		    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
		    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
		    search_info_xml_http.send(post_items);

		    var search_status       = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
		    search_status.innerHTML = 'Searching: <img src="images/table-status-loading.gif" width="16" height="16"/>';
    	}
    }
	else
	{
	    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
	    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	    search_info_xml_http.send(post_items);

	    var search_status       = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
	    search_status.innerHTML = 'Searching: <img src="images/table-status-loading.gif" width="16" height="16"/>';
	}
}

function submit_pair_on_image_condi()
{
    var image_sel       = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_image_sel[]');
    var image_sel_amt   = image_sel.length;

    if (image_sel_amt != 0)
    {
        var post_items  = 'valid_proc=2';

        for (i = 0; i < image_sel_amt; i++)
        {
            if (image_sel[i].checked && !image_sel[i].disabled)
            {
                post_items  += '&ch_image_sel[]=' + image_sel[i].value;
            }
        }

        if (post_items == 'valid_proc=2')
        {
            alert('Please At Least Select One Image to Show The Pair Information!');
            return;
        }

        var from_date       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_from_date');
        var to_date         = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_to_date');
        var polar_type      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('chk_polar_type[]');
        var proc_status     = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementsByName('chk_proc_status[]');
        var btemp_info      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('chk_btemp');
        var bperp_info      = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('chk_bperp');
        var min_btemp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_min_btemp');
        var max_btemp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_max_btemp');
        var min_bperp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_min_bperp');
        var max_bperp       = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('txt_max_bperp');
        var polar_type_amt  = 0;
        var proc_status_amt = 0;
        var i;


        for (i = 0; i < polar_type.length; i++)
        {
            if (polar_type[i].checked && !polar_type[i].disabled)
            {
                post_items      += '&chk_polar_type[]=' + polar_type[i].value;
                polar_type_amt++;
            }
        }

        for (i = 0; i < proc_status.length; i++)
        {
            if (proc_status[i].checked && !proc_status[i].disabled)
            {
                post_items      += '&chk_proc_status[]=' + proc_status[i].value;
                proc_status_amt++;
            }
        }

        if (polar_type_amt == 0 || proc_status_amt == 0)
        {
            alert('Please at Least Select One Option for both "Polarization Type" and "Processing Status"');
            return;
        }

        post_items  += '&txt_from_date=' + from_date.value;
        post_items  += '&txt_to_date=' + to_date.value;

        if (btemp_info.checked && !btemp_info.disabled)
        {
            if (min_btemp.value == '' && max_btemp.value == '')
            {
                alert('Please Input Temporal Baseline Conditions!');
                return;
            }

            post_items  += '&chk_btemp=' + btemp_info.value;
            post_items  += '&txt_min_btemp=' + min_btemp.value;
            post_items  += '&txt_max_btemp=' + max_btemp.value;
        }

        if (bperp_info.checked && !bperp_info.disabled)
        {
            if (min_bperp.value == '' && max_bperp.value == '')
            {
                alert('Please Input Perpendicular Baseline Conditions!');
                return;
            }

            post_items  += '&chk_bperp=' + bperp_info.value;
            post_items  += '&txt_min_bperp=' + min_bperp.value;
            post_items  += '&txt_max_bperp=' + max_bperp.value;
        }

        search_info_xml_http.onreadystatechange = show_pair_on_image_response;

        search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
        search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        search_info_xml_http.send(post_items);

        var search_status       = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
        search_status.innerHTML = 'Searching: <img src="images/table-status-loading.gif" width="16" height="16"/>';
    }
}

function refresh_pair_info()
{
    var i;
    var post_items  = 'valid_proc=4';
    var pair_sel    = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');

    for (i = 0; i < pair_sel.length; i++)
    {
        post_items  += '&ch_pair_sel[]=' + pair_sel[i].value;
    }

    if (post_items == 'valid_proc=4')
    {
        return;
    }

	refresh_info_xml_http.onreadystatechange    = refresh_pair_response;

	refresh_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
	refresh_info_xml_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
	refresh_info_xml_http.send(post_items);
	timeout_id  = window.setTimeout("refresh_pair_info()", 20000);
}

function cancel_processes()
{
    var para_frame              = top.document.getElementById('proc_para_frame');
    para_frame.style.visibility = 'hidden';
    var pair_sel                = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');
    var post_items              = 'valid_proc=5';

    if (pair_sel.length == 0)
    {
        return;
    }

    for (i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            post_items  += '&ch_pair_sel[]=' + pair_sel[i].value;
        }
    }

    if (post_items == 'valid_proc=5')
    {
        return;
    }

    if(!confirm('Are you sure to cancel waiting of the selected pairs'))
    {
        return;
    }

    search_info_xml_http.onreadystatechange = cancel_proc_response;

    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    search_info_xml_http.send(post_items);

    var proc_status         = top.frames['parent_interface_frame'].frames['top_frame'].document.getElementById('infor_content_status');
    proc_status.innerHTML   = 'Requiring Cancellation: <img src="images/table-status-loading.gif" width="16" height="16"/>';
}

function sel_psi_img()
{
	var pair_sel    	= top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_image_sel[]');
    var pair_sel_amt    = 0;
    post_items          = 'valid_proc=14';

    for (var i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            pair_sel_amt++;
            post_items  += '&ch_sel[]=' + pair_sel[i].value;
        }
    }

    if (pair_sel_amt == 0)
    {
        alert('Please select images to proceed PSI!');
    }
    else
    {
		var proc_par	= prompt('Please set a processing parameter:\n\n0: Automatically selecting the master image and processing with FFT;\n1: Automatically selecting the master image and processing without FFT;\n2: Manually selecting the master image and processing with FFT;\n3: Manually selecting the master image and processing without FFT.');

		if (proc_par != null)
		{
			if (proc_par != 0 && proc_par != 1 && proc_par != 2 && proc_par != 3)
			{
				alert('Please input correct parameters!');
			}
			else if (proc_par == 2 || proc_par == 3)
			{
				post_items  += "&proc_par=" + proc_par;

			    search_info_xml_http.onreadystatechange = sel_psi_mst_response;

			    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
			    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			    search_info_xml_http.send(post_items);
			}
			else
			{
				post_items  += "&proc_par=" + proc_par;

			    search_info_xml_http.onreadystatechange = proc_psi_response;

			    search_info_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
			    search_info_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			    search_info_xml_http.send(post_items);
			}
		}
    }
}


function dl_table_info(image_or_pair)
{
    var pair_sel;

    if (image_or_pair == 0)
    {
        pair_sel    = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_image_sel[]');
    }
    else
    {
        pair_sel    = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');
    }
    var pair_sel_amt        = 0;
    var get_items           = 'd_id=' + image_or_pair;

    for (var i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            pair_sel_amt++;
            get_items   += '&ch_sel[]=' + pair_sel[i].value;
        }
    }

    if (pair_sel_amt == 0)
    {
        alert('Please select DInSAR result(s) to download table!');
    }
    else
    {
        var dl_table_proc_addr  = 'adps_dl_table.php';
        var dl_table_url        = dl_table_proc_addr + '?' + get_items;
        window.open(dl_table_url);
    }
}

function dl_all_sel_img()
{
    var pair_sel        = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');
    var pair_sel_amt    = 0;
    var get_items       = 'd_id=0';

    for (var i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            pair_sel_amt++;
            get_items   += '&ch_pair_sel[]=' + pair_sel[i].value;
        }
    }

    if (pair_sel_amt == 0)
    {
        alert('Please select DInSAR result(s) to download!');
    }
    else if (pair_sel_amt > 30)
    {
        alert('Please do not select more than THIRTY DInSAR results to download!');
    }
    else
    {
        var dl_zip_proc_addr    = 'adps_pack_results.php';
        var dl_zip_url          = dl_zip_proc_addr + '?' + get_items;
        window.open(dl_zip_url);
    }
}

function dl_all_sel_gis()
{
    var pair_sel        = top.frames['parent_interface_frame'].frames['main_frame'].document.getElementsByName('ch_pair_sel[]');
    var pair_sel_amt    = 0;
    var get_items       = 'd_id=1';

    for (var i = 0; i < pair_sel.length; i++)
    {
        if (pair_sel[i].checked && !pair_sel[i].disabled)
        {
            pair_sel_amt++;
            get_items   += '&ch_pair_sel[]=' + pair_sel[i].value;
        }
    }

    if (pair_sel_amt == 0)
    {
        alert('Please select DInSAR result(s) to download!');
    }
    else if (pair_sel_amt > 100)
    {
        alert('Please do not select more than ONE HUNDRED GIS Info to download!');
    }
    else
    {
        var dl_zip_proc_addr    = 'adps_pack_results.php';
        var dl_zip_url          = dl_zip_proc_addr + '?' + get_items;
        window.open(dl_zip_url);
    }
}

var sort_index  = 1;
var sort_type   = true;

function sort_by_pos(x, y)
{
	return x[sort_index] - y[sort_index];
}
function sort_by_neg(x, y)
{
	return y[sort_index] - x[sort_index];
}

function sort_table()
{
    var image_or_pair_id;
    var sort_table_check    = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('ck_sort_table');

    if (sort_table_check.value >= 200)
    {
        image_or_pair_id    = 1;
        sort_index          = sort_table_check.value - 200;
    }
    else
    {
        image_or_pair_id    = 0;
        sort_index          = sort_table_check.value;
    }

	if(sort_type == true)
	{
		g_image_pair_table.data.sort(sort_by_pos);
	}
	else
	{
		g_image_pair_table.data.sort(sort_by_neg);
	}

	sort_type   = !sort_type;

	draw_image_pair_list(g_image_pair_table, image_or_pair_id);
}

function turn_page()
{
    var turn_page_btn   = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('btn_forw_backw');
    var image_or_pair;

    if (turn_page_btn.value == 'prev_image')
    {
        image_or_pair       = 0;
        g_start_page_idx    = g_start_page_idx - g_res_per_page;
        g_end_page_idx      = g_end_page_idx - g_res_per_page;
    }
    else if (turn_page_btn.value == 'prev_pair')
    {
        image_or_pair       = 1;
        g_start_page_idx    = g_start_page_idx - g_res_per_page;
        g_end_page_idx      = g_end_page_idx - g_res_per_page;
    }
    else if (turn_page_btn.value == 'next_image')
    {
        image_or_pair       = 0;
        g_start_page_idx    = g_start_page_idx + g_res_per_page;
        g_end_page_idx      = g_end_page_idx + g_res_per_page;
    }
    else
    {
        image_or_pair       = 1;
        g_start_page_idx    = g_start_page_idx + g_res_per_page;
        g_end_page_idx      = g_end_page_idx + g_res_per_page;
    }



    draw_image_pair_list(g_image_pair_table, image_or_pair);
}

window.onload   = function ()
{
    search_info_xml_http                        = create_xml_http_request();
	refresh_info_xml_http                       = create_xml_http_request();
	get_user_type_xml_http                      = create_xml_http_request();
	get_user_type_xml_http.onreadystatechange   = get_user_type_response;
	post_items                                  = 'valid_proc=6';

    get_user_type_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    get_user_type_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    get_user_type_xml_http.send(post_items);
}