<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Max-Age: 10000");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once 'database/db.php';
    require_once 'PHPMailer/mailer.php';

    if(!empty($_SERVER['REQUEST_METHOD'])){
        $osms = new Database("localhost", "root", "", "osms_db");
        // $password = 123456;
        // $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        // $osms->update('adminlogin_tb',["a_password"=>$passwordHash]);
        // USER API 
        if(isset($_GET['verifyMail'])){
            $email = $_POST['email'];
            $sql =  $osms->select("requesterlogin_tb","*",null,'r_email = "'.$email.'"',null, 1);
            $result =  $osms->getResult();
            $status = json_decode($result);
            if(!$status[1]->get[0]->data){
                $otp =  mt_rand(100000,999999);
                $osms->insert('otp_verification',["otp"=>$otp]);
                $otpResult = $osms->getResult();
                $otpStatus = json_decode($otpResult);
                // print_r($otpStatus[0]->post[0]->status);
                if($otpStatus[0]->post[0]->status==1){
                    $name = $_POST['name'];
                    $email = $_POST['email'];
                    $mail = new Mailer();
                    $mail-> smtp = "smtp.gmail.com";
                    $mail->fromEmail = "";
                    $mail->fromPassword = "";
                    $mail->fromName = "OSMS";
                    $mail->toEmail = $_POST['email'];

                    $mail->subject = "OSMS Registration";
                    $mail->bodyHTML = "hey ! $name <br> <br> Your OSMS registration verify email ($email) OTP is <b> $otp </b>  <br> <br> Webiste Name : -Online Management System Service-<br>Terms & Conditions 2022";
                    $mail->bodyText = "hey !  $name   Your OSMS registration OTP is  $otp   -Online Management System Service-Terms & Conditions 2022";
                    $mail->sendMail();
                    echo $mail->getResult();
                }else {
                    echo $osms->getResult();
                }
            }else {
                echo json_encode(array("message"=>"This is email address already exits", "status"=>2));
            }
        }else if(isset($_GET['newUser'])){
            $OTP = (int)$_POST['OTP'];
            $osms->select("otp_verification", '*', null, null, "otp_id desc", "1");
            $result = $osms->getResult();
            $status = json_decode($result);
            if($status[1]->get[0]->status == 1){
                if($status[1]->get[0]->data[0]->otp==$OTP){
                    $osms->delete("otp_verification");
                    $password = $_POST['password'];
                    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                    $osms->insert('requesterlogin_tb',["r_name"=>$_POST['name'], "r_email"=>$_POST['email'], "r_password"=>$passwordHash]);
                    echo $osms->getResult();
                }else {
                    echo json_encode(array("message"=>"OTP is incorrect", "status"=>0));
                }
            }else {
                echo json_encode(array("message"=>"OTP could not get", "status"=>2));
            }
        }else if(isset($_GET['sentMail'])){
            $email = $_POST['email'];
            $name = $_POST['name'];
            $subject = $_POST['subject'];
            $message = $_POST['message'];
            
            $mail = new Mailer();
            $mail-> smtp = "smtp.gmail.com";
            $mail->fromEmail = "";
            $mail->fromPassword = "";
            $mail->fromName = "OSMS";
            $mail->toEmail = $email;
            $mail->subject = $subject;
            $mail->bodyHTML = "Hello Sir/Medam <br>
                            My Name is $name <br> <br>
                            $message <br> <br> 
                            Thanks & Regards <br>
                            Name : $name <br>
                            Email : $email <br>";
            $mail->bodyText = "hello! my name is  $name , $message";
            $mail->sendMail();
            echo $mail->getResult();
    }else if(isset($_GET['loginUser'])){
            $email = $_POST['email'];
            $password = $_POST['password'];
            $sql =  $osms->select("requesterlogin_tb","*",null,'r_email = "'.$email.'"',null, 1);
            $result =  $osms->getResult();
            $status = json_decode($result);
            // print_r();
            if($status[1]->get[0]->data){
                $serverPassword = $status[1]->get[0]->data[0]->r_password;
                if(password_verify($password, $serverPassword)){
                    echo json_encode(array("message"=> "login success", "status"=>1, "data"=>$status[1]->get[0]->data));
                }else {
                    echo json_encode(array("message"=> "Password is wrong !", "status"=>0));
                }
            }else {
                echo json_encode(array("message"=> "Email address does not exist !", "status"=>2));
            }
    }else if(isset($_GET['singleUser']) && isset($_GET['email'])){
            $email = $_GET['email'];
            $sql =  $osms->select("requesterlogin_tb","*",null,'r_email = "'.$email.'"',null, 1);
            echo $osms->getResult();            
            
    }else if(isset($_GET['changeName'])){
            $id = (int)$_POST['id'];
            $name = $_POST['name'];
            $osms->update("requesterlogin_tb",["r_name"=>$name], 'r_login_id= "'.$id.'"');
            echo $osms->getResult();            

    }else if(isset($_GET['submitRequest'])){
            $osms->insert("submitrequest_tb",[
                "request_info" => $_POST["requestinfo"],
                "request_desc" => $_POST["requestdesc"],
                "requester_name" => $_POST["requestername"],
                "requester_add1" => $_POST["requesteradd1"],
                "requester_add2" => $_POST["requesteradd2"],
                "requester_city" => $_POST["requestercity"],
                "requester_state" => $_POST["requesterstate"],
                "requester_zip" => $_POST["requesterzip"],
                "requester_email" => $_POST["requesteremail"],
                "requester_mobile" => $_POST["requestermobile"]
            ]);
            echo $osms->getResult();

    }else if(isset($_GET['id']) && isset($_GET['requestStatus'])){
            $id = (int)$_GET['id'];
            $sql =  $osms->select("assignwork_tb","*", null,'request_id= "'.$id.'"');
            echo $osms->getResult();     

    }else if(isset($_GET['changePassword'])){
            $id = (int)$_POST['id'];
            $oldPassword = $_POST['oldPassword'];
            $osms->select("requesterlogin_tb", "*", null, 'r_login_id= "'.$id.'"', null, 1);
            $result =  $osms->getResult();
            $status = json_decode($result);
            if($status[1]->get[0]->data){

                $serverPassword = $status[1]->get[0]->data[0]->r_password;
                if(password_verify($oldPassword, $serverPassword)){

                    $newPassword = $_POST['newPassword'];
                    $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
                    $sql =  $osms->update("requesterlogin_tb",["r_password"=>$newPasswordHash], 'r_login_id= "'.$id.'"');
                    echo $osms->getResult();
                }else {
                    echo json_encode(array("message"=>"Old Password was wrong", "status"=>2));
                }
            }else {
                echo json_encode(array("message"=>"This is id does not exist", "status"=>3));
            }
            // ADMIN API
        }else if(isset($_GET['loginAdmin'])){
            $email = $_POST['email'];
            $password = $_POST['password'];
            $sql =  $osms->select("adminlogin_tb","*",null,'a_email = "'.$email.'"',null, 1);
            $result =  $osms->getResult();
            $status = json_decode($result);
            // print_r($status[1]->get[0]->data);
            if($status[1]->get[0]->data){
                $serverPassword = $status[1]->get[0]->data[0]->a_password;
                if(password_verify($password, $serverPassword)){
                    echo json_encode(array("message"=> "login success", "status"=>1, "data"=>$status[1]->get[0]->data));
                }else {
                    echo json_encode(array("message"=> "Password is wrong !", "status"=>0));
                }
            }else {
                echo json_encode(array("message"=> "Email address does not exist !", "status"=>2));
            }

    }else if(isset($_GET['singleAdmin'])){
        $email = $_GET['email'];
        $sql =  $osms->select("adminlogin_tb","*",null,'a_email = "'.$email.'"',null, 1);
        echo $osms->getResult();

    }else if(isset($_GET['newAssignWork'])){
        $id = (int)$_POST["requestid"];
            $osms->insert("assignwork_tb",[
                "request_id" => $id,
                "request_info" => $_POST["requestinfo"],
                "request_desc" => $_POST["requestdesc"],
                "requester_name" => $_POST["requestername"],
                "requester_add1" => $_POST["requesteradd1"],
                "requester_add2" => $_POST["requesteradd2"],
                "requester_city" => $_POST["requestercity"],
                "requester_state" => $_POST["requesterstate"],
                "requester_zip" => $_POST["requesterzip"],
                "requester_email" => $_POST["requesteremail"],
                "requester_mobile" => $_POST["requestermobile"],
                "assign_tech" => $_POST["assigntech"]
                // "assign_date" => $_POST["assigndate"]
            ]);
        echo $osms->getResult();

    }else if(isset($_GET['getAssignWork'])){
        $sql =  $osms->select("assignwork_tb");
        echo $osms->getResult();
        
    }else if(isset($_GET['getSingleAssignWork']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->select("assignwork_tb","*", null,'request_id = "'.$id.'"',null);
        echo $osms->getResult();

    }else if(isset($_GET['deleteAssignWork']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->delete("assignwork_tb", 'request_id = "'.$id.'"');
        echo $osms->getResult();

    }else if(isset($_GET['getSubmittedRequest'])){
        $sql =  $osms->select("submitrequest_tb");
        echo $osms->getResult();

    }else if(isset($_GET['getSingleSubmittedRequest']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->select("submitrequest_tb","*", null,'request_id = "'.$id.'"',null);
        echo $osms->getResult();

    }else if(isset($_GET['deleteRequest']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->delete("submitrequest_tb", 'request_id = "'.$id.'"');
        echo $osms->getResult();

    }else if(isset($_GET['getAssets'])){
        $sql =  $osms->select("assets_tb");
        echo $osms->getResult();

    }else if(isset($_GET['deleteAssets']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->delete("assets_tb", 'pid = "'.$id.'"');
        echo $osms->getResult();

    }else if(isset($_GET['getSingleAssets']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->select("assets_tb","*", null,'pid = "'.$id.'"',null);
        echo $osms->getResult();

    }else if(isset($_GET['updateAssets'])){
        $id = $_POST['pid'];
        $osms->update("assets_tb",[
            "pname"=>$_POST['pname'],
            "pdop"=>$_POST['pdop'],
            "pava"=>$_POST['pava'],
            "ptotal"=>$_POST['ptotal'],
            "poriginalcost"=>$_POST['poriginalcost'],
            "psellingcost"=>$_POST['psellingcost'],
        ], 'pid= "'.$id.'"');
        echo $osms->getResult();

    }else if(isset($_GET['addAssets'])){
        $osms->insert("assets_tb",[
            "pname"=>$_POST['pname'],
            "pdop"=>$_POST['pdop'],
            "pava"=>$_POST['pava'],
            "ptotal"=>$_POST['ptotal'],
            "poriginalcost"=>$_POST['poriginalcost'],
            "psellingcost"=>$_POST['psellingcost'],
        ]);
        echo $osms->getResult();

    }else if(isset($_GET['sellAssets'])){

        $osms->insert("customer_tb",[
            "productid"=>$_POST['pid'],
            "custname"=>$_POST['cname'],
            "custadd"=>$_POST['cadd'],
            "cpname"=>$_POST['pname'],
            "cpquantity"=>$_POST['pquantity'],
            "cpeach"=>$_POST['psellingcost'],
            "cptotal"=>$_POST['totalcost']
        ]);
        $id = (int)$_POST['pid'];
        $osms->update("assets_tb",["pava"=>$_POST['pava']], 'pid= "'.$id.'"');
        echo $osms->getResult();
    }
    // requester file
else if(isset($_GET['getRequester'])){
        $sql =  $osms->select("requesterlogin_tb");
        echo $osms->getResult();

    }else if(isset($_GET['deleteRequester']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->delete("requesterlogin_tb", 'r_login_id = "'.$id.'"');
        echo $osms->getResult();

    }else if(isset($_GET['getSingleRequester']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->select("requesterlogin_tb","*", null,'r_login_id = "'.$id.'"',null);
        echo $osms->getResult();

    }else if(isset($_GET['updateRequester'])){
        $id = $_POST['r_login_id'];
        $osms->update("requesterlogin_tb",[
            "r_name"=>$_POST['r_name'],
            "r_email"=>$_POST['r_email'],
        ], 'r_login_id= "'.$id.'"');

        echo $osms->getResult();

    }else if(isset($_GET['addRequester'])){
        $password = $_POST['r_password'];
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $osms->insert('requesterlogin_tb',["r_name"=>$_POST['r_name'], "r_email"=>$_POST['r_email'], "r_password"=>$passwordHash]);
        echo $osms->getResult();
    }
    // techincian
    else if(isset($_GET['getTechnician'])){
        $sql =  $osms->select("technician_tb");
        echo $osms->getResult();

    }else if(isset($_GET['deleteTechnician']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->delete("technician_tb", 'empid = "'.$id.'"');
        echo $osms->getResult();

    }else if(isset($_GET['getSingleTechnician']) && isset($_GET['id'])){
        $id = $_GET['id'];
        $sql =  $osms->select("technician_tb","*", null,'empid = "'.$id.'"',null);
        echo $osms->getResult();

    }else if(isset($_GET['updateTechnician'])){
        $id = $_POST['id'];
        $osms->update("technician_tb",
        [
            "empName"=>$_POST['empName'],
            "empCity"=>$_POST['empCity'],
            "empMobile"=>$_POST['empMobile'],
            "empEmail"=>$_POST['empEmail']
        ], 'empid= "'.$id.'"');

        echo $osms->getResult();

    }else if(isset($_GET['addTechnician'])){
        $osms->insert('technician_tb',
        [
            "empName"=>$_POST['empName'],
            "empCity"=>$_POST['empCity'],
            "empMobile"=>$_POST['empMobile'],
            "empEmail"=>$_POST['empEmail']
        ]);
        echo $osms->getResult();
    }else if(isset($_GET['getWorkReport'])){
        $startdate = $_GET['start'];
        $enddate = $_GET['end'];
        $osms->select("assignwork_tb","*", null,"assign_date BETWEEN '$startdate' AND '$enddate'");
        echo $osms->getResult();
    }else if(isset($_GET['getSellReport'])){
        $startdate = $_GET['start'];
        $enddate = $_GET['end'];
        $osms->select("customer_tb","*", null,"cpdate BETWEEN '$startdate' AND '$enddate'");
        echo $osms->getResult();
    }else if(isset($_GET['adminChange'])){
        $password = $_POST['aPassword'];
        $email = $_POST['aEmail'];
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $osms->update('adminlogin_tb',["a_password"=>$passwordHash], 'a_email = "'.$email.'"');
        echo $osms->getResult();

    }else if(isset($_GET['sentOTP'])){
        $email = $_POST['email'];
        if(isset($_POST['admin'])){
            $sql =  $osms->select("adminlogin_tb","*",null,'a_email = "'.$email.'"',null, 1);
        }else {
            $sql =  $osms->select("requesterlogin_tb","*",null,'r_email = "'.$email.'"',null, 1);
        }
        $result =  $osms->getResult();
        $status = json_decode($result);
        if(!$status[1]->get[0]->data){
            echo json_encode(array("message"=>"Email address does not exits", "status"=>2, "ok"=>$status[1]->get[0]->data, "email"=>$email));
        }else {
            if(isset($_POST['admin'])){
                $name = $status[1]->get[0]->data[0]->a_name;
            }else {
                $name = $status[1]->get[0]->data[0]->r_name;
            }
            $otp =  mt_rand(100000,999999);
            $osms->insert('otp_verification',["otp"=>$otp]);
            $otpResult = $osms->getResult();
            $otpStatus = json_decode($otpResult);
            // print_r($otpStatus[0]->post[0]->status);
            if($otpStatus[0]->post[0]->status==1){
                $email = $_POST['email'];
                $mail = new Mailer();
                $mail-> smtp = "smtp.gmail.com";
                $mail->fromEmail = "";
                $mail->fromPassword = "";
                $mail->fromName = "OSMS";
                $mail->toEmail = $_POST['email'];
                
                $mail->subject = "OSMS OTP";
                $mail->bodyHTML = "hey ! $name <br> <br> Your OSMS login forget password OTP is  ($email) OTP is <b> $otp </b>  <br> <br> Webiste Name : -Online Management System Service-<br>Terms & Conditions 2022";
                $mail->bodyText = "hey !  $name   Your OSMS login forget password OTP is  $otp   -Online Management System Service-Terms & Conditions 2022";
                $mail->sendMail();
                echo $mail->getResult();
            }else {
                echo $osms->getResult();
            }
        }
    }else  if(isset($_GET['changePass'])){
        $OTP = (int)$_POST['OTP'];
        $email = $_POST['email'];

        $osms->select("otp_verification", '*', null, null, "otp_id desc", "1");
        $result = $osms->getResult();
        $status = json_decode($result);
        if($status[1]->get[0]->data[0]->otp==$OTP){
                $passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                if(isset($_POST['admin'])){
                    $sql =  $osms->update("adminlogin_tb",["a_password"=>$passwordHash], 'a_email= "'.$email.'"');
                }else {
                    $sql =  $osms->update("requesterlogin_tb",["r_password"=>$passwordHash], 'r_email= "'.$email.'"');
                }
                $osms->delete("otp_verification");
                echo $osms->getResult();
            }else {
                echo json_encode(array("message"=>"OTP is incorrect", "status"=>0));
            }
    }else {
        echo json_encode("server does not recieved any params");
    }
}else {
    echo json_encode("server does not recieved any http verbs");
}