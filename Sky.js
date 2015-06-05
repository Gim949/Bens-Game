var 
	canvas, ctx, container
	
	Cloud = {
		clouds = 100,
		cloudList = [],
		
		cloudData : function(x, y, motY){
			return {getX: x, getY: y, motionY: motY};
		},
		
		updateList : function(){
			var rndNumX = Math.floor((Math.random() * window.innerWidth) + 1), 
				rndNumY = Math.floor((Math.random() * window.innerHeight) + 10),
				rndNum = Math.floor((Math.random() * 10) + 1);
			cloudList[0] = new cloudData();
			var cloudTemp;
			for(var i = 0; i < cloudList.length; i++)
			{
				cloudTemp = new cloudData(rndNumX, rndNumY, rndNum);
				cloudList.push(cloudTemp);
			}
		},
		
		drawClouds : function(img){
			for(var i = 0; i < cloudList.length; i++)
			{
				cloudList[i].getY += cloudList[i].motionY;
				ctx.drawImage(img, cloudList[i].getX, cloudList[i].getY, 150, 180);
			}
		}
	};
	
	
	function main(){
		canvas = document.createElement("canvas");
		canvas.id = "bg";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight / 4;
		ctx = canvas.getContext("2d");
		
		document.getElementById("sky").appendChild(canvas);
		
		gameLoop();
	}
	
	function gameLoop(){
		Cloud.updateList();
		Cloud.drawClouds();
		
		window.requestAnimationFrame(gameLoop);
	}
	
	
	
	