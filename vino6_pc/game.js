/*var vk_inited = false;
 VK.init(function() { 
    vk_inited = true;
  }, function() { 
     // API initialization failed 
     // Can reload page here 
}, '5.68'); */


var pjs = new PointJS(1000, 750, {
	backgroundColor : '#4b4843' // optional
});
//pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var size  = pjs.vector.size;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Objects manager
var math   = pjs.math;           // More Math-methods
// var key   = pjs.keyControl.initKeyControl();
 var mouse = pjs.mouseControl.initMouseControl();
//var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport
var score;
pjs.system.setTitle('Никитон-питон'); // Set Title for Tab or Window
var bg = new CSSBackground(pjs, 'horizontal')
/*var pushVK = game.newTextObject({
	text : 'Запостить Вк',
	positionC : point(width/2-50,height/6),
	color : '#254364',
	size : 40,
	font : 'myFont',
	align : 'center'
});*/
var restart = game.newTextObject({
	text : 'Заново',
	positionC : point(width/2,height/3),
	color : '#000000',
	size : 60,
	font : 'myFont',
	align : 'center'
});
bg.setImage('img/forest.png');
game.newLoop('GameOver',function(){
		game.clear();
	brush.drawText({
		text : 'Соснуто хуйцов: '+score,
		size : 50,
		color : '#FFFFFF',
		font : 'myFont'
	});
	restart.draw();
	if (mouse.isPeekObject('LEFT', restart)) {
		game.setLoop('game');
	}

/*	if (mouse.isPeekObject('LEFT', pushVK)) {
		VK.api("wall.post", {"message": "В приложении Бегущая Рузиля я выпил: " + score + " бутылки вина" + "\n Присоединяйся и ты https://vk.com/app6231307", 
			"attachments" : "photo-132376642_456239019",}, function (data) {
			
		})
			
		};*/
});
game.newLoopFromConstructor('game', function()  {
	
	var istor = [], oldBlock = false;
	var vino = [], oldVino = false;
	
	var addvino = function(){
		var dV = oldVino? oldVino.x + pjs.math.random(900, 2000) : pjs.math.random(900, 2000);
		var v = game.newImageObject({
		file: 'img/coin.png',
		x : dV,
		w : 50*1.5625, y : 285*1.5625,
	});
		oldVino = v;
		vino.push(v);
	};
	var drawvino = function(){
	OOP.forArr(vino, function(el){
	el.draw();
	el.setBox({
		offset : point (5,5),
		size : size(-10,10)
	});
	el.move(point(-4,0));
	if(el.x < width / 4 + 50 && el.x > width / 4 ){

		if(el.isIntersect(player)){
			score+=1;	
			el.setVisible(false);
		}
	}
	if(el.x + el.w < 0){
		el.x = oldVino.x + oldVino.w + pjs.math.random(900, 2000);
		el.setVisible(true);
		oldVino = el;
		score+=1;}
	})
	};


	var addistor = function(){
	var dX = oldBlock? oldBlock.x + pjs.math.random(300, 1100) : width;

	var o = game.newImageObject({
		file: 'img/истор1.png',
		x : dX,
		w : 50*1.5625, y : 285*1.5625,
	});
	var o1 = game.newImageObject({
		file: 'img/истор2.png',
		x : dX,
		w : 50*1.5625, y : 285*1.5625,
	});
	var o2 = game.newImageObject({
		file: 'img/истор3.png',
		x : dX,
		w : 50*1.5625, y : 285*1.5625,
	});
	var o3 = game.newImageObject({
		file: 'img/истор4.png',
		x : dX,
		w : 50*1.5625, y : 285*1.5625,
	});
	var o4 = game.newImageObject({
		file: 'img/истор5.png',
		x : dX,
		w : 50*1.5625, y : 285*1.5625,
	});
	var obj;

	switch(pjs.math.random(1,5)){
			case 1: obj = o;
			break;
			case 2: obj = o2;
			break;
			case 3: obj = o3;
			break;
			case 4: obj = o4;
			break;
			case 5: obj = o1;
			break;
			default:
			 obj = o2;
		}
	oldBlock = obj;
	istor.push(obj);

	};

var drawistor = function (){
OOP.forArr(istor, function(el){
	el.draw();
	//el.drawStaticBox();
	el.setBox({
		offset : point (5,5),
		size : size(-10,10)
	});
	el.move(point(-4,0));
	if(el.x < width / 4 + 50 && el.x > width / 4){

		if(el.isIntersect(player)){
			game.setLoop('GameOver');	
		}
	}
	if(el.x + el.w < 0){
		el.x = oldBlock.x + oldBlock.w + pjs.math.random(300, 1100);
		oldBlock = el;
		score+=1;
	}
})

};
	var player = game.newAnimationObject({
		animation : pjs.tiles.newAnimation('img/player.png', 175, 288, 8),
		w : 175 / 2*1.5625, h : 288 / 2 *1.5625,
		x : width / 4, y: height /2,
		delay : 3,
		userData : {
			dy: 0
		}
	});
	this.entry = function () {
		player.y = height /2;
		istor = [], oldBlock = false;
		vino = [], oldVino = false;
		OOP.forInt(7, function(){
	addistor();
	});
		OOP.forInt(1, function(){
	addvino();
	});
	score = 0;

	};

	this.update = function () {
	game.clear(); // clear screen
		bg.move(point(-1,0));
		player.draw();
		player.dy += 2;
		player.y += player.dy;
		if(player.y > height/2){
			player.y = height/2;

		}
		drawistor();
		drawvino();
		brush.drawText({
		text : score,
		size : 50,
		x : width/2, y : height/20,
		color : '#FFFFFF',
		font : 'myFont',	
		align : 'center'
	});
		if ((mouse.isPress("LEFT"))&&(player.y == height/2)){
			player.dy = -40;
		} 
		//camera.follow(player,30);
	};

});

game.newLoopFromConstructor('myGame', function () {
	// Constructor Game Loop

	this.update = function () {
		// Update function
		if (mouse.isPress("LEFT")) {
			game.setLoop('game');
		}
		game.clear(); // clear screen
		bg.move(point(-1,0));
		toGame.draw();
		toGame.transparent(0.01);
	};

	this.entry = function () { // optional
		log('myGame is started');
		
		
	};
	var toGame = game.newTextObject({
		text: 'Соснуть хуйцов',
		size: 100,
		color: '#000000',
		positionC : camera.getPositionC(),
		alpha : 0, // alpha channel
		font : 'Lobster'
	});
	this.exit = function () { // optional
		log('myGame is stopped');
	};

});

game.startLoop('myGame');