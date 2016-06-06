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
		view.createClickHandlers();
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

	createClickHandlers: function(){
		this.breakSubtract();
		this.breakAdd();
		this.sessionSubtract();
		this.sessionAdd();
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

};


// Run on start
controller.init();

