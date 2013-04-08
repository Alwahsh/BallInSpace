<?php
$connection['server'] = "localhost";
$connection['username']= "xxx";
$connection['password']= "xxx";
$connection['dbname']= "xxx";
$con=mysqli_connect($connection['server'],$connection['username'],$connection['password'],$connection['dbname']);

// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
$name = $con->real_escape_string($_POST['name']);
$score = $_POST['score'];
mysqli_query($con,"INSERT INTO Scores (name, score) VALUES ('$name','$score')"); 
echo "You Score Was Submitted Successfully! <br /> <a href='index.php'>Go Back</a>";
?>