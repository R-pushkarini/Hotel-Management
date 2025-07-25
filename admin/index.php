<?php 
require('inc/essentials.php');
require('inc/db_config.php');
session_start();
session_regenerate_id(true);
   if((isset($_SESSION['adminLogin'])&& $_SESSION['adminLogin']==true)){
   redirect('dashboard.php');
   } 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="css/#commoncss">
<style>
.login-form{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
}
</style>
</head>
<body class="bg-light">
        <div class="login-form text-center rounded bg-white shadow overflow-hidden">
        <form method="POST">
            <h4 class="bg-dark text-white py-3">ADMIN LOGIN PANEL</h4>
            <div class="p-4">
            <div class="mb-3">
                <input name="admin_name" required type="text" class="form-control shadow-none text-center" placeholder="Admin Name">
            </div>
            <div class="mb-3">
                <input name="admin_pass" required type="password" class="form-control shadow-none text-center" placeholder="Password">
            </div>
            <button name="login" type="submit" class="btn btn-outline-dark custom-bg shadow-none">Login</button>
            </div>
        </form>
        </div>
    <?php 
    if(isset($_POST['login'])){
        $frm_data=filteration($_POST);
        $query="SELECT * FROM `admin_cred` WHERE `admin_name`=? AND `admin_pass`=?";
        $values=[$frm_data['admin_name'],$frm_data['admin_pass']];
        $res=select($query,$values,"ss");
        if($res->num_rows==1){
            $row=mysqli_fetch_assoc($res);
            $_SESSION['adminLogin']=true;
            $_SESSION['adminId']=$row['sr_no'];
            redirect('dashboard.php');
        }
        else{
        alert('error','Login failed-Invalid Credentials');
        }
    }
    ?>
<?php require('inc/script.php');?>
</body>
</html>