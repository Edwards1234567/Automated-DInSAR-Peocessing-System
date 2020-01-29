var add_user_xml_http;
var sign_out_xml_http;

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

function add_user_response()
{
    if (add_user_xml_http.readyState == 4 && add_user_xml_http.status == 200)
    {
        alert (add_user_xml_http.responseText);
    }
}

function add_user()
{
    var post_items      = 'valid_proc=7';
    var user_authority  = 0;
    var proc_amount     = 0;
    var proc_full_amt   = 0;
    var user_name       = document.getElementById('txt_usr_name').value;
    var user_pass       = document.getElementById('txt_password').value;
    var conf_pass       = document.getElementById('txt_password_confirm').value;
    var opt_man_user    = document.getElementById('ch_man_user');
    var opt_add_loca    = document.getElementById('ch_add_loca');

    if (user_name == '')
    {
        alert('Please Input User Name!');
        return;
    }

    if (user_pass == '')
    {
        alert('Please Input User Password!');
        return;
    }

    if (conf_pass == '')
    {
        alert('Please Input Confirmation Password!');
        return;
    }

    if (user_pass != conf_pass)
    {
        alert('Confirmation Password is not the Same as Inputted One!');
        return;
    }

    post_items  += '&add_user_name=' + user_name + '&add_user_pass=' + user_pass;

    if (opt_man_user.checked)
    {
        user_authority  = opt_man_user.value;
        post_items      += '&user_authority=' + user_authority;
    }
    else if (opt_add_loca.checked)
    {
        user_authority  = opt_add_loca.value;
        post_items      += '&user_authority=' + user_authority;
    }
    else
    {
        var opt_search      = document.getElementById('ch_search');
        var opt_view        = document.getElementById('ch_view');
        var opt_download    = document.getElementById('ch_download');
        var opt_down_table  = document.getElementById('ch_download_table');
        var opt_proc_pair   = document.getElementById('ch_proc_pair');
        var opt_proc_full   = document.getElementById('ch_proc_full');
        var opt_cancel_own  = document.getElementById('ch_cancel_self');
        var opt_cancel_oth  = document.getElementById('ch_cancel_other');
        var opt_dl_gis      = document.getElementById('ch_download_gis');
        var opt_dl_sel_gis  = document.getElementById('ch_download_sel_gis');
        var opt_dl_sel_img  = document.getElementById('ch_download_sel_img');
        var opt_priority    = document.getElementsByName('rad_pri[]');
        var opt_proc_amt    = document.getElementsByName('rad_proc[]');
        var opt_full_amt    = document.getElementsByName('rad_full_proc[]');
        var opt_email       = document.getElementById('txt_user_email');

        if (opt_search.checked)
        {
            user_authority  += opt_search.value * 1;
        }

        if (opt_view.checked)
        {
            user_authority  += opt_view.value * 1;
        }

        if (opt_download.checked)
        {
            user_authority  += opt_download.value * 1;
        }

        if (opt_down_table.checked)
        {
            user_authority  += opt_down_table.value * 1;
        }

        if (opt_proc_pair.checked)
        {
            user_authority  += opt_proc_pair.value * 1;
        }

        if (opt_proc_full.checked)
        {
            user_authority  += opt_proc_full.value * 1;
        }

        if (opt_cancel_own.checked)
        {
            user_authority  += opt_cancel_own.value * 1;
        }

        if (opt_cancel_oth.checked)
        {
            user_authority  += opt_cancel_oth.value * 1;
        }

        if (opt_dl_gis.checked)
        {
            user_authority  += opt_dl_gis.value * 1;
        }

        if (opt_dl_sel_gis.checked)
        {
            user_authority  += opt_dl_sel_gis.value * 1;
        }

        if (opt_dl_sel_img.checked)
        {
            user_authority  += opt_dl_sel_img.value * 1;
        }

        for (var i = 0; i < opt_priority.length; i++)
        {
            if (opt_priority[i].checked)
            {
                user_authority  += opt_priority[i].value * 1;
            }
        }

        for (var i = 0; i < opt_proc_amt.length; i++)
        {
            if (opt_proc_amt[i].checked)
            {
                proc_amount     = opt_proc_amt[i].value;
            }
        }

        for (var i = 0; i < opt_full_amt.length; i++)
        {
            if (opt_full_amt[i].checked)
            {
                proc_full_amt   = opt_full_amt[i].value;
            }
        }

        post_items      += '&user_authority=' + user_authority + '&proc_amount=' + proc_amount + '&proc_full_amount=' + proc_full_amt + '&user_email=' + opt_email.value;
    }

    add_user_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    add_user_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    add_user_xml_http.send(post_items);

}

function reset_setting()
{
    var user_name       = document.getElementById('txt_usr_name');
    var user_pass       = document.getElementById('txt_password');
    var conf_pass       = document.getElementById('txt_password_confirm');
    var opt_man_user    = document.getElementById('ch_man_user');
    var opt_search      = document.getElementById('ch_search');
    var opt_view        = document.getElementById('ch_view');
    var opt_download    = document.getElementById('ch_download');
    var opt_down_table  = document.getElementById('ch_download_table');
    var opt_proc_pair   = document.getElementById('ch_proc_pair');
    var opt_proc_full   = document.getElementById('ch_proc_full');
    var opt_cancel_own  = document.getElementById('ch_cancel_self');
    var opt_cancel_oth  = document.getElementById('ch_cancel_other');
    var opt_dl_gis      = document.getElementById('ch_download_gis');
    var opt_dl_sel_gis  = document.getElementById('ch_download_sel_gis');
    var opt_dl_sel_img  = document.getElementById('ch_download_sel_img');
    var opt_priority    = document.getElementsByName('rad_pri[]');
    var opt_proc_amt    = document.getElementsByName('rad_proc[]');
    var opt_full_amt    = document.getElementsByName('rad_full_proc[]');

    user_name.value         = '';
    user_pass.value         = '';
    conf_pass.value         = '';
    opt_man_user.checked    = false;
    opt_search.checked      = true;
    opt_view.checked        = false;
    opt_download.checked    = false;
    opt_down_table.checked  = false;
    opt_proc_pair.checked   = false;
    opt_proc_full.checked   = false;
    opt_cancel_own.checked  = false;
    opt_cancel_oth.checked  = false;
    opt_dl_gis.checked      = false;
    opt_dl_sel_gis.checked  = false;
    opt_dl_sel_img.checked  = false;
    opt_priority[0].checked = true;
    opt_proc_amt[0].checked = true;
    opt_full_amt[0].checked = true;
}

function admin_sign_out()
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

window.onload = function()
{
    add_user_xml_http                       = create_xml_http_request();
    add_user_xml_http.onreadystatechange    = add_user_response;
    sign_out_xml_http                       = create_xml_http_request();
}