<?php
include_once 'db.php';
include_once 'function.php';

$data = array();

if(isset($_FILES['uploadFile']) && !empty($_FILES['uploadFile'])){
    $fileCount = count($_FILES['uploadFile']['name']);
    for($i = 0; $i < $fileCount; $i++){
        if($_FILES['uploadFile']['error'][$i] > 0){
            $data[] = array(
                'response' => 'File was not uploaded',
                'error' => $_FILES['uploadFile']['error'][$i]
            );
        }else{
            $fileName = explode('.', $_FILES['uploadFile']['name'][$i]);
            $fileExtension = end($fileName);
            $fileExtensionLength = strlen($fileExtension);
            $dotFileExtensionLength = $fileExtensionLength+1;
            $fileNameWithoutExtension = substr($_FILES['uploadFile']['name'][$i], 0, -$dotFileExtensionLength);
            $encodeFileName = base64_encode($fileNameWithoutExtension);
            $uploadedFileName = uCode().'_'.$encodeFileName.'.'.$fileExtension;
            
            if(move_uploaded_file($_FILES['uploadFile']['tmp_name'][$i], '../../upload/image/' . $uploadedFileName)){
                mysqli_query($db,"INSERT INTO content (file_name, file_type) VALUES('$uploadedFileName', 'image')");
                $data[] = array(
                    'response' => 'File successfully uploaded',
                    'file' => $uploadedFileName
                );
            }else{
                $data[] = array(
                    'response' => 'File was not moved',
                    'file' => $_FILES['uploadFile']['name'][$i]
                );
            }
        }
    }
}else{
    $data[] = array(
        'response' => 'File was not chosen',
        'error' => $_FILES['uploadFile']['error'][$i]
    );
}

echo json_encode($data);
?>