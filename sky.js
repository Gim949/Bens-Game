function Sky() {
	this.fps = 60;
	this.canvas = null;
	this.width = 0; 
	this.height= 0;
	this.minVelocity = 15;
	this.maxVelocity = 30;
	this.clouds = 100;
	this.intervalid = 0;
}
Sky.prototype.initialise = function(div) {
	

	var self = this;
	
	this.containerDiv = div;
	self.width = window.innerWidth 
	self.height = window.innerHeight;
	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
}
Sky.prototype.start = function() {
	var clouds = []; 
	for(var i=0; i<this.clouds; i++){
		clouds[i] = new Cloud(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	    } 
		this.clouds =clouds;
function Cloud(x, y, size, velocity) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.velocity = velocity;
} 	
 var self = this;
 this.intervalid = setInterval(function() {
	self.update();
	self.draw();
 }, 1000 / this.fps);
};
Sky.prototype.update = function() {
	var dt = 1 / this.fps;
	for(var i=0; i<this.clouds.length; i++) {
		var cloud = this.clouds[i];
		cloud.y += dt * cloud.velocity;
		if(cloud.y > this.height) {
			this.cloud[i] = new Cloud(Math.random()*this.width, 0, Math.random()*3+1, Math.random()*(this.maxVelcoity - this.minVelocity) +this.minVelocity)
		}
			
	}
}
Sky.prototype.draw = 
function() {
	var ctx = this.canvas.getContext("2d");
    ctx.fillStyle = '#00BFFF';
	ctx.fillRect(0, 0,
	this.width, this.height);
	ctx.fillStyle = '#F5F5F5' ;
	for(var i=0; i<this.cloud.length;i++) {
	    var cloud = this.cloud[i];
        ctx.arc(5,5,5,0,Math.PI*2,true);
		ctx.fill(cloud.x,cloud.y, cloud.size, cloud.size);
	}
}