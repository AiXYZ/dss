<?php
include('db.php');

//mysqli_query($db,"INSERT INTO content (file_name) VALUES('test2')");

$data = array();

if(isset($_FILES['files']) && !empty($_FILES['files'])){
    $no_files = count($_FILES["files"]['name']);
    for($i = 0; $i < $no_files; $i++){
        if($_FILES["files"]["error"][$i] > 0){
            $data = array('response' => 'There was an error uploading file', 'error' => $_FILES["files"]["error"][$i]);
        }else{
            if(file_exists('../../upload/image/' . $_FILES["files"]["name"][$i])){
                $data = array('response' => 'File already exists', 'error' => $_FILES["files"]["name"][$i]);
            }else{
                move_uploaded_file($_FILES["files"]["tmp_name"][$i], '../../upload/image/' . $_FILES["files"]["name"][$i]);
                $data = array('response' => 'File successfully uploaded', 'error' => $_FILES["files"]["name"][$i]);
            }
        }
    }
}else{
    $data = array('response' => 'Please choose at least one file', 'error' => $_FILES["files"]["error"][$i]);
}

echo json_encode($data);
?>