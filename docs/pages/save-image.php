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
                $id = 0;
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
                        "id": 10'.$id.',
                        "email" : "ivanpier_'.$id.'@gmail.com",
                        "usr" : "ivanpier-'.$id.'",
                        "psw" : "abc123-'.$id.'",
                        "age" : 4'.$id.',
                        "method" : "POST",
                        "avatar" : "'.$file_name.'"
                    },';
                    $id += 1;
                }
                $replace = substr_replace($json, "", -1);
                $replace .= ']';
                // throw new Exception("Messaggio", 200);
                echo $replace;
                
            } // ./is post
        } catch(Exception $error) {
            echo '[{
                "id" : "'.$error->getMessage().'",
                "email" : "'.$error->getCode().'",
                "usr" : "'.$error->getLine().'",
                "psw" : "'.$error->getFile().'",
                "age" : 44,
                "method" : "POST",
                "avatar" : "default.png"
            }]';
        }
