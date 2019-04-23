$(document).ready(function(){
    var playArea = $("#playArea")[0];
    var ctx = getContext("2d");
    var girth = $("#playArea").width();
    var tall = $("#playArea").height();
    var noms;
    var cw = 10;
    var snek;
    var gameRun = setInterval(200);
    
    function updateGame(){
  
        if (playArea.keys && playArea.keys[37]) {snek.speedX = -1; }
        if (playArea.keys && playArea.keys[39]) {snek.speedX = 1; }
        if (playArea.keys && playArea.keys[38]) {snek.speedY = -1; }
        if (playArea.keys && playArea.keys[40]) {myCar.speedY = 1; } 
    checkBorders();
    check_noms();
    coloring(noms.x, noms.y, "red")
    coloring(snek.x,snek.y, "yellow")

    }


    function gameOver(){
        var current = $('#current').text();
        $('#final').text(current);
        $('#over').fadein();
    }

    function highScore(){
        var current =$('#current').text();
        var highest = $('#highest').text();
        if (parseInt(current) > parseInt(highest)){
            $('#highest').text(current)
        }
    }
    function nomsLocations(){
        noms = {
            x : Math.round(Math.random() * (girth-cw)/cw),
            y : Math.round(Math.random() * (tall-cw)/cw)
        }
    }
    function checkBorders(){
        if(snek.x < 0 || snek.x > (girth- cw)/cw || snek.y < 0 || snek.y > (tall - cw)/cw){
            clearInterval(gameRun);
            gameOver();
        }

    }
    function check_noms()
    {
        if (noms.x == snek.x && noms.y == snek.y)
        {
            var  score = parseInt($('#current').text());
            score += 1;
            $('#current').text(current);
            nomsLocations();
        }
    }
    function SnekLocation(){
        snek = {
            x : Math.round(Math.random()*(girth-cw)/cw),
            y : Math.round(Math.random()*(tall-cw)/cw)
        }
    }
    function coloring(x,y,color)
    {
        var color = ""
        ctx.fillStyle=color;
        ctx.fillRect(x*cw,y*cw,cw,cw);
        ctx.strokeStyle="white";
        ctx.strokeRect(x*cw,y*cw,cw,cw);
    }
    $(document).keydown(function(e)
    {
        check_noms();
        color = "red";
        coloring(noms.x,noms.y);
        color ="yellow";
        coloring(snek.x,snek.y);
    if (playArea.keys && playArea.keys[37]) {snek.speedX = -1; }
    if (playArea.keys && playArea.keys[39]) {snek.speedX = 1; }
    if (playArea.keys && playArea.keys[38]) {snek.speedY = -1; }
    if (playArea.keys && playArea.keys[40]) {myCar.speedY = 1; } 
    });
    nomsLocations();
    SnekLocation();
    highScore();
    updateGame();   
});    