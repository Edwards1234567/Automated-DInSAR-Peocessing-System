<?php
	require_once('adps_server_all.php');

    $cent_lat_num	= $_POST['cent_lat'];
    $cent_lon_num	= $_POST['cent_lon'];
    $mst_year_num	= $_POST['mst_year'];
    $slv_year_num	= $_POST['slv_year'];
    $wthr_type_num	= $_POST['wthr_type'];
    $sid_num		= $_POST['rand_num'];
	$bom_near_url	= sprintf('http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_stn_num=86071&p_display_type=nearest10_tab2&p_nccObsCode=139&p_match=50,,%f,%f,,LATLON,%s&sid=%f',
								$cent_lat_num, $cent_lon_num, $wthr_type_num, $sid_num);
	$bom_near_wsite	= fopen($bom_near_url, 'r');
	$bom_near_cont	= fread($bom_near_wsite, 8192);
	$bom_near_cont_proc	= $bom_near_cont;
	fclose($bom_near_wsite);

//	echo $bom_near_cont;

	if (strstr($bom_near_cont, 'Empty resultset'))
	{
		echo 'No weather stations within 50km.';
	}
	else
	{
		if ($wthr_type_num != 201)
		{
			$wthr_station	= substr($bom_near_cont_proc, 0, 6);
			$mst_wthr_sta_fnd	= 0;

			while ($mst_wthr_sta_fnd == 0)
			{
				$wthr_sta_url	= sprintf('http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_stn_num=%s&p_display_type=holdingGraph&p_nccObsCode=%s&sid=%f', $wthr_station, $wthr_type_num, $sid_num);
				$wthr_sta_wsite	= fopen($wthr_sta_url, 'r');
				$wthr_sta_cont	= fread($wthr_sta_wsite, 8192);

				if (strstr($wthr_sta_cont, 'Success,') != '')
				{
					$mst_yr_str	= sprintf('%s:', $mst_year_num);
					$mst_yr_stt	= strstr($wthr_sta_cont, $mst_yr_str);

					if ($mst_yr_stt != '')
					{
						$mst_wthr_sta_fnd	= 1;
						$mst_comma_pos		= strpos($mst_yr_stt, ',');

						if ($mst_comma_pos == false)
						{
							$mst_pc_end		= strlen($mst_yr_stt) - 5;
						}
						else
						{
							$mst_pc_end		= $mst_comma_pos - 5;
						}

						$mst_pc_code		= substr($mst_yr_stt, 5, $mst_pc_end);
						$mst_wthr_url		= sprintf('http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_nccObsCode=%s&p_display_type=dailyDataFile&p_startYear=%s&p_c=%s&p_stn_num=%s',
														$wthr_type_num, $mst_year_num, $mst_pc_code, $wthr_station);
					}
					else
					{
						$next_wthr_sta_stt	= strstr($bom_near_cont_proc, '||');

						if (strlen($next_wthr_sta_stt) > 8)
						{
							$wthr_station	= substr($next_wthr_sta_stt, 2, 6);
							$bom_near_cont_proc	= substr($next_wthr_sta_stt, 2);
						}
						else
						{
							$mst_wthr_sta_fnd	= 2;
						}
					}
				}

				fclose($wthr_sta_wsite);
			}


			$bom_near_cont_proc	= $bom_near_cont;
			$wthr_station		= substr($bom_near_cont_proc, 0, 6);
			$slv_wthr_sta_fnd	= 0;

			while ($slv_wthr_sta_fnd == 0)
			{
				$wthr_sta_url	= sprintf('http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_stn_num=%s&p_display_type=holdingGraph&p_nccObsCode=%s&sid=%f', $wthr_station, $wthr_type_num, $sid_num);
				$wthr_sta_wsite	= fopen($wthr_sta_url, 'r');
				$wthr_sta_cont	= fread($wthr_sta_wsite, 8192);

				if (strstr($wthr_sta_cont, 'Success,') != '')
				{
					$slv_yr_str	= sprintf('%s:', $slv_year_num);
					$slv_yr_stt	= strstr($wthr_sta_cont, $slv_yr_str);

					if ($slv_yr_stt != '')
					{
						$slv_wthr_sta_fnd	= 1;
						$slv_comma_pos		= strpos($slv_yr_stt, ',');

						if ($slv_comma_pos == false)
						{
							$slv_pc_end		= strlen($slv_yr_stt) - 5;
						}
						else
						{
							$slv_pc_end		= $slv_comma_pos - 5;
						}

						$slv_pc_code		= substr($slv_yr_stt, 5, $slv_pc_end);
						$slv_wthr_url		= sprintf('http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_nccObsCode=%s&p_display_type=dailyDataFile&p_startYear=%s&p_c=%s&p_stn_num=%s',
														$wthr_type_num, $slv_year_num, $slv_pc_code, $wthr_station);
					}
					else
					{
						$next_wthr_sta_stt	= strstr($bom_near_cont_proc, '||');

						if (strlen($next_wthr_sta_stt) > 8)
						{
							$wthr_station	= substr($next_wthr_sta_stt, 2, 6);
							$bom_near_cont_proc	= substr($next_wthr_sta_stt, 2);
						}
						else
						{
							$slv_wthr_sta_fnd	= 2;
						}
					}
				}

				fclose($wthr_sta_wsite);
			}


			if ($mst_wthr_sta_fnd == 1 && $slv_wthr_sta_fnd == 1)
			{
				echo $mst_wthr_url;
				echo '<*****>';
				echo $slv_wthr_url;
			}
			else if ($mst_wthr_sta_fnd == 1 && $slv_wthr_sta_fnd != 1)
			{
				echo $mst_wthr_url;
				echo '<#####>';
			}
			else if ($mst_wthr_sta_fnd != 1 && $slv_wthr_sta_fnd == 1)
			{
				echo $slv_wthr_url;
				echo '<^^^^^>';
			}
			else
			{
				echo 'No weather stations within 50km has info acquired on the dates.';
			}
		}
		else
		{
			$cur_whtr_dwo	= substr($bom_near_cont_proc, 0, 4);
			$cur_whtr_page	= sprintf('http://www.bom.gov.au/climate/dwo/IDCJDW%s.latest.shtml<~~~~~>', $cur_whtr_dwo);
			echo $cur_whtr_page;
		}

	}


?>