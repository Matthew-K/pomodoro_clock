/* Model 
==============================*/

model = {
	breakLength: 0,
	sessionLength: 0,
	timer: {
		minutes: 0,
		seconds: 0,
	},
	running: false,
};



/* Controller 
==============================*/

controller = {

	init: function(){
		view.init();
	},

	updateBreakLength: function(num){
		model.breakLength = num;
	},

	updateSessionLength: function(num){
		model.sessionLength = num;
	},

	updateTimer: function(min, sec){
		model.timer.minutes = min;
		model.timer.seconds = sec;
	},

	setRunning: function(boolean){
		model.running = boolean;
	},

	isRunning: function(){
		return model.running;
	},

	getBreakLength: function(){
		return model.breakLength;
	},

	getSessionLength: function(){
		return model.sessionLength;
	},

	getTimer: function(){
		return model.timer;
	}

};



/* View
==============================*/

view = {

	init: function(){
		view.createClickHandlers();
	},


	countDown: function(minutes, seconds, breakOrSession){
		var t;

		if(controller.isRunning() === false){
			clearTimeout(t);
			return;
		}

		$("#timer").text(minutes + " " + seconds);
		if(minutes === 0 && seconds === 0){
			var newTime = null;
			if(breakOrSession === 'session'){
				newTime = controller.getBreakLength();
				$("#displayTimeHeader").text("Break");
				// switch over to the break time
				view.countDown(newTime, 0, 'break');
			} else if (breakOrSession === 'break'){
				newTime = controller.getSessionLength(); 
				$("#displayTimeHeader").text("Session");
				// switch over to the session time
				view.countDown(newTime, 0, 'break');
			}
			return;
		} else if(seconds === 0){
			minutes --;
			seconds = 60;
		}
		controller.updateTimer(minutes, seconds);
		seconds --;
		t = setTimeout('view.countDown(' + minutes + ',' + seconds + ',"' + breakOrSession + '")',1000);
	},

	createClickHandlers: function(){
		view.breakSubtract();
		view.breakAdd();
		view.sessionSubtract();
		view.sessionAdd();
		view.startStopButton();
	},

	breakSubtract: function(){
		$("#breakSubtract").on("click", function(){
			if(controller.isRunning()){
				return;
			} else{
				var breakLength = controller.getBreakLength();
				if (breakLength > 0){
					breakLength --;	
					controller.updateBreakLength(breakLength);
					$("#breakLength").text(breakLength);
				} else {
					return;
				}
			}
		});
	},

	breakAdd: function(){
		$("#breakAdd").on("click", function(){
			if(controller.isRunning()){
				return;
			} else{
				var breakLength = controller.getBreakLength();
				if (breakLength < 99){
					breakLength ++;	
					controller.updateBreakLength(breakLength);
					$("#breakLength").text(breakLength);
				} else {
					return;
				}
			}
		});
	},

	sessionSubtract: function(){
		$("#sessionSubtract").on("click", function(){
			if(controller.isRunning()){
				return;
			} else{
				var sessionLength = controller.getSessionLength();
				if (sessionLength > 0){
					sessionLength --;	
					controller.updateSessionLength(sessionLength);
					controller.updateTimer(sessionLength);
					$("#sessionLength").text(sessionLength);
					$("#timer").text(sessionLength);
				} else {
					return;
				}
			}
		});
	},

	sessionAdd: function(){
		$("#sessionAdd").on("click", function(){
			if(controller.isRunning()){
				return;
			} else{
				var sessionLength = controller.getSessionLength();
				if (sessionLength < 99){
					sessionLength ++;	
					controller.updateSessionLength(sessionLength);
					controller.updateTimer(sessionLength, 0);
					$("#sessionLength").text(sessionLength);
					$("#timer").text(sessionLength);
				} else {
					return;
				}
			}
		});
	},

	startStopButton: function(){
		$("#startStop").on("click", function(){
			var time = controller.getTimer();
			if (time.minutes === 0 && time.seconds === 0){
					return;
			}else if($(this).text() === "Start"){
				model.stop = false;
				$(this).text("Stop");
					controller.setRunning(true);
					view.countDown(time.minutes, time.seconds, 'session');	
			}else if($(this).text() === "Stop"){
				controller.setRunning(false);
				$(this).text("Start");
				return;
			}
		});
	},


};



// Run on start
controller.init();

