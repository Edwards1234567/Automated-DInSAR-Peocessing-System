function adjust_frame_size()
{
    var win_width       = document.documentElement.clientWidth;
    var win_height      = document.documentElement.clientHeight;
    var parent_frame    = document.getElementById('parent_interface_frame');
    parent_frame.width  = win_width - 30;
    parent_frame.height = win_height - 20;
}

function adjust_main_pos()
{
    var win_width       = document.documentElement.clientWidth;
    var parent_frame    = document.getElementById('parent_frame');

    if (win_width >= 1250)
    {
        parent_frame.style.left = (win_width - 1250) / 2 + 'px';
        var parent_interface    = document.getElementById('parent_interface_frame');
        parent_interface.width	= 1250;
    }
    else
    {
        parent_frame.style.left = '0px';
    }
}

function adjust_para_pos()
{
    var win_width;
    var win_height;

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

    var proc_frame      = document.getElementById('proc_para_frame');

    if (win_width / 2 - 150 >= 0)
    {
        proc_frame.style.left  = win_width / 2 - 150 + 'px';
    }
    else
    {
        proc_frame.style.left  = win_width / 2 + 'px';
    }

    if (win_height / 2 - 200 >= 0)
    {
        proc_frame.style.top   = win_height / 2 - 200 + 'px';
    }
    else
    {
        proc_frame.style.top   = win_height / 2 + 'px';
    }
}

window.onresize = function()
{
    adjust_frame_size();
    adjust_para_pos();
    adjust_main_pos();
}

window.onload = function()
{
    adjust_main_pos();
}
