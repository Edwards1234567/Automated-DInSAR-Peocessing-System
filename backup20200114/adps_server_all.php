<?php

// macros for DB operation
//define('DB_LOCATION', '129.94.30.126');     // Database location
define('DB_LOCATION', 'localhost');     
define('DB_LOGIN_NAME', 'root');        // Database login name
define('DB_LOGIN_PASS', '123456');    // Database password
define('DB_NAME', 'adps');              // Database name

define('NOR_USR_LOGIN_OK', 2);
define('LOCATION_LOGIN_OK', 1);
define('ADMIN_LOGIN_OK', 0);
define('NO_USERNAME_LOGIN', -1);
define('NO_PASSWORD_LOGIN', -2);
define('DB_CONN_ERROR', -3);
define('LOGIN_ERROR', -4);

define('PROC_WITH_FFT', 1);
define('PROC_FLAT_DEM', 2);
define('PROC_LITTLE_FLAT_DEM', 4);
define('PROC_FULL_RESOL', 8);

define('SEARCH_IMAGE_PAIR', 1);
define('SEARCH_PAIR_ON_IMAGE', 2);
define('PROC_SEL_PAIRS', 3);
define('REFRESH_PAIR_STATUS', 4);
define('CANCEL_PAIR_PROC', 5);
define('OBTAIN_USER_TYPE', 6);
define('ADD_ADPS_USER', 7);
define('SIGN_OUT_ADPS_USER', 8);
define('OBTAIN_IMAGE_PATH', 9);
define('PROC_SEL_FULL', 10);
define('PROC_ONE_FULL', 11);
define('OBTAIN_LCATION_INFO', 12);
define('UPDATE_LOCATION', 13);
define('PROC_PSI', 14);
define('PROC_PSI_SEL_MST', 15);


define('PER_SEARCH', 1);
define('PER_VIEW_RESULT', 2);
define('PER_DL_RESULT', 4);
define('PER_PROC_PAIR', 8);
define('PER_PROC_FULL', 16);
define('PER_PRI_LOW', 32);
define('PER_PRI_HIGH', 64);
define('PER_DL_TABLE', 128);
define('PER_MAN_USER', 256);
define('PER_CANCEL_PROC', 512);
define('PER_CANCEL_OTHER_PROC', 1024);
define('PER_DL_GIS_RESULT', 2048);
define('PER_DL_ALL_RESULT', 4096);
define('PER_DL_ALL_GIS_RESULT', 8192);
define('PER_MAN_LOCATION', 16384);

define('HTTP_HOME', 'http://129.94.30.126:8080/');

define('SYSTEM_ADPS_RUN', 'ADPSConnect.exe 129.94.56.126');
define('RESULT_MOUNT_HOME', 'D:/ADPS/ADPS_STORAGE/');

define('DL_ALL_RESULTS', 0);
define('DL_ALL_GIS_INFO', 1);


require_once('adps_server_funcs.php');
require_once('adps_server_interface.php');

?>