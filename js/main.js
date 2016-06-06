/* Model 
==============================*/

model = {
	breakLength: 0,
	sessionLength: 0,
	timer: 0,
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

	updateTimer: function(num){
		model.timer = num;
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

	timer: function(minutes, seconds, breakOrSession){
		$("#timer").text(minutes + " " + seconds);
		if(minutes === 0 && seconds === 0){
			var newTime = null;
			if(breakOrSession === 'session'){
				newTime = controller.getBreakLength();
				$("#displayTimeHeader").text("Break");
				// switch over to the break time
				view.timer(newTime, 0, 'break');
			} else if (breakOrSession === 'break'){
				newTime = controller.getSessionLength(); 
				$("#displayTimeHeader").text("Session");
				// switch over to the session time
				view.timer(newTime, 0, 'break');
			}
			return;
		} else if(seconds === 0){
			minutes --;
			seconds = 60;
		}
		seconds --;
		setTimeout('view.timer(' + minutes + ',' + seconds + ',"' + breakOrSession + '")',1000);
	},

	createClickHandlers: function(){
		view.breakSubtract();
		view.breakAdd();
		view.sessionSubtract();
		view.sessionAdd();
		view.startButton();
	},

	breakSubtract: function(){
		$("#breakSubtract").on("click", function(){
			var breakLength = controller.getBreakLength();
			if (breakLength > 0){
				breakLength --;	
				controller.updateBreakLength(breakLength);
				$("#breakLength").text(breakLength);
			} else {
				return;
			}
		});
	},

	breakAdd: function(){
		$("#breakAdd").on("click", function(){
			var breakLength = controller.getBreakLength();
			if (breakLength < 99){
				breakLength ++;	
				controller.updateBreakLength(breakLength);
				$("#breakLength").text(breakLength);
			} else {
				return;
			}
		});
	},

	sessionSubtract: function(){
		$("#sessionSubtract").on("click", function(){
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
		});
	},

	sessionAdd: function(){
		$("#sessionAdd").on("click", function(){
			var sessionLength = controller.getSessionLength();
			if (sessionLength < 99){
				sessionLength ++;	
				controller.updateSessionLength(sessionLength);
				controller.updateTimer(sessionLength);
				$("#sessionLength").text(sessionLength);
				$("#timer").text(sessionLength);
			} else {
				return;
			}
		});
	},

	startButton: function(){
		$("#start").on("click", function(){
			var time = controller.getTimer();
			if (time === 0){
				return;
			} else {
				view.timer(time, 0, 'session');
			}
		});
	},


};



// Run on start
controller.init();

