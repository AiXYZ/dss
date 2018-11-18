<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

$image_data = "SELECT * from content";
$image_data_query = $db->query($image_data);
while($image_data_result = mysqli_fetch_assoc($image_data_query)){
    
    $fileName = explode('.', $image_data_result['file_name']);
    $fileExtension = end($fileName);
    $fileExtensionLength = strlen($fileExtension);
    $dotFileExtensionLength = $fileExtensionLength+1;
    $fileNameWithoutExtension = substr($image_data_result['file_name'], 0, -$dotFileExtensionLength);
    
    $fileNameB64 = explode('_', $fileNameWithoutExtension);
    $fileUcodeB64 = current($fileNameB64);
    $fileUcodeLength = strlen($fileUcodeB64);
    $underscoreFileUcodeLength = $fileUcodeLength+1;
    $encodeFileName = substr($fileNameWithoutExtension, $underscoreFileUcodeLength);
    $decodeFileName = base64_decode($encodeFileName);
    
    $data[] = array(
        'id' => $image_data_result['id'],
        'file_name' => $image_data_result['file_name'],
        'actual_file_name' => $decodeFileName,
    );
}

echo json_encode($data);
?>