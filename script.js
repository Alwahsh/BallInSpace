var canvasWidth = 800;
var canvasHeight = 600;
var fps = 60;
var numOfStars = 20;
var heightOfPlayer = 30;
var widthOfPlayer = 100;
var star = new Array(50);
var mouse = {
	x: 0,
	y: 0
}
var player = new Array(4);

var gameOver = false;
var score = 0;
var scoreSpan;
var form;
function showInfo()
{
document.getElementById("theButton").disabled = true;
scoreSpan = document.getElementById("score");
scoreSpan.innerHTML = score;
form = document.getElementById("form");
}
var speedOfPlayer = 7;
var speedOfBall = 5;
var odx = speedOfBall * Math.random();
var ody = speedOfBall - odx;


var myCanvas = document.createElement("canvas");
myCanvas.style.cursor = "none";
var myBody = document.getElementById("body");
myCanvas.width=canvasWidth;
myCanvas.height=canvasHeight;
myBody.appendChild(myCanvas);

document.addEventListener("mousemove",function (evt){
mouse = getMousePos(myCanvas,evt);
});
document.addEventListener("click",changeColors);

function stayInside(x,a,b)
{
	if (x < a)
		return a;
	if (x > b)
		return b;
	return x;
}

var myContext = myCanvas.getContext("2d");


stars();

setInterval(function() {
	update();
	draw();
}, 1000/fps);

var realScore = 0;
var hacker = false;

function update() {
if(!gameOver)
{
	player[0].x = mouse.x;
	player[0].x = stayInside(player[0].x,heightOfPlayer/2,canvasWidth-player[0].width-heightOfPlayer/2);
	player[1].x = mouse.x;
	player[1].x = stayInside(player[1].x,heightOfPlayer/2,canvasWidth-player[1].width-heightOfPlayer/2);
	player[2].y = mouse.y;
	player[2].y = stayInside(player[2].y,widthOfPlayer/2,canvasHeight-player[2].height-widthOfPlayer/2);
	player[3].y = mouse.y;
	player[3].y = stayInside(player[3].y,widthOfPlayer/2,canvasHeight-player[3].height-widthOfPlayer/2);
	ball.update();
	bouncing();
	if (realScore - score > 1)
		hacker = true;
	realScore = score;
}
else
	document.getElementById("theButton").disabled = false;

}

function draw() {

	myContext.rect(0,0,canvasWidth,canvasHeight);
	myContext.fillStyle = "black";
	myContext.fill();
	drawStars();
	if (!gameOver)
	{
		player[0].draw();
		player[1].draw();
		player[2].draw();
		player[3].draw();
		ball.draw();
	}
	else
	{
		myContext.font = "100px Arial";
		myContext.textAlign = "center";
		myContext.fillText("Game Over!",canvasWidth/2,canvasHeight/2);
		myContext.font = "20px Arial";
		myContext.textAlign = "center";
		myContext.fillText("Type your name and press \"submit\" to submit your score.",canvasWidth/2,canvasHeight/2+ 100);
	}
}

ball = {
	x: canvasWidth/2,
	y: canvasHeight/2,
	dx: odx,
	dy: ody,
	color:"white",
	radius: 10,
	update: function() {
		this.x += this.dx;
		this.y += this.dy;
		if(this.dx < 0)
			this.dx-=0.002;
		else
			this.dx+=0.002;
		if(this.dy < 0)
			this.dy-=0.002;
		else
			this.dy+=0.002;
		if (this.x+10 > canvasWidth || this.x < 10  || this.y+10 > canvasHeight || this.y < 10)
			gameOver = true;
	},
	draw: function() {
		myContext.beginPath();
		myContext.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
		myContext.closePath();
		myContext.fillStyle = this.color;
		myContext.fill()
	}
}

createPlayer(0,canvasWidth/2,canvasHeight-heightOfPlayer-10,widthOfPlayer,heightOfPlayer,"#"+((1<<24)*Math.random()|0).toString(16))
createPlayer(1,canvasWidth/2,10,widthOfPlayer,heightOfPlayer,"#"+((1<<24)*Math.random()|0).toString(16));
createPlayer2(2,10,canvasHeight/2,heightOfPlayer,widthOfPlayer,"#"+((1<<24)*Math.random()|0).toString(16));
createPlayer2(3,canvasWidth-heightOfPlayer-10,canvasHeight/2,heightOfPlayer,widthOfPlayer,"#"+((1<<24)*Math.random()|0).toString(16));

function createPlayer(i,x,y,width,height,color) {
player[i] = {
	color: color,
	x: x,
	y: y,
	width: width,
	height: height,
	draw: function() {
		myContext.fillStyle = this.color;
		myContext.fillRect(this.x,this.y,this.width,this.height);
		myContext.beginPath();
		myContext.arc(this.x,this.y+height/2,height/2,-3.14/2,3.14/2,true);
		myContext.closePath();
		myContext.fill();
		myContext.beginPath();
		myContext.arc(this.x+width,this.y+height/2,height/2,-3.14/2,3.14/2,false);
		myContext.closePath();
		myContext.fill();
	}
};
}

function createPlayer2(i,x,y,width,height,color) {
player[i] = {
	color: color,
	x: x,
	y: y,
	width: width,
	height: height,
	draw: function() {
		myContext.fillStyle = this.color;
		myContext.fillRect(this.x,this.y,this.width,this.height);
		myContext.beginPath();
		myContext.arc(this.x+this.width/2,this.y,width/2,-3.14,3.14,false);
		myContext.closePath();
		myContext.fill();
		myContext.beginPath();
		myContext.arc(this.x+this.width/2,this.y+this.height,width/2,-3.14,3.14,false);
		myContext.closePath();
		myContext.fill();
	}
};
}

function stars() {

        for (i = 0; i < numOfStars; i++) {
          var starX = Math.floor(Math.random() * canvasWidth - 11 - heightOfPlayer) + 10 + heightOfPlayer; 
          var starY = Math.floor(Math.random() * canvasHeight- 11 - heightOfPlayer) + 10 + heightOfPlayer;     
			star[i] = {
				x: starX,
				y: starY
			}
        }
      }

function drawStars() {
	for (i = 0; i < numOfStars; i++) {
		myContext.fillStyle = "White";
        myContext.beginPath();
        myContext.arc(star[i].x, star[i].y, 3, 0, Math.PI * 2, true);
        myContext.closePath();
        myContext.fill();
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function changeColors() {
	for (i = 0; i<4;i++)
	{
		player[i].color = "#"+((1<<24)*Math.random()|0).toString(16);
	}
}

function collides1(a, b) {
  return a.x - a.radius < b.x + b.width +b.height/2 && a.x + a.radius > b.x - b.height/2 && a.y - a.radius < b.y + b.height && a.y + a.radius > b.y;
}

function collides2(a, b) {
  return a.x - a.radius < b.x + b.width && a.x + a.radius > b.x  && a.y - a.radius < b.y + b.width/2 + b.height && a.y + a.radius > b.y - b.width/2;
}

function bouncing() {
	for (i = 0; i < 2; i++) {
		if(collides1(ball,player[i]))
		{
			ball.dy*= -1;
			if (i == 0)
				ball.y = player[i].y-ball.radius;
			else
				ball.y = player[i].y+player[i].height+ball.radius;
			score++;
			scoreSpan.innerHTML = score;
		}
	}
	for (i = 2; i < 4; i++) {
		if(collides2(ball,player[i]))
		{
			ball.dx*= -1;
			if (i == 2)
				ball.x = player[i].x+player[i].width+ball.radius;
			else
				ball.x = player[i].x - ball.radius;
			score++;
			scoreSpan.innerHTML = score;
		}
	}
}

function formSubmit() {
	if (hacker)
		window.location = "hacker.html";
	else
	{
		document.getElementById("theScore").value = score;
		form.submit();
	}
}