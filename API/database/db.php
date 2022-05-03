<?php
// error_reporting(0);// hide all error from browser
class Database{
    private $mysqli = "";
    private $conn = false;
    private $result = array();
    private $db_name;
    private  $totalRow;
    public $db_host;
    public $db_user;
    public $db_password;

    public function __construct($db_host, $db_user, $db_password, $db_name)
    {
        $this->db_host = $db_host; 
        $this->db_user = $db_user;
        $this->db_password = $db_password;
        $this->db_name = $db_name;
        $database['connectivity'] = array();
        try {
            if(!$this->conn){
                $this->mysqli = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_name);
                    array_push($database['connectivity'], array( "message"=>"Database Connected", "status"=>1)); 
            }else {
                return true;
            }
        }catch (Exception $error){
            array_push($database['database'], array( "message"=>"Error : $error ", "status"=>0)); 
        }
        array_push($this->result, $database);
    }

    public function insert($table,$params=array())
    {
        if($this->tableExists($table)){
            $post['post'] = array();
            try {
                $post['post'] = array();
                $table_key = implode(' , ', array_keys($params));
                $table_value = implode("', '", $params);
                $sql = "INSERT INTO $table ($table_key) VALUES ('$table_value')";
                $this->mysqli->query($sql);
                $lastId = $this->mysqli->insert_id;
                array_push($post['post'], array( "message"=>"Data added", "status"=>1, "lastId"=>$lastId)); 

            }catch(Exception $error){
                array_push($post['post'], array( "message"=>"Data could not added-Error : $error ", "status"=>0)); 
            }
            array_push($this->result, $post);
        }
    }


    public function update($table, $params=array(), $where=null)
    {
        if($this->tableExists($table)){
            $update['update'] = array();
            try {
                
                $args = array();
                foreach($params as $key => $value)
                {
                    $args[] = "$key = '$value'";
                }
                $sql = "UPDATE $table SET " .implode(', ',$args);
                if($where !=null){
                    $sql .=" WHERE $where"; // continue sql with where using ==> .=
                }
                $this->mysqli->query($sql);
                $affectedRow = $this->mysqli->affected_rows;
                array_push($update['update'], array( "message"=>"Data updated", "status"=>1, "affectedRows"=>$affectedRow)); 

            }catch(Exception $error){
                array_push($update['update'], array( "message"=>"Data could not updated-Error: $error", "status"=>0)); 
            }
            
            array_push($this->result, $update);
        }
    }

    public function delete($table, $where=null)
    {
        if($this->tableExists($table))
        $delete['delete'] = array();
        {
            try {
                $sql = "DELETE FROM $table";
                if($where !=null)
                {
                    $sql .=" WHERE $where";
                }
                $this->mysqli->query($sql);
                $affectedRow = $this->mysqli->affected_rows;
                array_push($delete['delete'], array( "message"=>"Data deleted", "status"=>1, "affectedRows"=>$affectedRow)); 
                
            }catch(Exception $error){
                array_push($delete['delete'], array( "message"=>"Data could not delete-Error: $error", "status"=>0)); 
            }
        }
        array_push($this->result, $delete);
    }


    // select data method
    
    private function sql($sql){ // we had choiced private function becuase we want to use this function witihin class
        $sqlPHPQuery['sqlPHPQuery'] = array();
        try {
            $query = $this->mysqli->query($sql);
            $row = $query->fetch_all(MYSQLI_ASSOC);// MYSQLI_ASSOC: return an array with key and value(thats called associate array)  
            $this->totalRow = $query->num_rows;
            if($query->num_rows > 0 ){
                return $row;
            }else {
                return 0;
            }
        }catch (Exception $error){
            array_push($sqlPHPQuery['sqlPHPQuery'], array( "message"=>"Data could not get-Error: $error", "status"=>0)); 
        }
        array_push($this->result, $sqlPHPQuery);
    }
    
    public function select($table, $rows = "*", $join = null, $where = null, $order = null,$limit = null)
    {
        if($this->tableExists($table))
        {
            $get['get'] = array();
            try {

                $sql = "SELECT $rows FROM $table";
                if($join != null)
                {
                    $sql .= " JOIN $join";
                }
                if($where != null)
                {
                    $sql .= " WHERE $where";
                }
                if($order != null)
                {
                    $sql .= " ORDER BY $order";
                }
                if($limit != null)
                {
                // $sql .= " LIMIT 0, $limit"; // normal  method
                if(isset($_GET['id'])){
                    $page = $_GET['id'];
                }else{
                    $page  = 1;
                }
                $start = ($page-1) * $limit;
                $sql .=" LIMIT $start, $limit";
                }
                // https://localhost/PracticeOPP/database/practice.php?id=4, hit url check pagination working fine, now lets create wtih link and preve and next with using pagination method function 
                // if dont define limit in object, this limit pagination will not work ok
                // print_r($sql);
                $data = $this->sql($sql);
                array_push($get['get'], array( "message"=>"Data Got it","status"=>1, "data"=>$data, "totalRow"=>$this->totalRow)); 

            }catch(Exception $error){
                array_push($get['get'], array( "message"=>"Data could not get-Error: $error", "status"=>0, "totalRow"=>$this->totalRow)); 
            }
            array_push($this->result, $get);
        }
    }

// this pagination for show, how many pages will be created at the times of total number rows of table, and show next an previous page
    public function pagination($table, $join = null, $where = null, $limit = null   )
    {
        if($this->tableExists($table))
        {
            $pagination['pagination'] = array();
            try {
                if($limit != null)
                {
                    $sql = "SELECT COUNT(*) FROM $table";
                    if($join != null)
                    {
                        $sql .= "JOIN $join";
                    }
                    if($where != null)
                    {
                    $sql .= " WHERE $where";
                    }
                    $query  = $this->mysqli->query($sql);
                    $total_record = $query->fetch_array();  // fetch data in array formate
                    $total_record = $total_record[0];
                    $total_page = ceil($total_record /$limit);// if sppose celi(21/2), it will be return 11
                    
                    $url = basename($_SERVER['PHP_SELF']); // getting current page file name
                    if(isset($_GET['id'])){
                        $page = $_GET['id'];
                    }else{
                        $page = 1;
                    }

                    $output = "<ul class=''paginaton'>";
                    $output .= "<li> <a href='".$url."?id=({$page}-1))'> <-- Back </a> </li>";
                    if($total_record > $limit){
                        for($i = 1; $i <=$total_page; $i++){
                            if($i== $page){
                                $cls = "class='active'";
                            }else{
                                $clas   = "";
                            }
                            $output .= "<li> <a href='".$url."?id={$i}'> $i </a> </li>";
                        }
                    }
                    $output .= "<li> <a href='".$url."?id=({$page}+1)'> Next -->  </a> </li>";
                    $output .= "</ul>";
                    echo $output; 
                }else{
                    // return false; // for stop method immediately , if limit  not exits.
                    array_push($pagination['pagination'], array( "message"=>"Limitation number is required", "status"=>2)); 
                }
            }catch (Exception $error){
                array_push($pagination['pagination'], array( "message"=>"Data pagination could not get-Error: $error", "status"=>0)); 
            }   
            array_push($this->result, $pagination);
            
        }
    }

    public function tableExists($table){
        $tableExist["tableExist"] = array();        
        try {
            $sql = "SHOW TABLES  FROM ".$this->db_name."  LIKE  '" .$table. "' ";
            $tableQuery = $this->mysqli->query($sql);
            if($tableQuery->num_rows > 0 ){
                return true;
            }else{
                array_push($tableExist['tableExist'], array( "message"=>"table does not exist", "status"=>0)); 

            }
        }catch (Exception $e){
            array_push($tableExist['tableExist'], array( "message"=>"something wrong-Erorr : $e ", "status"=>0)); 
        }
        
        print_r(array_push($this->result, $tableExist));
    }
    
    public function getResult(){
        $val = $this->result;
        $this->result = array();
        return json_encode($val, JSON_PRETTY_PRINT);
    }

    public function __destruct() // at the end this will be called, whenever work is completed, database connection will be automatic close by this destruct functrion
    {
        if($this->conn){
            if($this->mysqli->close()){
                $this->conn = false;
                return true;
            }
        }else{
            return false;
        }
    }
}
?>