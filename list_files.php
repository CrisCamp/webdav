<?php
$files = scandir('/var/www/webdav');
$file_list = array_diff($files, array('..', '.'));
echo json_encode($file_list);
?>
