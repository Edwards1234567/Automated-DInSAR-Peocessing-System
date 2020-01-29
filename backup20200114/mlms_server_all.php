<?php

// macros for DB operation
define('DB_LOCATION', 'localhost');     // Database location
define('DB_LOGIN_NAME', 'root');        // Database login name
define('DB_LOGIN_PASS', '123456');    // Database password
define('DB_NAME', 'mlms');              // Database name

define('NOR_USR_LOGIN_OK', 2);
define('LOCATION_LOGIN_OK', 1);
define('ADMIN_LOGIN_OK', 0);
define('NO_USERNAME_LOGIN', -1);
define('NO_PASSWORD_LOGIN', -2);
define('DB_CONN_ERROR', -3);
define('LOGIN_ERROR', -4);

define('OBTAIN_LICENSE_INFO', 1);
define('ADD_LICENSE_INFO', 2);
define('UPDATE_LICENSE_INFO', 3);
define('CHECK_LICENSE_INFO', 4);
define('OBTAIN_COOR_INFO', 5);
define('DELETE_LICENSE_INFO', 6);
define('ADD_LICENSE_COOR', 7);
define('DELETE_LICENSE_COOR', 8);
define('UPDATE_LICENSE_COOR', 9);
define('LOGOUT_SYSTEM', 10);


define('HTTP_HOME', 'http://129.94.56.7:8080/');
define('SYSTEM_ADPS_RUN', 'ADPSConnect.exe 129.94.56.25');
define('RESULT_MOUNT_HOME', 'D:/ADPS/ADPS_STORAGE/');


require_once('mlms_server_funcs.php');
require_once('mlms_server_interface.php');

?>