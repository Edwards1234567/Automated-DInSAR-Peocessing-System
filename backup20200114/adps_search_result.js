
function sort_table_cols(title_id, image_or_pair, col_id)
{
    var image_title         = document.getElementById(title_id);
    var sort_table_check    = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('ck_sort_table');

    if (image_or_pair == 0)
    {
        sort_table_check.value  = col_id;
    }
    else
    {
        sort_table_check.value  = col_id + 200;
    }

    sort_table_check.click();
}

function turn_res_page(prev_or_next, image_or_pair)
{
    var turn_page_btn   = top.frames['parent_interface_frame'].frames['left_frame'].document.getElementById('btn_forw_backw');

    if (prev_or_next == 0)
    {
        if (image_or_pair == 0)
        {
            turn_page_btn.value = 'prev_image';
        }
        else
        {
            turn_page_btn.value = 'prev_pair';
        }
    }
    else
    {
        if (image_or_pair == 0)
        {
            turn_page_btn.value = 'next_image';
        }
        else
        {
            turn_page_btn.value = 'next_pair';
        }
    }

    turn_page_btn.click();
}

function change_title_style(title_id, in_or_out, col_id)
{
    var image_title = document.getElementById(title_id);

    if (in_or_out == 0)
    {
        image_title.style.background            = 'url(images/green_bg.gif)';
        image_title.style.backgroundPosition    = '0px -3px';
        image_title.style.color                 = '#FF0000';
    }
    else
    {
        image_title.style.background            = 'url(images/bg_th.jpg)';
        image_title.style.backgroundPosition    = '0px -10px';
        image_title.style.color                 = '#00FF00';
    }
}

function image_sel_all()
{
    var img_check_all   = document.getElementById('ch_image_sel_all');
    var image_checks    = document.getElementsByName('ch_image_sel[]');
    var image_check_amt = image_checks.length;
    var i;

    if (img_check_all.checked)
    {
        for (i = 0; i < image_check_amt; i++)
        {
            image_checks[i].checked = true;
        }
    }
    else
    {
        for (i = 0; i < image_check_amt; i++)
        {
            image_checks[i].checked = false;
        }
    }
}

function pair_sel_all()
{
    var pir_check_all   = document.getElementById('ch_pair_sel_all');
    var pair_checks     = document.getElementsByName('ch_pair_sel[]');
    var pair_check_amt  = pair_checks.length;
    var i;

    if (pir_check_all.checked)
    {
        for (i = 0; i < pair_check_amt; i++)
        {
            pair_checks[i].checked  = true;
        }
    }
    else
    {
        for (i = 0; i < pair_check_amt; i++)
        {
            pair_checks[i].checked  = false;
        }
    }
}
