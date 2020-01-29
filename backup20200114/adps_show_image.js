var show_image_xml_http;
var image_name;
var image_name_psi;

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

function result_infor_table(response_xml)
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

function show_image_response()
{
    if (show_image_xml_http.readyState == 4 && show_image_xml_http.status == 200)
    {
        if (show_image_xml_http.responseXML)
        {
            var result_list         = new result_infor_table(show_image_xml_http.responseXML);
            var image_path          = result_list.data[0][0];
            var image_full_name     = image_path + image_name;
            var image_width         = result_list.data[0][2];
            var image_height        = result_list.data[0][3];
            var image_content       = document.getElementById('show_image_frame');
            //image_content.innerHTML = '<div style="background: url(' + image_full_name + '); width: ' + image_width + 'px; height: ' + image_height + 'px;"></div>';
            image_content.innerHTML	= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML += '<div style="background: url(' + image_full_name + '); width: ' + image_width + 'px; height: ' + image_height + 'px;"></div>';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
            image_content.innerHTML	+= '<!--asdfasdfasdfasdfasdfasdfasdfdffasdfasdfjkldhflkjquiwerynvjnalsdfjeuwqrqiour1234hfasdljfh2oeryjasdfjnsdfquerjn12370fasd98f7adjnvzfhq81734asdjfhaldfjoyh43103874adfhfasdfe12347023847057023knnvqiduqhpfngqpfy8qe8-->';
        }
        else
        {
            alert(show_image_xml_http.responseText);
        }
    }
}

function requrest_show_image()
{
    var post_items      = 'valid_proc=9&file_name=' + image_name;;

    show_image_xml_http.open('POST', get_url("./adps_server_operations.php"), true);
    show_image_xml_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    show_image_xml_http.send(post_items);
}

window.onContentMenu="return false";

window.onload = function()
{

    var cur_url                             = window.location.href;
    var sensor_name_stt						= cur_url.indexOf('=');
    var sensor_name_stp						= cur_url.indexOf('&');
    var sensor_name							= cur_url.substr(sensor_name_stt + 1, sensor_name_stp - sensor_name_stt - 1);
    var track_num_stt						= cur_url.indexOf('=', sensor_name_stp);
    var track_num_stp						= cur_url.indexOf('&', track_num_stt);
    var track_num							= cur_url.substr(track_num_stt + 1, track_num_stp - track_num_stt - 1);
    var img_name_pos                        = cur_url.indexOf('=', track_num_stp);
    var img_name_tmp						= cur_url.substr(img_name_pos + 1);
	image_name                              = sensor_name + '/track' + track_num + '/' + img_name_tmp;
	var img_name_pos_PSI                    = cur_url.indexOf('=');
    image_name_psi                          = cur_url.substr(img_name_pos_PSI + 1);
    show_image_xml_http                     = create_xml_http_request();
    show_image_xml_http.onreadystatechange  = show_image_response;

    requrest_show_image();
}