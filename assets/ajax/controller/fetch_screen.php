<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

$screen_data = "SELECT * from screen";
$screen_data_query = $db->query($screen_data);
while($screen_data_result = mysqli_fetch_assoc($screen_data_query)){
    $data = array(
        'id' => $screen_data_result['id'],
        'content' => $screen_data_result['content']
    );
}

echo json_encode($data);
?>