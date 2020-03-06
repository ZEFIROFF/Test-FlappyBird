// window.onload = init;
// by d3pii 05.02.2020 23-52
var backgroundcanvas = document.getElementById("background");
var gamecanvas = document.getElementById("game");
var columnTopcanvas = document.getElementById("columnTop");
var columnBottoncanvas = document.getElementById("columnBotton");
var titlecanvas = document.getElementById("title");
var infotitlecanvas = document.getElementById("infotitle");

var ctxbackground = backgroundcanvas.getContext("2d");
var ctxgame = gamecanvas.getContext("2d");
var ctxcolumnTop = columnTopcanvas.getContext("2d");
var ctxcolumnBotton = columnBottoncanvas.getContext("2d");
var ctxtitle = titlecanvas.getContext("2d");
var ctxinfotitle = infotitlecanvas.getContext("2d");

var gameWidth = 0;
var gameHeight = 0;

var CountOt = 0;

function START() {
    isPlaying = true;
    document.getElementById("start").style.display = "none";
    document.querySelector(".Message").style.display = "none";
    gameWidth = 550;
    gameHeight = 650;
    init();

    var hi = setInterval(logic, 1);
    function logic() {
        if (isPlaying) {
            drawBird();
            drawColumn();
        }else{
            document.querySelector(".hi").style.width = gameWidth + 'px';
            document.querySelector(".hi").style.height = gameHeight + 'px';
            showMessage("iq " + CountOt);
            clearInterval(hi);
        }
    }

}

function init() {
    backgroundcanvas.width = gameWidth;
    backgroundcanvas.height = gameHeight;
    gamecanvas.width = gameWidth;
    gamecanvas.height = gameHeight;
    columnTopcanvas.width = gameWidth;
    columnTopcanvas.height = gameHeight;
    columnBottoncanvas.width = gameWidth;
    columnBottoncanvas.height = gameHeight;
    titlecanvas.width = gameWidth;
    titlecanvas.height = gameHeight;

    ctxtitle.fillStyle = "#FFF";
    ctxtitle.font = "bold 30px Arial";
    ctxinfotitle.fillStyle = "lightgray";
    ctxinfotitle.font = "20px Arial";

    drawBackground();
    drawBird();

    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
}

var imgBackground = new Image();
imgBackground.src = "img/fon.jpg";
function drawBackground() {
    ctxbackground.drawImage(imgBackground, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight);
}

var playerobj = {};
playerobj.drawY = 50;
playerobj.isUp = false;
playerobj.drawX = 30;
playerobj.width = 835;
playerobj.height = 590;


var imgBird = new Image();
imgBird.src = "img/bird_mid.png";

var imgBirdT = new Image();
imgBirdT.src = "img/bird_up.png"

var imgBirdB = new Image();
imgBirdB.src = "img/bird_down.png"

function drawBird() {
    ctxgame.clearRect(0, 0, gameWidth, gameHeight);
    ctxgame.drawImage(imgBird, 0, 0, playerobj.width, playerobj.height, playerobj.drawX, playerobj.drawY, 55, 42);

    beginspeed += grav * 0.05;
    playerobj.drawY += beginspeed;
    
    if (playerobj.drawY >= gameHeight)
    {
        isPlaying = false;
    }

    if (playerobj.isUp) {
        beginspeed = maxJump;
    }
    if (playerobj.drawY <= 0){
        beginspeed = 0;
        playerobj.drawY = 0;
    }

    if(beginspeed < 0)
    {
        ctxgame.clearRect(0,0, gameWidth, gameHeight);
        ctxgame.drawImage(imgBirdT,0,0, playerobj.width, playerobj.height, playerobj.drawX, playerobj.drawY, 56, 40);
    } else if (beginspeed >= 1.5) {
        ctxgame.clearRect(0,0, gameWidth, gameHeight);
        ctxgame.drawImage(imgBirdB,0,0, playerobj.width, playerobj.height, playerobj.drawX, playerobj.drawY, 56, 40);
    } else {
        ctxgame.clearRect(0,0, gameWidth, gameHeight);
        ctxgame.drawImage(imgBird,0,0, playerobj.width, playerobj.height, playerobj.drawX, playerobj.drawY, 56, 40);
    }

}

var maxJump = -1.5;
var grav = 0.5;
var beginspeed = 0;

var isPlaying = false;

function checkKeyDown(e) {
    var keyId = e.keyCode;
    if (keyId == "32", "87") {
        playerobj.isUp = true;
    }
}
function checkKeyUp(e) {
    var keyId = e.keyCode;
    if (keyId == "32", "87") {
        playerobj.isUp = false;
    }
}

var imgColumnBotton = new Image();
imgColumnBotton.src = "img/col_down.png";

var imgColumnTop = new Image();
imgColumnTop.src = "img/col_up.png";

var rast = 5;
var max = 600;
var min = 300;
var speedColumn = 1.5

var kolonobj = {};
kolonobj.drawX = 400;
kolonobj.drawY = (max - min) * Math.random() + min;
kolonobj.height = 854;
kolonobj.width = 50;

function drawColumn() {

    var randcolumn = (max - min) * Math.random() + min;

    ctxcolumnBotton.clearRect(0, 0, gameWidth, gameHeight);
    ctxcolumnBotton.drawImage(imgColumnBotton, 0, 0, 222, 854, kolonobj.drawX, kolonobj.drawY, 70, 400);

    ctxcolumnTop.clearRect(0, 0, gameWidth, gameHeight);
    ctxcolumnTop.drawImage(imgColumnTop, 0, 0, 222, 854, kolonobj.drawX, (kolonobj.drawY - rast) - 700, 70, 400);

    kolonobj.drawX = kolonobj.drawX - speedColumn;

    ctxtitle.clearRect(0,0, gameWidth, gameHeight);
    ctxtitle.fillText("Счет: " + CountOt, 20, 30);
    ctxinfotitle.clearRect(0,0, gameWidth, gameHeight);
    ctxinfotitle.fillText("Скорость колонн: " + Math.round(speedColumn * 10) / 10 + " км/ч" , 20,50);

    if (kolonobj.drawX <= 0 - kolonobj.width) {
        kolonobj.drawX = 600;
        kolonobj.drawY = randcolumn;
        speedColumn += 0.03;
        CountOt++;
    }
    // Это код для блока колонн
    // console.log(kolonobj.drawY);
    // console.log(playerobj.drawY);

    // console.log(kolonobj.drawX);
    // console.log(playerobj.drawX);

    if ((playerobj.drawX > kolonobj.drawX - 48 &&  playerobj.drawX < kolonobj.drawX + 48 ) && playerobj.drawY>kolonobj.drawY -38){
        isPlaying = false;
        console.log("hi");
    }

    if ((playerobj.drawX > kolonobj.drawX -48 && playerobj.drawX < kolonobj.drawX + 48) && playerobj.drawY< (kolonobj.drawY - rast) -303){
        isPlaying = false;
    }
}

function showMessage(Message) {
    document.querySelector(".Message").style.display = "block";
    document.querySelector(".Message").innerHTML = Message;
}