<?php 
function uCode(){
    $dateValue  = date("YmdHis");
    $microtime = explode('.', microtime(true));
    $microtimeValue = $microtime[1];
    $randValue = rand(1000, 9999);
    
    return $dateValue."".$microtimeValue."".$randValue;
}

?>