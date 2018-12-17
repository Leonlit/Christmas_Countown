var targetDate = new Date("Dec 25, 2018 15:37:25").getTime()
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

//credit http://www.freexmasmp3.com/
//
//declaring canvas id and putting the width and height as the screens
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.onload = function () {
  var x = setInterval(function() {
    var currtime = new Date().getTime();
    var gaps = targetDate - currtime;

    var days = Math.floor(gaps/ (1000 * 60 * 60 * 24));
    var hours = Math.floor((gaps % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((gaps % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((gaps % (1000 * 60)) / 1000);

    var timer = document.getElementById("timer")
    timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    if (gaps<= 0) {
        merryChristmas()
        timer.style.visibility = "hidden"
    }
    else if (gaps<=6.048e+8) {
      snow()
      drawdecor()
      playsong()

    }
    //after one week
    else if (gaps <=-6.048e+8) {
      timer.style.visibility = "visible"
      targetDate = new Date("Dec 25, 2019 15:37:25").getTime()
    }
  }, 1000)
}

//start snowing at the 7th day before christmas
function snow(){

  //snow canvas
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
  //making the canvas same height and width as the device screen
	var width = window.innerWidth;
	var height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
  var density;

  //too much snow will be abit messy and too compact
  if (window.innerWidth>381) {
	   density = 100;
  }else {density = 20}

	var particles = [];
	for(var i = 0; i < density; i++) {
		particles.push({
			x: Math.random()*width,
			y: Math.random()*height,
			r: Math.random()*4+1,
			d: Math.random()*density
		})
	}

	function draw() {
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < density; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		updatedraw();
	}

  // angle is used to make the snow move abit more natural adding radius is just to make p.y difer from the p.x so basically Im just messing around with number lol XD
	function updatedraw() {

		for(var i = 0; i < density; i++) {
			var p = particles[i];
			p.y += Math.sin(0) + p.r/2+1;
			p.x += Math.sin(0) * 2;

			if(p.x > width+5 || p.x < -5 || p.y > height) {
				if(i%3 > 0) {
					particles[i] = {x: Math.random()*width, y: -10, r: p.r, d: p.d};
				}
			}
		}
	}
	setInterval(draw, 40);
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

var count = 0
//function to popup the credit section
function credit () {
  var fakebody = document.getElementById("fakeBody");
  var creditText = document.getElementById("creText");
  if (count==0 || creditText.style.visibility=="hidden") {
    fakebody.style.visibility = "hidden";
    creditText.style.visibility = "visible";
    house.style.visibility = "hidden"
    snowFloor.style.visibility = "hidden"
    tree.style.visibility = "hidden"
    count = 1
  }else if (count==1 || creditText.style.visibility=="visible"){
    fakebody.style.visibility = "visible"
    creditText.style.visibility = "hidden";
    house.style.visibility = "visible"
    snowFloor.style.visibility = "visible"
    tree.style.visibility = "visible"
    count = 0
  }
}
