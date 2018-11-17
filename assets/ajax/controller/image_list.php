<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

$image_data = "SELECT * from content";
$image_data_query = $db->query($image_data);
while($image_data_result = mysqli_fetch_assoc($image_data_query)){
    $data[] = array(
        'id' => $image_data_result['id'],
        'file_name' => $image_data_result['file_name']
    );
}

echo json_encode($data);
?>