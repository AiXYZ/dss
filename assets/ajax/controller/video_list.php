<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

$video_data = "SELECT * from content WHERE file_type = 'video'";
$video_data_query = $db->query($video_data);
while($video_data_result = mysqli_fetch_assoc($video_data_query)){
    $fileName = explode('.', $video_data_result['file_name']);
    $fileExtension = end($fileName);
    $fileExtensionLength = strlen($fileExtension);
    $dotFileExtensionLength = $fileExtensionLength+1;
    $fileNameWithoutExtension = substr($video_data_result['file_name'], 0, -$dotFileExtensionLength);
    
    $fileNameB64 = explode('_', $fileNameWithoutExtension);
    $fileUcodeB64 = current($fileNameB64);
    $fileUcodeLength = strlen($fileUcodeB64);
    $underscoreFileUcodeLength = $fileUcodeLength+1;
    $encodeFileName = substr($fileNameWithoutExtension, $underscoreFileUcodeLength);
    $decodeFileName = base64_decode($encodeFileName);
    
    $data[] = array(
        'id' => $video_data_result['id'],
        'file_name' => $video_data_result['file_name'],
        'file_thumbnail' => $video_data_result['file_thumbnail'],
        'actual_file_name' => $decodeFileName,
    );
}

echo json_encode($data);
?>