<?php 
    header('Access-Control-Allow-Origin: *'); // IMPORTANTE CORS “Access-Control-Allow-Origin” mancante
    header("Access-Control-Expose-Headers: Content-Length, X-JSON");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept, Accept-Language, X-Authorization");
    header('Access-Control-Max-Age: 86400');
    header('Content-Type: application/json; charset=UTF-8');

    try {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                // throw new Exception("nuovo messaggio METHOD POST", 154);
                $POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
                // function copy
                $json = "[";
                for($i = 0; $i < $POST['numImage']; $i++) {
                    $file = $_FILES['images'.$i];
                    // $temp = $file['tmp_name'];
                    $uid = uniqid();
                    $file_name = $uid."-".$_FILES['images'.$i]['name'];
                    $path_folder = "../avatar/".$file_name;
                    copy($_FILES['images'.$i]['tmp_name'], $path_folder);
                    chmod($path_folder, 777);
                    $json .= '{
                        "id": 101,
                        "email" : "ivanpier@gmail.com",
                        "usr" : "ivanpier",
                        "psw" : "abc123",
                        "age" : 44,
                        "method" : "POST",
                        "avatar" : "'.$file_name.'"
                    },';
                }
                $replace = substr_replace($json, "", -1);
                $replace .= ']';
                echo $replace;
                
            } // ./is post
        } catch(Exception $error) {
            echo '[{
                "val1" : "'.$error->getMessage().'",
                "val2" : "'.$error->getCode().'",
                "val3" : "'.$error->getLine().'"
            }]';
        }
