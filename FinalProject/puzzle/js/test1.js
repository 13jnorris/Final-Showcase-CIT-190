
var can;
var ctx;
var image;
var cX;
var cY;
var picked1;
var picked2;
var Size;
var array = new Array();

    function onREady(){
        can = document.getElementById('canvas')
        ctx = can.getContext('2d');
        image = new Image();
        image.onload = onImage1Load;
        image.src = "media/4c.jpg";
    }
    function onImage1Load(){
        var r;
        for(var i = 0; i < 4; i++)
        {
            for(var j = 0; j < 3; j++){
            r = new Rectangle(i * Size, j * Size, i*Size + Size, j * Size + Size) ;
            array.push(r);
            }

        }
        shufflePuzzle(array, 15);
        drawImage();
    }
    function Rectangle(left,top,right,bottom)
    {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.width = right - left;
        this.height = bottom - top;
    }
    function shufflePuzzle(times){
        var count = 0;
        var temp;
        var index1;
        var index2;
        while(count<times)
        {
            index1 = Math.floor(Math.random()*array.length);
            index2 = Math.floor(Math.random()*array.length);
            temp = array[index1];
            array[index1] = index2;
            index2 = temp;
            count ++;
        }
    }
    function drawImage(){
        var r;
        for(var i = 0; i < 4; i++)
        {
            for(var j = 0; j < 3; j++){
                r = array[i*3+j];
                ctx.drawImage(image, r.left, r.top, r.height, r.width, i*Size,j.Size,Size, Size)
            }
        }
    }
    function highLightArea(drawX, drawY)
    {
        ctx.beginPath();
        ctx.moveTo(drawX,drawY);
        ctx.lineTo(drawX + Size, drawY);
        ctx.lineTo(drawX + Size, drawY + Size);
        ctx.lineTo(drawX, drawY + Size);
        ctx.lineTo(drawX,drawY);
        ctx.lineWidth = 2;

        ctx.strokeStyle = "black";
        ctx.stroke();
    }
    function swapREcts(r1,r2){
        var index1;
        var index2;
        var temp = r1;
        index1 = array.indexOf(r1);
        index2 = array.indexOf(r2);
        
        array[index1] = r2;
        array[index2] = temp;
    }
    function onCanvasClick(evt){
        cX = evt.offsetX;
        cY = evt.offsetY;

        var drawX = Math.floor(cX / Size);
        var drawY = Math.floor(cY / Size);
        var index = drawX * 3 + drawY;
        var target = array[index];
        var highlight = true;
        drawX *= Size;
        drawY *= Size;

        ctx.clearRect(0, 0, 640, 480);

        if(picked1 != undefined && picked2 != undefined)
        {
            picked1 = picked2 = undefined;
        }

        else if (picked1 == undefined)
        {
            picked1 = target;
        }
        else{
            picked2 = target;
            swapREcts(picked1, picked2);
            highlight = false;
        }
        drawImage();
        if(highlight)
        {
            highLightArea(drawX,drawY);
        }
    }