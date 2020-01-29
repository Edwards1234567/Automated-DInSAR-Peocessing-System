
function change_btn_style(btn_id, style_type)
{
    var select_btn  = document.getElementById(btn_id);

    if (style_type == 0)
    {
        select_btn.className    = 'yellow_btn';
    }
    else
    {
        select_btn.className    = 'orange_btn';
    }
}