<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

if(isset($_FILES['uploadFile']) && !empty($_FILES['uploadFile'])){
    if($_FILES['uploadFile']['error'] > 0){
        $data = array(
            'response' => 'File was not uploaded',
            'thumbnail' => $_POST['thumbnailValue'],
            'error' => $_FILES['uploadFile']['error']
        );
    }else{
        $u_code = uCode();
        $fileName = explode('.', $_FILES['uploadFile']['name']);
        $fileExtension = end($fileName);
        $fileExtensionLength = strlen($fileExtension);
        $dotFileExtensionLength = $fileExtensionLength+1;
        $fileNameWithoutExtension = substr($_FILES['uploadFile']['name'], 0, -$dotFileExtensionLength);
        $encodeFileName = base64_encode($fileNameWithoutExtension);
        $uploadedFileName = $u_code.'_'.$encodeFileName.'.'.$fileExtension;
        
        if(move_uploaded_file($_FILES['uploadFile']['tmp_name'], '../../upload/video/' . $uploadedFileName)){
            
            $nameThumbnail = $u_code.'_'.$encodeFileName.'.png';
            $base64String = $_POST['thumbnailValue'];
            $fileThumbnail = fopen('../../upload/video/'.$nameThumbnail, "wb");
            $dataThumbnail = explode(',', $base64String);
            fwrite($fileThumbnail, base64_decode($dataThumbnail[1]));
            fclose($fileThumbnail);
            
            mysqli_query($db,"INSERT INTO content (file_name, file_thumbnail, file_type) VALUES('$uploadedFileName', '$nameThumbnail', 'video')");
            
            $data = array(
                'response' => 'File successfully uploaded',
                'thumbnail' => $nameThumbnail,
                'file' => $uploadedFileName
            );
        }else{
            $data = array(
                'response' => 'File was not moved',
                'thumbnail' => $_POST['thumbnailValue'],
                'file' => $_FILES['uploadFile']['name']
            );
        }
    }
}else{
    $data = array(
        'response' => 'File was not chosen',
        'thumbnail' => $_POST['thumbnailValue'],
        'error' => $_FILES['uploadFile']['error'][$i]
    );
}

echo json_encode($data);
?>