var current_year = (new Date().getFullYear()).toString();
var targetDate = new Date("Dec 25, " + current_year + " 15:37:25").getTime();
var house = document.getElementById("house");
var christmasSong = ["JingleBellPiano.mp3","OChristmasTree.mp3", "WeWishYouAMerryChristmas.mp3","dingDongMerrily.mp3","herald.mp3"];
var currSong = angle = 0;

for (var source of christmasSong) {
  let aud = document.createElement("audio");
  aud.src = source;
  document.body.appendChild(aud);
}

function playSong () {
  var song = document.getElementsByTagName("audio")[currSong];
  song.play();
  song.onended = function () {
    if (currSong<4) {
      currSong++
    }else {
      currSong=0
    }
    playSong();
  }
}

//declaring canvas id and putting the width and height as the screens
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var arrow = document.getElementById("creditSlide");

//play the timer when document loaded
document.body.onload = function () {
	arrow.addEventListener("click", creditSlide, false);
	var x = setInterval(function() {
    var currtime = new Date().getTime();
    var gaps = targetDate - currtime;

    var days = Math.floor(gaps/ (1000 * 60 * 60 * 24));
    var hours = Math.floor((gaps % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((gaps % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((gaps % (1000 * 60)) / 1000);

    var timer = document.getElementById("timer")
    timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	//when and in 6 days after christmas snow,playsong and decoration
    if (gaps<= 0 && gaps>=-518400000) {
        merryChristmas()
        drawDecor()
        playSong()
        timer.style.visibility = "hidden"
        canvas.style.visibility = "visible";
    }
	//7 days before christmas play song and decoration when on peek time before 5 second start peektime animation
    else if (gaps<=6.048e+8) {
		drawDecor()
		playSong()
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
}, 1500)

//start snowing at the 7th day before christmas

//canvas init
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//canvas dimensions
var canvasW = window.innerWidth;
var canvasH = window.innerHeight;
canvas.width = canvasW;
canvas.height = canvasH

//snowflake particles density/the number of it
density=0
if (canvasW>381 || canvasH>500) {
	density=100
}else {
	density = 50;
}

//set value for each particle using an object inside an array 
var particles = [];
for (let i = 0; i < density; i++) {
		particles.push({
			x: Math.random()*canvasW,
			y: Math.random()*canvasH,
			r: Math.random()*4+1, 
			d: Math.random()*density
		})
	}
	
	//drawing the snow
	function drawSnow() {
		ctx.clearRect(0, 0, canvasW, canvasH);

		//move the flakes using 
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(let i = 0; i < density; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		updateDraw();
	}
	
	//well since i only need it to flow straight down i only need the new y position using cos...+1 to avoid moving upwards lol
	var angle = 0;
	function updateDraw() {
		angle += 0.001;
		for(let i = 0; i < density; i++) {
			var p = particles[i];
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			if(p.y > canvasH){
				if(i%4 > 0) {
					particles[i] = {x: Math.random()*canvasW, y: -10, r: p.r, d: p.d};
				}
			}
		}
	}

	//animation loop
	setInterval(drawSnow, 33);
}

//drawing house ,snow floor and tree
function drawDecor () {
  var house = document.getElementById("house");
  var snowfloor = document.getElementById("snowFloor")
  var tree = document.getElementById("tree")

  house.style.visibility = "visible"
  snowFloor.style.visibility = "visible"
  tree.style.visibility = "visible"
}

//make the merry christmas text visible
function merryChristmas() {
  christmastext = document.getElementById("header")
  christmastext.style.visibility="visible"
  setInterval(changeColor,1500)
}

//function to change the stroke colour of the text
function changeColor () {
  var text = document.getElementById("header")
  text.style.webkitTextStrokeColor = randColorRGB();
}

//random colour generator in rgb
function randColorRGB () {
		var x =[]
		for (let i=0;i<3;i++) {
			x[i] = Math.floor(Math.random() * (255 - 155 + 1)) + 155;
			x[i] = x[i].toString()
		}
		return "rgb(" + x[0] + "," + x[1] + "," + x[2] + ")";
}

//function to popup the credit section

function creditSlide () {
  var creditText = document.getElementById("creditText");
  if (creditText.style.opacity==0) {
    //creditText.style.display="block"
    creditText.style.opacity=1
  }else {
    //creditText.style.display = "none";
    creditText.style.opacity=0
  }
}
