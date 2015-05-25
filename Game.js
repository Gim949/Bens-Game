function Game() {
 
   this.config = {
    gameWidth: 400,
    gameHeight: 300,
    fps: 50
  };
 
  this.lives = 3;
  this.width = 0;
  this.height = 0;
  this.gameBound = {left: 0, top: 0, right: 0, bottom: 0};
 
  this.stateStack = [];
 
  this.pressedKeys = {};
  this.gameCanvas =  null;
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

Game.prototype.currentState = function() {
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null; 
};

Game.prototype.moveToState = function(state) {
 
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
}; 

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

Game.prototype.keyDown = function(keyCode) {
    this.pressedKeys[keyCode] = true;
    if(this.currentState() && this.currentState().keyDown) {
        this.currentState().keyDown(this, keyCode);
    }
};
 
Game.prototype.keyUp = function(keyCode) {
    delete this.pressedKeys[keyCode];
    if(this.currentState() && this.currentState().keyUp) {
        this.currentState().keyUp(this, keyCode);
    }
};

function gameLoop(game) {
    var currentState = game.currentState();
    if(currentState) {
 
        var dt = 1 / game.config.fps;
 
        var ctx = game.gameCanvas.getContext("2d");
		
        if(currentState.update) {
            currentState.update(game, dt);
        }
        if(currentState.draw) {
            currentState.draw(game, dt, ctx);
        }
    }
} 

function WelcomeState() {} 

WelcomeState.prototype.draw = function(game, dt, ctx) {
 
    ctx.clearRect(0, 0, game.width, game.height);
 
    ctx.font="30px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="center";
    ctx.textAlign="center";
    ctx.fillText("EDIT THIS", game.width / 2, game.height/2 - 40); // This needs to be changed
    ctx.font="16px Arial";
 
    ctx.fillText("Press 'Space' to start.", game.width / 2, game.height / 2);
}; 

WelcomeState.prototype.keyDown = function(game, keyCode) {
    if(keyCode == 32) {
        game.moveToState(new LevelIntroState(game.level));
    }
};

Game.prototype.start = function() {
 
    this.moveToState(new WelcomeState());
 
    this.lives = 3;
    this.config.debugMode = /debug=true/.test(window.location.href);
 
    var game = this;
    this.intervalId = setInterval(function () { gameLoop(game);}, 1000 / this.config.fps);
 
};