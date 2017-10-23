var vk_inited = false;
 /* VK.init(function() { 
    vk_inited = true;
  }, function() { 
     // API initialization failed 
     // Can reload page here 
}, '5.68'); */


var pjs = new PointJS(1000, 750, {
	backgroundColor : '#4b4843' // optional
});
pjs.system.initFullPage(); // for Full Page mode
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
pjs.system.setTitle('Аревик'); // Set Title for Tab or Window
var bg = new CSSBackground(pjs, 'horizontal')
var pushVK = game.newTextObject({
	text : 'Запостить Вк',
	positionC : point(width/2 -78,height/6),
	color : '#254364',
	size : 40,
	font : 'myFont',
	align : 'center'
});
var restart = game.newTextObject({
	text : 'Заново',
	positionC : point(width/2,height/3),
	color : '#000000',
	size : 40,
	font : 'myFont',
	align : 'center'
});
bg.setImage('img/forest.png');
game.newLoop('GameOver',function(){
		game.clear();
	brush.drawText({
		text : 'Выпито боржоми: '+score,
		size : 50,
		color : '#FFFFFF',
		font : 'myFont'
	});
	pushVK.draw();
	restart.draw();
	if (mouse.isPeekObject('LEFT', restart)) {
		game.setLoop('game');
	}

	/*if (mouse.isPeekObject('LEFT', pushVK)) {
		VK.api("wall.post", {"message": "В приложении Бегущая Аревик я выпил: " + score + " боржоми" + "\n Присоединяйся и ты https://vk.com/app6229580", "attachments" : "photo-154724360_456239122",}, function (data) {
			
		});
			
		}*/
});
game.newLoopFromConstructor('game', function()  {
	
	var istor = [], oldBlock = false;
	var addistor = function(){
	var dX = oldBlock? oldBlock.x + pjs.math.random(300, 1100) : width;

	var o = game.newImageObject({
		file: 'img/истор1.png',
		x : dX,
		w : 78, y : 445,
	});
	var o1 = game.newImageObject({
		file: 'img/истор2.png',
		x : dX,
		w : 78, y : 445,
	});
	var o2 = game.newImageObject({
		file: 'img/истор3.png',
		x : dX,
		w : 78, y : 445,
	});
	var o3 = game.newImageObject({
		file: 'img/истор4.png',
		x : dX,
		w : 78, y : 445,
	});
	var o4 = game.newImageObject({
		file: 'img/истор5.png',
		x : dX,
		w : 78, y : 445,
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
OOP.forInt(7, function(){
addistor();
});
var drawistor = function (){
OOP.forArr(istor, function(el){
	el.draw();
//	el.drawStaticBox();
	el.setBox({
		offset : point (5,5),
		size : size(-10,10)
	});
	el.move(point(-3,0));
	if(el.x < width / 4 && el.x > 156){
		if(el.isIntersect(player)){
			game.setLoop('GameOver');	
		}
	}
	if(el.x + el.w < 0){
		el.x = oldBlock.x + oldBlock.w + pjs.math.random(300, 1100);
		oldBlock = el;
		score +=1;
	}
})

};
	var player = game.newAnimationObject({
		animation : pjs.tiles.newAnimation('img/player.png', 175, 288, 8),
		w : 138, h : 225 ,
		x : width / 4, y: height /2,
		delay : 3,
		userData : {
			dy: 0
		}
	});
	this.entry = function () {
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
		if ((mouse.isPress("LEFT"))&&(player.y == height/2)){
			player.dy = -27;
		} 
		//camera.follow(player,30);
	};

});

game.newLoopFromConstructor('myGame', function () {
	// Constructor Game Loop

/*	var myText = game.newTextObject({
		positionC : point(game.getWH2().w, game.getWH2().h), // central position of text
		size : 50, // size text
		color : '#EAEAEA', // color text
		text : 'Hello, World 2.0!', // label
		alpha : 0, // alpha channel
		font : 'Courier' // font family
	});
*/
	this.update = function () {
		// Update function
		if (mouse.isPress("LEFT")) {
			game.setLoop('game');
		}
		game.clear(); // clear screen
		bg.move(point(-1,0));
		toGame.draw();
		toGame.transparent(0.05);
	//	myText.draw(); // drawing text
	//	myText.transparent(0.005); // change alpha [0..>..1]

	};

	this.entry = function () { // optional
		log('myGame is started');
		
		
	};
	var toGame = game.newTextObject({
		text: 'Выпить боржоми',
		size: 50,
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