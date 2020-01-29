var update_loca_xml_http;
var sign_out_xml_http;
var hide_show_status    = true;

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

function get_url(str)
{
	return str + "?t="+((new Date()).valueOf());
}

function location_infor_table(response_xml)
{
    var i, j;
    var infor_records   = response_xml.getElementsByTagName('Record');
	var first_property  = infor_records[0].getElementsByTagName('Property');
	this.nrows          = infor_records.length;
	this.ncols          = first_property.length;
	this.data           = new Array(this.nrows);

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

function draw_loc_list(list_to_draw)
{
    var list_html       = "";

    if (list_to_draw.nrows != 0)
    {
        var location_cont   = document.getElementById('loca_set_cont');

        if (list_to_draw.ncols != 0)
        {
            list_html   +=  '<div id="loc_cont_line">'                                  +
                                '<div id="loc_sensor_title">Sensor</div>'               +
                                '<div id="loc_track_title">Track</div>'                 +
                                '<div id="loc_frame_title">Frame</div>'                 +
                                '<div id="loc_name_title">Location Description</div>'   +
                            '</div>';

            for (var i = 0; i < list_to_draw.nrows; i++)
            {
                var sensor_id   = list_to_draw.data[i][0];
                var sensor_name = list_to_draw.data[i][1];
                var track_info  = list_to_draw.data[i][2];
                var frame_info  = list_to_draw.data[i][3];
                var name_info   = list_to_draw.data[i][4];
                var che_name_va = sensor_id + '_' + track_info + '_' + frame_info;
                var txt_name_id = 'localname_' + che_name_va;
                var che_name_id = 'check_' + che_name_va;
                list_html       +=  '<div id="loc_cont_line">'  +
                                        '<div id="loc_sensor_info">' + sensor_name + '</div>' +
                                        '<div id="loc_track_info">' + track_info + '</div>' +
                                        '<div id="loc_frame_info">' + frame_info + '</div>' +
                                        '<div id="loc_name_info">'  +
                                            '<input type="text" name="' + txt_name_id + '" id="' + txt_name_id + '" class="txt_loc_name" value="' + name_info + '" onKeyDown="loc_name_changed(\'' + txt_name_id + '\')"/>' +
                                        '</div>'    +
                                        '<div id="loc_change_sel"><input type="checkbox" id="' + che_name_id + '" name="ch_change_name[]" value="' + che_name_va + '"></div>'   +
                                    '</div>';
            }

            location_cont.innerHTML = list_html;
        }
        else
        {
            location_cont.innerHTML = 'None';
        }
    }
}

function update_loca_response()
{
    if (update_loca_xml_http.readyState == 4 && update_loca_xml_http.status == 200)

    {
        //alert(update_loca_xml_http.responseText);


        if (update_loca_xml_http.responseXML)
        {
            var location_list   = new location_infor_table(update_loca_xml_http.responseXML);




            draw_loc_list(location_list)
        }
        else
        {
            alert(update_loca_xml_http.responseText);
        }

    }
}
function loc_name_changed(text_id)
{
    var txt_loc_name                = document.getElementById(text_id);
    txt_loc_name.style.background   = '#00FFFF';
    var proc_para                   = text_id.split('_');
    var sensor_id                   = proc_para[1];
    var track_info                  = proc_para[2];
    var frame_info                  = proc_para[3];
    var check_id                    = 'check_' + sensor_id + '_' + track_info + '_' + frame_info;
    var check_change                = document.getElementById(check_id);
    check_change.checked            = true;
}
function update_loca_info()

{
    var check_cont  = document.getElementsByName('ch_change_name[]');
    var post_item   = 'valid_proc=13';

    for (var i = 0; i < check_cont.length; i++)
    {
        if (check_cont[i].checked && !check_cont[i].disabled)
        {
            var post_para   = check_cont[i].value.split('_');
            var sensor_id   = post_para[0];
            var track_info  = post_para[1];
            var frame_info  = post_para[2];
            var text_id     = 'localname_' + sensor_id + '_' + track_info + '_' + frame_info;





            var text_cont   = document.getElementById(text_id);

            post_item       += '&ch_changed[]=\'update location_infor set location_description = "' + text_cont.value +
                               '" where sensor_type = ' + sensor_id + ' and track = ' + track_info + ' and frame = ' + frame_info + '\'';
        }
    }




    if (post_item == 'valid_proc=13')

    {
        alert('No Information Updated!');









    }
    else
    {
        update_loca_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
        update_loca_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        update_loca_xml_http.send(post_item);









    }
}

function reset_loca_info()
{
    var post_items                          = 'valid_proc=12';

    update_loca_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    update_loca_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    update_loca_xml_http.send(post_items);
}

function logout_loca_info()
{
    if(confirm('Are You Sure to Sign Out!'))
    {
        var post_items      = 'valid_proc=8';

        sign_out_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
        sign_out_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        sign_out_xml_http.send(post_items);

        self.location='adps_index.html';
    }

}
function adps_sign_out()
{
    if(confirm('Are You Sure to Sign Out!'))
    {
        var post_items      = 'valid_proc=8';

        sign_out_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
        sign_out_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        sign_out_xml_http.send(post_items);

        top.location='adps_index.html';
    }
}
function hide_show_pannel()
{
    var hide_show_href_cont = document.getElementById('hide_show_href');
    var infor_frame         = document.getElementById('infor_frame');
    var infor_content       = document.getElementById('infor_short_content_left');
    var infor_line_pad      = document.getElementById('infor_content_line_center_padding');
    var infor_line_no_pad   = document.getElementById('infor_content_line_center');
    var infor_cont_intro    = document.getElementById('infor_content_introduction');
    var bottom_frame        = top.frames['parent_interface_frame'].document.getElementById('frame_bottom');
    var pannel_frame        = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('pannel_frame');
    var pannel_page         = top.frames['parent_interface_frame'].frames['left_frame'].document.body;

    if (hide_show_status)
    {
        hide_show_href_cont.innerHTML   = 'Show S & P Pannel';
        infor_frame.style.width         = '950px';
        infor_content.style.width       = '923px';
        infor_line_pad.style.width      = '913px';
        infor_line_no_pad.style.width   = '913px';
        infor_cont_intro.style.width    = '932px';
        bottom_frame.cols               = '30,*';
        pannel_frame.style.visibility   = 'hidden';
        pannel_page.style.overflow      = 'hidden';
    }
    else
    {
        hide_show_href_cont.innerHTML   = 'Hide S & P Pannel';
        infor_frame.style.width         = '1220px';
        infor_content.style.width       = '1193px';
        infor_line_pad.style.width      = '1183px';
        infor_line_no_pad.style.width   = '1183px';
        infor_cont_intro.style.width    = '1202px';
        bottom_frame.cols               = '300,*';
        pannel_frame.style.visibility   = 'visible';
        pannel_page.style.overflow      = 'auto';
    }
    hide_show_status    = !hide_show_status;
}

window.onload = function()
{
    update_loca_xml_http                    = create_xml_http_request();
    sign_out_xml_http   = create_xml_http_request();
    update_loca_xml_http.onreadystatechange = update_loca_response;
	var post_items                          = 'valid_proc=12';

    update_loca_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    update_loca_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    update_loca_xml_http.send(post_items);
}