function Game() {
	this.config = {
		gameWidth: 400,
		gameHeight: 300,
		fps: 50
};
this.lives = 5;
this.width = 0;
this.height = 0;
this.gameBound = {left: 0, top: 0, right: 0, bottom: 0};
this.stateStack = [];
this.pressdedKeys = {};
this.gameCanvas = null;
}
Game.prototype.initialise = function(gameCanvas) {
	this.gameCanvas = gameCanvas;
	this.width = gameCanvas.width;
	this.height = gameCanvas.height;
	this.gameBounds = {
		left: gameCanvas.width / 2 - this.config.gameWidth / 2,
		right: gameCanvas.width / 2 + this.config.gameWidth / 2,
		top: gameCanvas.height / 2 - this.config.gameHeight / 2,
		bottom: gameCanvas.height / 2 + this.config.gameHeight / 2,
	};
};
Game.prototype.moveToState = function(state){
	if(this.currentState()) {
		if(this.currentState().leave) {
			this.currentState().leave(game);
		}
		this.stateStack.pop();
	}
	if(state.enter) {
		state.enter(game);
	}
	this.stateStack.push(state);
}
Game.prototype.pushState = function(state) {
	if(state.enter) {
		state.enter(game);
	}
	this.stateStack.push(state);
};
Game.prototype.popState = function() {
	if(this.currentState()) {
		if(this.currentState().leave) {
			this.currentState().leave(game);
		}
		this.stateStack.pop();
	}
};
function gameLoop(game) {
	var currentState = game.currentState();
	if(currentState) {
		var dt = 1 / game.config.fps;
		var ctx = gamr.gameCanvas.getContext("2d");
		if(currentState.update) {
			currentState.update(game, dt);
		}
		if(currentState.draw) {
			currentState.draw(game, dt, ctx);
		}
	}
}
Game.prototype.start = function() {
	this.moveToState(new WelcomeState());
	this.lives = 3;
	this.config.debugMode = /debug=true/.test(window.location.href);
	var game = this;
	this.intervalid = setInterval(function () { gameLoop(game);}, 1000 / this.config.fps);
};