<!DOCTYPE HTML>
<html>
	<head>
		<title>Ball In Space Game</title>
	</head>
	<body id="body" onload="showInfo()">
		<script src="script.js"></script>
		<div style="font-size:40px;">
		Your score is: <span style="font-size:50px;" id="score"></span>
		<form id="form" action="submit.php" method="POST">
		<input type="hidden" id="theScore" name="score" value="0"></input>
		<label for="name">Name: </label> <input type="text" style="height:40px;font-size:40px;" name="name"></input>
		<input type="button" style="height:50px;font-size:40px;" id="theButton" onclick="formSubmit()" value="Submit">
		</form>
		<p></p>
		<?php
		$connection['server'] = "localhost";
$connection['username']= "xxx";
$connection['password']= "xxx";
$connection['dbname']= "xxx";
$con=mysqli_connect($connection['server'],$connection['username'],$connection['password'],$connection['dbname']);
		$result = mysqli_query($con,"SELECT * FROM Scores ORDER BY score DESC LIMIT 0,10");
		echo '<div align ="center"><table width="50%" border="1">
    		<tr>
     	 	<td width="5%" bgcolor="#999999">No.</td>
      <td width="64%" bgcolor="#999999">Name</td>
      <td width="33%" bgcolor="#999999">Score</td>
    </tr>';
$num = 1;
while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
      echo "<td>".$num."</td>";
      echo "<td>".$row['name']."</td>
      <td>".$row['score']."</td>
    </tr>";
    $num++;
  }
echo "</table></div>"
		?>
		</div>
	</body>
</html>