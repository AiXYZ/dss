<?php
include('db.php');

//mysqli_query($db,"INSERT INTO content (file_name) VALUES('test2')");

$data_all = array();

if(isset($_FILES['uploadFile']) && !empty($_FILES['uploadFile'])){
    $fileCount = count($_FILES['uploadFile']['name']);
    for($i = 0; $i < $fileCount; $i++){
        if($_FILES['uploadFile']['error'][$i] > 0){
            $data = array('response' => 'There was an error uploading file', 'error' => $_FILES['uploadFile']['error'][$i]);
            array_push($data_all, $data);
        }else{
            if(file_exists('../../upload/image/' . $_FILES['uploadFile']['name'][$i])){
                $data = array('response' => 'File already exists', 'file' => $_FILES['uploadFile']['name'][$i]);
                array_push($data_all, $data);
            }else{
                move_uploaded_file($_FILES['uploadFile']['tmp_name'][$i], '../../upload/image/' . $_FILES['uploadFile']['name'][$i]);
                $data = array('response' => 'File successfully uploaded', 'file' => $_FILES['uploadFile']['name'][$i]);
                array_push($data_all, $data);
            }
        }
    }
}else{
    $data = array('response' => 'Please choose at least one file', 'error' => $_FILES['uploadFile']['error'][$i]);
    array_push($data_all, $data);
}

echo json_encode($data_all);
?>