var current_year = (new Date().getFullYear()).toString();
var targetDate = new Date("Dec 25, " + current_year + " 15:37:25").getTime();
console.log(targetDate +1)
var house = document.getElementById("house")
var christmasSong = ["JingleBellPiano.mp3","OChristmasTree.mp3", "WeWishYouAMerryChristmas.mp3","dingDongMerrily.mp3","herald.mp3"]
var currSong = 0
var angle = 0;

for (var source of christmasSong) {
  let aud = document.createElement("audio");
  aud.src = source;
  document.body.appendChild(aud);
}

function playsong () {
  var song = document.getElementsByTagName("audio")[currSong];
  song.play()
  song.onended = function () {
    if (currSong<4) {
      currSong++
    }else {
      currSong=0
    }
    playsong();
  }
}

//declaring canvas id and putting the width and height as the screens
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var arrow = document.getElementById("creditSlide");

document.body.onload = function () {
  arrow.addEventListener("click", creditsliding, false);
  var x = setInterval(function() {
    var currtime = new Date().getTime();
    var gaps = targetDate - currtime;

    var days = Math.floor(gaps/ (1000 * 60 * 60 * 24));
    var hours = Math.floor((gaps % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((gaps % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((gaps % (1000 * 60)) / 1000);

    var timer = document.getElementById("timer")
    timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    if (gaps<= 0 && gaps>=-518400000) {
        merryChristmas()
        drawdecor()
        playsong()
        timer.style.visibility = "hidden"
        canvas.style.visibility = "visible";
    }
    else if (gaps<=6.048e+8) {
      drawdecor()
      playsong()
      canvas.style.visibility = "visible";
      if (gaps<5 * 60 * 1000 && gaps>0) {
        timer.style.animation = "peektime 1s infinite";
      }
    }
    //after christmas
    else if (gaps <=-518400000) {
      timer.style.visibility = "visible"
      targetDate = new Date("Dec 25, " + (current_year+1) + " 15:37:25").getTime();
    }
  }, 1000)

//start snowing at the 7th day before christmas

	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//canvas dimensions
	var width = window.innerWidth;
	var height = window.innerHeight;
	canvas.width = width;
	canvas.height = height

	//snowflake particles
  density=0
  if (width>381 || height>500) {
    density=100
  }else {
    density = 50;
  }
	var particles = [];
	for(var i = 0; i < density; i++)
	{
		particles.push({
			x: Math.random()*width, //x-coordinate
			y: Math.random()*height, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*density
		})
	}

	function drawSnow()
	{
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < density; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		updatedraw();
	}

	var angle = 0;
	function updatedraw()
	{
		angle += 0.001;
    //redraw the snow to the top of the
		for(var i = 0; i < density; i++)	{
			var p = particles[i];
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			if(p.y > height){
				if(i%3 > 0) {
					particles[i] = {x: Math.random()*width, y: -10, r: p.r, d: p.d};
				}
			}
		}
	}

	//animation loop
	setInterval(drawSnow, 33);
}

//drawing house ,snow floor and tree
function drawdecor () {
  var house = document.getElementById("house");
  var snowfloor = document.getElementById("snowFloor")
  var tree = document.getElementById("tree")

  house.style.visibility = "visible"
  snowFloor.style.visibility = "visible"
  tree.style.visibility = "visible"
}

//make the merry christmas text visible
function merryChristmas() {
  christmastext = document.getElementById("text")
  christmastext.style.visibility="visible"
  setInterval(changeColor,1500)
}

//random colour generator in rgb
function randColorRGB () {
		var x =[]
		for (var i=0;i<3;i++) {
			x[i] = Math.floor(Math.random() * (255 - 155 + 1)) + 155;
			x[i] = x[i].toString()
		}
		return "rgb(" + x[0] + "," + x[1] + "," + x[2] + ")";
}

//function to change the stroke colour of the text
function changeColor () {
  var text = document.getElementById("text")
  text.style.webkitTextStrokeColor = randColorRGB();
}

//function to popup the credit section

function creditsliding () {
  var creditText = document.getElementById("creditText");
  if (creditText.style.opacity==0) {
    //creditText.style.display="block"
    creditText.style.opacity=1
  }else {
    //creditText.style.display = "none";
    creditText.style.opacity=0
  }
}
