var image_width;
var image_height;
var image_name;
var image_size;
var weather_xml_http;
var full_proc_xml_http;
var cur_addr        = 'http://localhost/ADPS2.0';

var PER_PRI_LOW     = 32;
var PER_PRI_HIGH    = 64;
var weather_source	= 1;

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


function proc_full_response()
{
    if (full_proc_xml_http.readyState == 4 && full_proc_xml_http.status == 200)
    {
        alert(full_proc_xml_http.responseText);
    }
}


function proc_weather_response()
{
    if (weather_xml_http.readyState == 4 && weather_xml_http.status == 200)
    {
    	var response_text	= weather_xml_http.responseText;
    	var mst_ulr, slv_url, cur_url;
    	var mst_slv_split_pos, mst_split_pos, slv_split_pos, cur_split_pos;

    	//alert(response_text);

    	if (response_text.indexOf('<*****>') > 0)
    	{
			mst_slv_split_pos	= response_text.indexOf('<*****>');
			mst_ulr				= response_text.substr(0, mst_slv_split_pos);
			slv_url				= response_text.substr(mst_slv_split_pos + 7, response_text.length - mst_ulr.length - 7);
			window.open(mst_ulr, '_blank');
			window.open(slv_url, '_blank');
    	}
    	else if (response_text.indexOf('<#####>') > 0)
    	{
    		mst_split_pos	= response_text.indexOf('<#####>');
    		mst_ulr			= response_text.substr(0, mst_split_pos);
    		alert('Only found weather info for the Master acquisition.');
			window.open(mst_ulr, '_blank');
    	}
    	else if (response_text.indexOf('<^^^^^>') > 0)
    	{
    		slv_split_pos	= response_text.indexOf('<^^^^^>');
    		slv_ulr			= response_text.substr(0, slv_split_pos);
    		alert('Only found weather info for the Slave acquisition.');
			window.open(slv_ulr, '_blank');
    	}
    	else if (response_text.indexOf('<~~~~~>') > 0)
    	{
    		cur_split_pos	= response_text.indexOf('<~~~~~>');
    		cur_url			= response_text.substr(0, cur_split_pos);
			window.open(cur_url, '_blank');
    	}
    	else
    	{
    		alert(response_text);
    	}
    }
}


function full_res_proc()
{
    var user_type_cont  = document.getElementById('txt_user_type');
    var user_type       = user_type_cont.value * 1;
    var title_str       = 'Please input the parameter of processing priority!\r\n';

    if ((user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 96)
    {
        title_str       += '0: Low, 1: Medium, : High, 3: ASAP, Other: No Process.';
    }
    else if ((user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 64)
    {
        title_str       += '0: Low, 1: Medium, : High, Other: No Process.';
    }
    else if ((user_type & (PER_PRI_LOW | PER_PRI_HIGH)) == 32)
    {
        title_str       += '0: Low, 1: Medium, Other: No Process.';
    }
    else
    {
        title_str       += '0: Low, Other: No Process.';
    }

    var pri_value   = prompt(title_str)

    switch (pri_value)
    {
        case '0':
        case '1':
        case '2':
        case '3':
            var image_name_cont = document.getElementById('txt_name_infor');
            var last_slash_pos  = image_name_cont.value.lastIndexOf('/');
            var image_full_name = image_name_cont.value.substring(last_slash_pos + 1, image_name_cont.value.length);
        	var post_items      = 'valid_proc=11&image_name=' + image_full_name + '&pri_value=' + pri_value;

            full_proc_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
            full_proc_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
            full_proc_xml_http.send(post_items);
        break;

        default:
        break;
    }
}

function change_image_size()
{
    if (image_size == 0)
    {
        draw_big_image();
    }
    else
    {
        draw_small_image();
    }
}

function draw_big_image()
{
	var result_image		= document.getElementById('result_image');
    image_size              = 1;
    var image_content       = document.getElementById('image_frame');
    var image_width_cont    = document.getElementById('txt_width_infor');
    var image_height_cont   = document.getElementById('txt_height_infor');
    var image_name_cont     = document.getElementById('txt_name_infor');
    image_width             = image_width_cont.value;
    image_height            = image_height_cont.value;
    image_name              = image_name_cont.value;
    var win_width           = document.documentElement.clientWidth - 50;
    var win_height          = document.documentElement.clientHeight - 90;
    image_content.innerHTML = '<img src= "' + image_name + '" width= "' + image_width + '" height= "' + image_height + '" />';


	if (window.event.pageX || window.event.pageY)
	{
		var click_pos_x				= window.event.pageX - 20;
		var click_pos_y				= window.event.pageY - 50;
	    var big_image_click_x		= click_pos_x / result_image.width * image_width;
	    var big_image_click_y		= click_pos_y / result_image.height * image_height;
	    document.body.scrollTop		= big_image_click_y - click_pos_y;
	    document.body.scrollLeft	= big_image_click_x - click_pos_x;
	}
	else
	{
		var click_pos_x			= window.event.clientX - 20;
		var click_pos_y			= window.event.clientY - 50;
	    var big_image_click_x	= click_pos_x / result_image.width * image_width;
	    var big_image_click_y	= click_pos_y / result_image.height * image_height;
	    document.documentElement.scrollTop	= big_image_click_y - click_pos_y;
	    document.documentElement.scrollLeft	= big_image_click_x - click_pos_x;
	}

}

function draw_small_image()
{
    image_size              = 0;
    var image_content       = document.getElementById('image_frame');
    var image_width_cont    = document.getElementById('txt_width_infor');
    var image_height_cont   = document.getElementById('txt_height_infor');
    var image_name_cont     = document.getElementById('txt_name_infor');
    image_width             = image_width_cont.value;
    image_height            = image_height_cont.value;
    image_name              = image_name_cont.value;
    var image_wh_ratio		= image_width / image_height;
    var win_width           = document.documentElement.clientWidth - 50;
    var win_height          = document.documentElement.clientHeight - 90;
    var win_wh_ratio		= win_width / win_height;

    if (win_wh_ratio > image_wh_ratio)
    {
	    image_content.innerHTML = '<img id="result_image" src= "' + image_name + '" width= "' + (win_height * image_wh_ratio) + '" height= "' + win_height + '" />';
	}
	else
	{
		image_content.innerHTML = '<img id="result_image" src= "' + image_name + '" width= "' + win_width + '" height= "' + (win_width / image_wh_ratio) + '" />';
	}
}


function get_nearest_sites(cent_lat, cent_lon, mst_yr, slv_yr)
{
	var wthr_type	= prompt('0: Rainfall, 1: Max Temperature, 2: Min Temperature, 3: Solar Exposure, 4: Current Weather.');
	var wthr_type_code;

	if (wthr_type != '')
	{
		if (wthr_type == 1)
		{
			wthr_type_code	= 122;
		}
		else if (wthr_type == 2)
		{
			wthr_type_code	= 123;
		}
		else if (wthr_type == 3)
		{
			wthr_type_code	= 193;
		}
		else if (wthr_type == 4)
		{
			wthr_type_code	= 201;
		}
		else
		{
			wthr_type_code	= 136;
		}

		var post_items	= 'cent_lat=' + cent_lat + '&cent_lon=' + cent_lon + '&mst_year=' + mst_yr + '&slv_year=' + slv_yr + '&wthr_type=' + wthr_type_code + '&rand_num=' + Math.random();

	    weather_xml_http.open('POST', get_url("./adps_visit_bom_au.php"), true);
	    weather_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	    weather_xml_http.send(post_items);
	}
}


function check_weather_info(href)
{

	if (weather_source == 1)
	{
		var rslt_info		= href.split('_');
		var bot_lat_str		= rslt_info[10].replace('x', '-');
		var left_lon_str	= rslt_info[11].replace('x', '-');
		var top_lat_str		= rslt_info[12].replace('x', '-');
		var right_lon_astr	= rslt_info[13].replace('x', '-');
		var right_lon_str	= right_lon_astr.substr(0, right_lon_astr.length - 5);
		var cent_lon		= (Number(right_lon_str) + Number(left_lon_str)) / 2;
		var cent_lat		= -(Number(top_lat_str) + Number(bot_lat_str)) / 2;
		var cent_lon_astr	= String(cent_lon);
		var cent_lat_astr	= String(cent_lat);
		var cent_lon_dot 	= cent_lon_astr.indexOf('.');
		var cent_lat_dot 	= cent_lat_astr.indexOf('.');
		var cent_lon_str	= cent_lon_astr.substr(0, cent_lon_dot + 4);
		var cent_lat_str	= cent_lat_astr.substr(0, cent_lat_dot + 4);
		var mst_yr_str		= rslt_info[7].substr(0, 4);
		var slv_yr_str		= rslt_info[8].substr(0, 4);

		get_nearest_sites(cent_lat_str, cent_lon_str, mst_yr_str, slv_yr_str);
	}
}


window.onresize = function()
{
    if (image_size == 0)
    {
        draw_small_image();
    }
}

window.onload = function ()
{
    image_size  = 0;
    draw_small_image();

    full_proc_xml_http                      = create_xml_http_request();
	full_proc_xml_http.onreadystatechange   = proc_full_response;
    weather_xml_http						= create_xml_http_request();
	weather_xml_http.onreadystatechange		= proc_weather_response;
}