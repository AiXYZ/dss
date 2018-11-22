<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

if(isset($_POST['screen'])){
    $screen = $_POST['screen'];
    mysqli_query($db,"INSERT INTO screen (content) VALUES('$screen')");
    $data = array(
        'response' => 'Screen valu inserted successfully',
        'error' => mysqli_error($db)
    );
}else{
    $data = array(
        'response' => 'No screen value',
        'error' => mysqli_error($db)
    );
}

echo json_encode($data);
?>