// main.js

console.log(`yo`);

//====(1) Creating the default moving background===//
let movingBG = document.getElementById("container");

let paper = new Raphael(movingBG);

let pWidth = paper.width;
let pHeight = paper.height;

//plain white rect as background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "white","fill-opacity": 1});

//floating "bubbles"
var diskColor = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")"

var n = 0;
var diskArray = [];

while (n<10) {

	diskArray[n] = paper.circle(pWidth/2, pHeight/2, pWidth/10);

	diskArray[n].xrate= Math.floor(Math.random() * 10) - 5;
	diskArray[n].yrate= Math.floor(Math.random() * 10) - 5;

	if (diskArray[n].xrate===0){
		diskArray[n].xrate= Math.floor(Math.random() * 10) - 5
	} if (diskArray[n].yrate===0){
		diskArray[n].yrate= Math.floor(Math.random() * 10) - 5
	}

	var diskColor = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")"
	diskArray[n].attr({
		"fill": diskColor, 
		"fill-opacity": 0.4, 
		"stroke": "none"
	});

	diskArray[n].xpos=pWidth/2;
	diskArray[n].ypos=pHeight/2;

	var draw = function(){
	    var n = 0
	    while (n<10) {

	    diskArray[n].xpos += diskArray[n].xrate;
	    diskArray[n].ypos += diskArray[n].yrate;

	    diskArray[n].attr({'cx': diskArray[n].xpos, 'cy': diskArray[n].ypos});

	    if (diskArray[n].xpos > pWidth) {diskArray[n].xrate = -diskArray[n].xrate;}
	    if (diskArray[n].ypos > pHeight) {diskArray[n].yrate = - diskArray[n].yrate};
	    if (diskArray[n].xpos < 0) {diskArray[n].xrate = -diskArray[n].xrate;}
	    if (diskArray[n].ypos < 0) (diskArray[n].yrate = - diskArray[n].yrate);

	    n++
	    }
	}

	n++;
}

setInterval(draw, 20);

//coloured translucent rect as tinted filter
var transparent = paper.rect(0,0,pWidth, pHeight);
transparent.attr({"fill": diskColor, "fill-opacity": 0.4});

//===(2) footer buttons to change backgrounds===//

var blueGreen = document.getElementById('blueGreen')
var purplePink = document.getElementById('purplePink')
var random = document.getElementById('random')

blueGreen.addEventListener("click", function(ev){
	paper.clear();

	var gradientRect = paper.rect(-pWidth,-0.5*pHeight,3*pWidth, 3*pHeight);
	gradientRect.attr({"fill": "90-#a1d9b4-#32988a-#000e3c","fill-opacity": 1});
	
	var rotateL = function(){
		gradientRect.animate({
			transform : `R-360`
			}, 6000, "linear", rotateL)
	}

	rotateL()

})

purplePink.addEventListener("click", function(ev){
	paper.clear();
	
	var gradientRect2 = paper.rect(-pWidth,-0.5*pHeight,3*pWidth, 3*pHeight);
	gradientRect2.attr({"fill": "90-#916b63-#b8ba6f-#ed7c94-#23529a","fill-opacity": 1});
	
	var rotateL = function(){
		gradientRect2.animate({
			transform : `R-360`
			}, 6000, "linear", rotateL)
	}

	rotateL()
})

random.addEventListener("click", function(ev){
	var diskColor = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")"

	var bgRect = paper.rect(0,0,pWidth, pHeight);
	bgRect.attr({"fill": "white","fill-opacity": 1});

	var n = 0;
	var diskArray = [];

	while (n<10) {

	diskArray[n] = paper.circle(pWidth/2, pHeight/2, pWidth/10);

	diskArray[n].xrate= Math.floor(Math.random() * 10) - 5;
	diskArray[n].yrate= Math.floor(Math.random() * 10) - 5;

	if (diskArray[n].xrate===0){
		diskArray[n].xrate= Math.floor(Math.random() * 10) - 5
	} if (diskArray[n].yrate===0){
		diskArray[n].yrate= Math.floor(Math.random() * 10) - 5
	}

	var diskColor = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")"
	diskArray[n].attr({
		"fill": diskColor, 
		"fill-opacity": 0.4, 
		"stroke": "none"
	});

	diskArray[n].xpos=pWidth/2;
	diskArray[n].ypos=pHeight/2;

	var draw = function(){
	    var n = 0
	    while (n<10) {

	    diskArray[n].xpos += diskArray[n].xrate;
	    diskArray[n].ypos += diskArray[n].yrate;

	    diskArray[n].attr({'cx': diskArray[n].xpos, 'cy': diskArray[n].ypos});

	    if (diskArray[n].xpos > pWidth) {diskArray[n].xrate = -diskArray[n].xrate;}
	    if (diskArray[n].ypos > pHeight) {diskArray[n].yrate = - diskArray[n].yrate};
	    if (diskArray[n].xpos < 0) {diskArray[n].xrate = -diskArray[n].xrate;}
	    if (diskArray[n].ypos < 0) (diskArray[n].yrate = - diskArray[n].yrate);

	    n++
	    }
	}

	n++;
	}

	setInterval(draw, 20);

	var transparent = paper.rect(0,0,pWidth, pHeight);
	transparent.attr({"fill": diskColor, "fill-opacity": 0.4});

})

//===(3) making my divs draggable===//

//grabbing divs from the DOM
var playlist = document.getElementById('playlist')
var timer = document.getElementById('timer')
var timetable = document.getElementById('timetable')
var clockBG = document.getElementById("timerAnimate")

var container = document.getElementById('container')

//initialising mousedown states as false
var mousedown = {
	"playlist" : false,
	"timer" : false,
	"timetable" : false,
	"clock" : false
}

//setting mousedown listeners to update mousedown states and get values needed for offsetting divs' in mousemove event
playlist.addEventListener("mousedown", function(ev){
	mousedown.playlist = true
	console.log(`${playlist.offsetLeft}, ${ev.clientX}`)
	playlist.mouseX = ev.clientX
	playlist.mouseY = ev.clientY
	playlist.x = playlist.offsetLeft
	playlist.y = playlist.offsetTop
})

timer.addEventListener("mousedown", function(ev){
	mousedown.timer = true
	console.log(`${timer.offsetLeft}, ${ev.clientX}`)
	timer.mouseX = ev.clientX
	timer.mouseY = ev.clientY
	timer.x = timer.offsetLeft
	timer.y = timer.offsetTop
})

timetable.addEventListener("mousedown", function(ev){
	mousedown.timetable = true
	console.log(`${timetable.offsetLeft}, ${ev.clientX}`)
	timetable.mouseX = ev.clientX
	timetable.mouseY = ev.clientY
	timetable.x = timetable.offsetLeft
	timetable.y = timetable.offsetTop
})

clockBG.addEventListener("mousedown", function(ev){
	mousedown.clock = true
	console.log(`${clockBG.offsetLeft}, ${ev.clientX}`)
	clockBG.mouseX = ev.clientX
	clockBG.mouseY = ev.clientY
	clockBG.x = clockBG.offsetLeft
	clockBG.y = clockBG.offsetTop
})

//setting mousemove listener on container and offseting divs' positions with .style.left and .style.top
container.addEventListener("mousemove", function(ev){
	if (mousedown.playlist === true){
		playlist.style.left = `${ev.clientX - playlist.mouseX + playlist.x}px`
		playlist.style.top = `${ev.clientY - playlist.mouseY + playlist.y}px`
	} if (mousedown.timer === true){
		timer.style.left = `${ev.clientX - timer.mouseX + timer.x}px`
		timer.style.top = `${ev.clientY - timer.mouseY + timer.y}px`
	} if (mousedown.timetable === true){
		timetable.style.left = `${ev.clientX - timetable.mouseX + timetable.x}px`
		timetable.style.top = `${ev.clientY - timetable.mouseY + timetable.y}px`
	} if (mousedown.clock === true){
		clockBG.style.left = `${ev.clientX - clockBG.mouseX + clockBG.x}px`
		clockBG.style.top = `${ev.clientY - clockBG.mouseY + clockBG.y}px`
	}
})

//setting mouseup listener to update mousedown states so that divs stop moving with mouse
container.addEventListener("mouseup", function(ev){
	mousedown.playlist = false;
	mousedown.timer = false;
	mousedown.timetable = false;
	mousedown.clock = false;
})

//===(4) adding sounds and making buttons to start and stop sounds===//

var sounds = []
sounds[0] = new Audio("media/fire.mp3")
sounds[1] = new Audio("media/rain.wav")
sounds[2] = new Audio("media/forest.wav")

var fire = document.getElementById("fire")
var rain = document.getElementById("rain")
var forest = document.getElementById("forest")

fire.buttonState = false
rain.buttonState = false
forest.buttonState = false

fire.play = function(){
	sounds[0].play();
	fire.buttonState = true;
	fire.style.filter = "brightness(100%)";
}

fire.pause = function(){
	sounds[0].pause();
	fire.buttonState = false;
	fire.style.filter = "brightness(50%)";
}

rain.play = function(){
	sounds[1].play();
	rain.buttonState = true;
	rain.style.filter = "brightness(100%)";
}

rain.pause = function(){
	sounds[1].pause();
	rain.buttonState = false;
	rain.style.filter = "brightness(50%)";
}

forest.play = function(){
	sounds[2].play();
	forest.buttonState = true;
	forest.style.filter = "brightness(100%)";
}

forest.pause = function(){
	sounds[2].pause();
	forest.buttonState = false;
	forest.style.filter = "brightness(50%)";
}

fire.addEventListener("click", function(ev){
	rain.pause();
	forest.pause();
    if (fire.buttonState === false) {
        fire.play()
    } else {
        fire.pause()
    }
})

rain.addEventListener("click", function(ev){
	fire.pause();
	forest.pause();
    if (rain.buttonState === false) {
        rain.play()
    } else {
        rain.pause()
    }
})

forest.addEventListener("click", function(ev){
	fire.pause();
	rain.pause();
    if (forest.buttonState === false) {
        forest.play()
    } else {
        forest.pause()
    }
})

sounds[0].loop = true
sounds[1].loop = true
sounds[2].loop = true

//===(5) creating to-do list===//

//grabbing elements from DOM
var taskInput = document.getElementById('taskInput')
var tasks = document.getElementById('tasks')
var progress = document.getElementById(`progress`)
var tomatoBush = document.getElementById('tomatoBush')
var completed = document.getElementById(`completed`)

//initialising counters to track progress of to-do list -> taskDone/taskTotal
var taskTotal = 0
var taskDone = 0

//creating the functions to add a tomato emoji to tomatoBush whenever a task is crossed out AKA done
var tomatoString = "<div class = tomatoes> &#127813 </div>"

var addTomato = function(){
	tomatoBush.innerHTML += tomatoString
}

var minusTomato = function(){
	tomatoBush.firstElementChild.remove()
}

//function to create to-do list item. add HTML elements with innerHTML
var add = function(){
	if (taskInput.value === ""){
		
	} else {

		//create to-do list item with taskInput.value
		tasks.innerHTML += `
			<div class="task"> 
				<input class ="check" type="checkbox">
				<span class="todo-item" contenteditable="true" maxlength="40" style="text-decoration: none;"> ${taskInput.value} </span>
				<button class="delete"> x </button>
			</div>
		`
		//clear taskInput field after adding to-do list item
		taskInput.value = ""

		//updating counters and printing to progress div
		taskTotal ++;
		progress.innerHTML = `${taskDone}/${taskTotal}`

		//updating bgcolour of progress div to green if 100% of to-do items are crossed out
		if (taskDone/taskTotal === 1){
		progress.style.backgroundColor = "rgba(0,255,0,0.3)"
		} if (taskDone/taskTotal !== 1){
		progress.style.backgroundColor = "rgba(0,0,0,0.3)"
		}
	}
}

//keypress listener to allow users to add to-do list item by clicking enter
taskInput.addEventListener('keypress', function(event){
    if(event.which == 13) {  // 'return' key is 13
        add();
    }
});

//setting up click listeners and checking where users are clicking to run different actions
tasks.addEventListener("click", function(ev){
	var item = ev.target;

	//if user clicks delete button and task is crossed out
	if(item.classList[0] === "delete" && item.parentElement.firstElementChild.nextElementSibling.style.textDecoration === "line-through"){
		//remove the to-do list item
		item.parentElement.remove();
		//update counters
		taskTotal --;
		taskDone --;
		//remove tomato
		minusTomato();
	} 

	//if user clicks delete button and task was not crossed out
	if(item.classList[0] === "delete" && item.parentElement.firstElementChild.nextElementSibling.style.textDecoration === "none"){
		//remove the to-do list item
		item.parentElement.remove();
		//minus from total number of tasks
		taskTotal --;
	} 

	//if user clicks checkbox to check it, and item was not crossed out
	if (item.classList[0] === "check" && item.checked === true && item.nextElementSibling.style.textDecoration === "none"){
		//add to total number of taskDone
		taskDone ++;
		//add tomato
		addTomato()
		//cross out to-do list item
		item.nextElementSibling.style.textDecoration = "line-through"
	} 
	//if user clicks checkbox to uncheck it, and item is crossed out
	if (item.classList[0] === "check" && item.checked === false && item.nextElementSibling.style.textDecoration === "line-through"){
		//minus from total number of taskDone
		taskDone --;
		//remove tomato
		minusTomato()
		//remove strikethrough on to-do list item
		item.nextElementSibling.style.textDecoration = "none";
	} 

	//checking and updating colour of progress div everytime there's a click
    if (taskDone/taskTotal === 1){
	progress.style.backgroundColor = "rgba(0,255,0,0.3)"
	} if (taskDone/taskTotal !== 1){
	progress.style.backgroundColor = "rgba(0,0,0,0.3)"
	}

	//updating progress div everytime there's a click
	progress.innerHTML = `${taskDone}/${taskTotal}`
})

//=== (6) creating pomodoro timer ==============================================================//

//grabbing elements from the DOM
var start = document.getElementById('start')
var pause = document.getElementById('pause')
var timerState = "rest"

var clockMinutes = document.getElementById('clockMinutes')
var clockSeconds = document.getElementById('clockSeconds')
var totalInSeconds = 25*60

var twentyfive = document.getElementById("25mins")
var fifteen = document.getElementById("15mins")
var five = document.getElementById("5mins")

//making the raphael animated background to show timer progress
//setting up paper and assigning width and height values to variables
var paper2 = new Raphael(clockBG)
var cWidth = paper2.width
var cHeight = paper2.height

//creating functions to calculate the x and y positions of each 1/60 incremental point of a circle
var clockX = function(a){
	return cWidth/2 + 0.5*cHeight*Math.cos(a*Math.PI/30)
}

var clockY = function(a){
	return cHeight/2 + 0.5*cHeight*Math.sin(a*Math.PI/30)
}

//pathString for drawing each 1/60 incremental arc of a circle
var pathString = function(c){
	return `M ${clockX(c)}, ${clockY(c)} ${clockX(c+1)}, ${clockY(c+1)}`
}

//raphael text to show timer values
var clockText = paper2.text(cWidth/2, cHeight/2, clockMinutes.innerHTML + ":" + clockSeconds.innerHTML)
clockText.attr({"font-family": "nunito", "font-size": cHeight/3})

//clockBG div set to be hidden (unhide later when start button is clicked)
clockBG.style.opacity = 0
clockBG.style.pointerEvents = "none"

//function to update timer values, draw progress "arcs"
var a = 0
var clockInterval

var startTimer = function(){
	clockBG.style.opacity = 1
	clockBG.style.pointerEvents = "all"
	var updateClock = function(){
		a++

		//for clearing progress circle once it is completed
		if (a === 61){
			paper2.clear()
			a = 1
			clockText = paper2.text(cWidth/2, cHeight/2, clockMinutes.innerHTML + ":" + clockSeconds.innerHTML)
			clockText.attr({"font-family": "nunito", "font-size": cHeight/3})
		}

		//drawing progress "arcs"
		var timerArc = paper2.path(pathString(a))
		timerArc.attr({"stroke-width": cHeight/20, "stroke":"white"})
		
		//updating timer values
		totalInSeconds--
		clockMinutes.innerHTML = `${Math.floor(totalInSeconds/60)}`
		clockSeconds.innerHTML = `${totalInSeconds%60}`
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})

		//adding 0 when values become single digits to maintain double digits formatting
		if (totalInSeconds%60 < 10){
		clockSeconds.innerHTML = `0${totalInSeconds%60}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		} if (Math.floor(totalInSeconds/60) < 10){
		clockMinutes.innerHTML = `0${Math.floor(totalInSeconds/60)}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		}

		//when timer runs out, stop loop
		if (totalInSeconds === 0){
			clearInterval(clockInterval)
			pause.style.pointerEvents = "none"
			pause.style.filter = "brightness(50%)"
			start.style.pointerEvents = "all"
			start.style.filter = "brightness(100%)"
			totalInSeconds = 25*60

		}
	}
	
	clockInterval = setInterval(updateClock, 1000)

	//update state as active when timer is running
	timerState = "active"
}

//set pause button to be disabled initially (only enabled once timer is started)
pause.style.pointerEvents = "none"
pause.style.filter = "brightness(50%)"

//start button
start.addEventListener("click", function(ev){
		startTimer()
		timerState = "active"
		//enable pause button, disable start button
		pause.style.pointerEvents = "all"
		pause.style.filter = "brightness(100%)"
		start.style.pointerEvents = "none"
		start.style.filter = "brightness(50%)"
})

//pause button
pause.addEventListener("click", function(ev){
	if (timerState === "active"){
		clearInterval(clockInterval)
		timerState = "rest"
		pause.innerHTML = "continue"
	} else {
		startTimer()
		pause.innerHTML = "pause"
	}
})

//25:00 button
twentyfive.addEventListener("click", function(ev){
	//stopping currently running timer if any
	clearInterval(clockInterval)
	paper2.clear()

	//resetting counters
	a = 0
	totalInSeconds = 25*60

	//updating text and innerHTML to reflect 25:00
	clockText = paper2.text(cWidth/2, cHeight/2, clockMinutes.innerHTML + ":" + clockSeconds.innerHTML)
	clockText.attr({"font-family": "nunito", "font-size": cHeight/3})

	clockMinutes.innerHTML = `${Math.floor(totalInSeconds/60)}`
	clockSeconds.innerHTML = `${totalInSeconds%60}`
	clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})

		if (totalInSeconds%60 < 10){
		clockSeconds.innerHTML = `0${totalInSeconds%60}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		} if (Math.floor(totalInSeconds/60) < 10){
		clockMinutes.innerHTML = `0${Math.floor(totalInSeconds/60)}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		}

	//disabling pause button, enabling start button
	pause.style.pointerEvents = "none"
	pause.style.filter = "brightness(50%)"
	start.style.pointerEvents = "all"
	start.style.filter = "brightness(100%)"
	pause.innerHTML = "pause"
})

//15:00 button
fifteen.addEventListener("click", function(ev){
	//stopping currently running timer if any
	clearInterval(clockInterval)
	paper2.clear()

	//resetting counters
	a = 0
	totalInSeconds = 15*60

	//updating text and innerHTML to reflect 15:00
	clockText = paper2.text(cWidth/2, cHeight/2, clockMinutes.innerHTML + ":" + clockSeconds.innerHTML)
	clockText.attr({"font-family": "nunito", "font-size": cHeight/3})

	clockMinutes.innerHTML = `${Math.floor(totalInSeconds/60)}`
	clockSeconds.innerHTML = `${totalInSeconds%60}`
	clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})

		if (totalInSeconds%60 < 10){
		clockSeconds.innerHTML = `0${totalInSeconds%60}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		} if (Math.floor(totalInSeconds/60) < 10){
		clockMinutes.innerHTML = `0${Math.floor(totalInSeconds/60)}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		}

	//disabling pause button, enabling start button
	pause.style.pointerEvents = "none"
	pause.style.filter = "brightness(50%)"
	start.style.pointerEvents = "all"
	start.style.filter = "brightness(100%)"
	pause.innerHTML = "pause"
})

//5:00 button
five.addEventListener("click", function(ev){
	//stopping currently running timer if any
	clearInterval(clockInterval)
	paper2.clear()

	//resetting counters
	a = 0
	totalInSeconds = 5*60

	//updating text and innerHTML to reflect 5:00
	clockText = paper2.text(cWidth/2, cHeight/2, clockMinutes.innerHTML + ":" + clockSeconds.innerHTML)
	clockText.attr({"font-family": "nunito", "font-size": cHeight/3})

	clockMinutes.innerHTML = `${Math.floor(totalInSeconds/60)}`
	clockSeconds.innerHTML = `${totalInSeconds%60}`
	clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})

		if (totalInSeconds%60 < 10){
		clockSeconds.innerHTML = `0${totalInSeconds%60}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		} if (Math.floor(totalInSeconds/60) < 10){
		clockMinutes.innerHTML = `0${Math.floor(totalInSeconds/60)}`;
		clockText.attr({"text":clockMinutes.innerHTML + ":" + clockSeconds.innerHTML})
		}

	//disabling pause button, enabling start button
	pause.style.pointerEvents = "none"
	pause.style.filter = "brightness(50%)"
	start.style.pointerEvents = "all"
	start.style.filter = "brightness(100%)"
	pause.innerHTML = "pause"
})

//=== (7) creating tomato animation in modal =========================================================//
//grabbing elements from DOM
var modal = document.getElementById('modal')
var modalClose = document.getElementById('modalClose')
var tomatoBG = document.getElementById('tomatoBG')

//hiding and disabling modal initially
modal.style.opacity = 0
modal.style.pointerEvents = "none"
modalClose.style.pointerEvents = "none"

//setting up raphael for tomato animation
var paper3 = new Raphael(tomatoBG)
var tWidth = paper3.width
var tHeight = paper3.height

var tomatoInterval

completed.addEventListener("click", function(ev){
	//unhide and enable modal
	modal.style.opacity = 1
	modal.style.pointerEvents = "all"
	modalClose.style.pointerEvents = "all"

	//adding raphael text to reflect number of tomatoes collected
	var tomatoText= paper3.text(tWidth/2, tHeight/2, `wow! you've collected ${taskDone} tomatoes`)
	tomatoText.attr({"font-size": "12px", "font-family": "nunito", "font-weight": "bold"})
	if (taskDone === 1){
		tomatoText.attr({"text": `wow! you've collected ${taskDone} tomato`})
	} if (taskDone === 0){
		tomatoText.attr({"text": `try adding and checking off a task first to collect tomatoes`})
	}

	//adding tomatos to the paper
	var t = 0;
	var tomatoArray = [];

	while (t< taskDone) {

	tomatoArray[t] = paper3.image("tomato.png",tWidth/2, tHeight/15, tWidth/5, tWidth/5);

	//randomise speeds
	tomatoArray[t].xrate= -8+10*Math.random();
	tomatoArray[t].yrate= -8+14*Math.random();

	//initialise position
	tomatoArray[t].xpos=tWidth/2;
	tomatoArray[t].ypos=tHeight/15;

	//function to update positions
	var draw = function(){
	    var t = 0
	    
	    while (t<taskDone) {

	    //gravity
	    tomatoArray[t].yrate += 0.5

	    //updating x and y positions
	    tomatoArray[t].xpos += tomatoArray[t].xrate;
	    tomatoArray[t].ypos += tomatoArray[t].yrate;
	    tomatoArray[t].attr({'x': tomatoArray[t].xpos, 'y': tomatoArray[t].ypos});

        //bounce tomatoes off the walls
        if (tomatoArray[t].ypos > tHeight){
            tomatoArray[t].yrate = -0.9*tomatoArray[t].yrate
        } if (tomatoArray[t].ypos < 0){
            tomatoArray[t].yrate = -0.9*tomatoArray[t].yrate
        } if (tomatoArray[t].xpos > tWidth){
            tomatoArray[t].xrate = -0.9*tomatoArray[t].xrate
        } if (tomatoArray[t].xpos < 0){
            tomatoArray[t].xrate = -0.9*tomatoArray[t].xrate
        }

	    t++
	    }
	}

	t++;
	}

	tomatoInterval = setInterval(draw, 20);
})

//close button to hide modal
modalClose.addEventListener("click", function(ev){
	//clear animation
	paper3.clear()
	clearInterval(tomatoInterval)
	//hide and disable modal
	modal.style.opacity = 0
	modal.style.pointerEvents = "none"
	modalClose.style.pointerEvents = "none"
})

//=== (8) hide and unhide tools ==================================================================//
//grabbing buttons from the DOM
var todoButton = document.getElementById("todoButton")
var soundButton = document.getElementById("soundButton")
var timerButton = document.getElementById("timerButton")
var bgButton = document.getElementById("bgButton")

//grabbing divs from DOM that have not been grabbed by this point in code
var timer = document.getElementById("timer")
var footer = document.getElementById("footer")

//hiding and disabling divs initially (unhide later when icon buttons are clicked)
timetable.state = "closed"
timetable.style.opacity	= 0
timetable.style.pointerEvents = "none"

playlist.state = "closed"
playlist.style.opacity	= 0
playlist.style.pointerEvents = "none"

timer.state = "closed"
timer.style.opacity	= 0
timer.style.pointerEvents = "none"

footer.state = "closed"
footer.style.opacity = 0
footer.style.pointerEvents = "none"

//hiding and unhiding divs when respective buttons are clicked
var z = 0 //initialising counter for checking when to open to-do's onboarding modal

todoButton.addEventListener("click", function(ev){
		if (timetable.state === "closed"){
			timetable.style.opacity	= 1
			timetable.state = "open"
			timetable.style.pointerEvents = "all"
			todoButton.style.outlineStyle = "auto"
		} else {
			timetable.style.opacity	= 0;
			timetable.state = "closed";
			timetable.style.pointerEvents = "none"
			todoButton.style.outlineStyle = "none"
		} if (z === 0){
			modalToDo.style.opacity = 1
			closeToDo.style.pointerEvents = "all"
			modalToDo.style.pointerEvents = "all"

			z++ //updating state so that it is no longer 0. hence modal will only appear the first time user clicks to-do button
		}
		
})

var s = 0 //initialising counter for checking when to open sounds's onboarding modal

soundButton.addEventListener("click", function(ev){
		if (playlist.state === "closed"){
			playlist.style.opacity	= 1
			playlist.state = "open"
			playlist.style.pointerEvents = "all"
			soundButton.style.outlineStyle = "auto"
		} else {
			playlist.style.opacity	= 0;
			playlist.state = "closed";
			playlist.style.pointerEvents = "none"
			soundButton.style.outlineStyle = "none"
		} if (s === 0){
			modalSounds.style.opacity = 1
			closeSounds.style.pointerEvents = "all"
			modalSounds.style.pointerEvents = "all"

			s++ //updating state so that it is no longer 0. hence modal will only appear the first time user clicks sounds button
		}
		
})

var pomo = 0

timerButton.addEventListener("click", function(ev){
		if (timer.state === "closed"){
			timer.style.opacity	= 1
			timer.state = "open"
			timer.style.pointerEvents = "all"
			timerButton.style.outlineStyle = "auto"
		} else {
			timer.style.opacity	= 0;
			timer.state = "closed";
			timer.style.pointerEvents = "none"
			timerButton.style.outlineStyle = "none"
		} if (pomo === 0){
			modalTimer.style.opacity = 1
			closeTimer.style.pointerEvents = "all"
			modalTimer.style.pointerEvents = "all"

			pomo++ //updating state so that it is no longer 0. hence modal will only appear the first time user clicks timer button
		}
		
})

var BG = 0

bgButton.addEventListener("click", function(ev){
		if (footer.state === "closed"){
			footer.style.opacity	= 1
			footer.state = "open"
			footer.style.pointerEvents = "all"
			bgButton.style.outlineStyle = "auto"
		} else {
			footer.style.opacity	= 0;
			footer.state = "closed";
			footer.style.pointerEvents = "none"
			bgButton.style.outlineStyle = "none"
		} if (BG === 0){
			modalBG.style.opacity = 1
			closeBG.style.pointerEvents = "all"
			modalBG.style.pointerEvents = "all"

			BG++ //updating state so that it is no longer 0. hence modal will only appear the first time user clicks bg button
		}
		
})


//=== (9) onboarding modals ===================================================================//
//grabbing elements from DOM
var modalClose2 = document.getElementById('modalClose2')
var onboarding	= document.getElementById("onboarding")

var modalToDo = document.getElementById("modalToDo")
var closeToDo = document.getElementById("closeToDo")

var modalSounds = document.getElementById("modalSounds")
var closeSounds = document.getElementById("closeSounds")

var modalBG = document.getElementById("modalBG")
var closeBG = document.getElementById("closeBG")

var modalTimer = document.getElementById("modalTimer")
var closeTimer = document.getElementById("closeTimer")

//showing onboarding modal when user loads page
onboarding.style.opacity = 1
onboarding.style.pointerEvents = "all"

//button to close onboarding modal
modalClose2.addEventListener("click", function(ev){
	onboarding.style.opacity = 0
	onboarding.style.pointerEvents = "none"
	modalClose2.style.pointerEvents = "none"
})

//hiding to-do onboarding modal initially
modalToDo.style.opacity = 0
closeToDo.style.pointerEvents = "none"

//button to close to-do onboarding modal
closeToDo.addEventListener("click", function(ev){
	modalToDo.style.opacity = 0
	modalToDo.style.pointerEvents = "none"
	closeToDo.style.pointerEvents = "none"
})

//hiding to-do onboarding modal initially
modalSounds.style.opacity = 0
closeSounds.style.pointerEvents = "none"

//button to close to-do onboarding modal
closeSounds.addEventListener("click", function(ev){
	modalSounds.style.opacity = 0
	modalSounds.style.pointerEvents = "none"
	closeSounds.style.pointerEvents = "none"
})

//hiding to-do onboarding modal initially
modalBG.style.opacity = 0
closeBG.style.pointerEvents = "none"

//button to close to-do onboarding modal
closeBG.addEventListener("click", function(ev){
	modalBG.style.opacity = 0
	modalBG.style.pointerEvents = "none"
	closeBG.style.pointerEvents = "none"
})

//hiding to-do onboarding modal initially
modalTimer.style.opacity = 0
closeTimer.style.pointerEvents = "none"

//button to close to-do onboarding modal
closeTimer.addEventListener("click", function(ev){
	modalTimer.style.opacity = 0
	modalTimer.style.pointerEvents = "none"
	closeTimer.style.pointerEvents = "none"
})