// require_once('db.php');
    // connect mysqli and create database;
    // $script = new Database("localhost", "root", "", "rest_api_demo");
    // $script->insert('Employee',["name"=>"Sajid Ali", "email"=>"email@gmail.com", "age"=>20, "designation"=>"operator"]);
    // $script->update('Employee',["name"=>"Rahul", "email"=>"rahul@gmail.com", "age"=>23, "designation"=>"SDM"], 'id= "9"'); // last where arguments can be : 'city="kapashera" AND email="israfil23.sa@gmail.com" '
    // $script->delete('Employee','id="8"'); // last argument can be define an where condition like this : 'user_id="5" AND user_email="email@gmail.com"'

    // $script->select("Employee","*"); // or $script->select("users","*", null,null,null,null);
    // $script->select("users","*",null,null, null, 2);
    // $script->select("Employee","*",null,null, "id DESC", 5);
    // $script->select("users","*",null,'user_email = "sajid@gmail.com"',null, 5);

    // $script->pagination("Employee", null, null, "10");
    // $data->select("users","*",null,'user_email = "sajid@gmail.com"',null);
    // $data->pagination("users", null, 'user_email = "sajid@gmail.com"');
    // echo "<pre>";
    // print_r($script->getResult());
    // echo "</pre>";

    // when got result getResult(); now you can display the data using foreach function
    //list() : this mentioned will be give an name(key) of value in associate array;  
    // foreach($data->getResult() as list("key"=>"value", "key1"=>"value1", )){ echo  $value, $value1} 
    