// variabelen voor verplaatsing sprite
var x = -100;
var y = 190;
var xStep = 2;
var yStep = 2;	//yStep verplaatsing in y-richting nog niet gebruikt
var speed = 4;

// variabelen voor de bom
var xBom = 300;
var yBom = 0;
var xStepBom = 2;
var yStepBom = 2;	//yStep verplaatsing in y-richting nog niet gebruikt
var speedBom = 9;
var xB0,  yB0; //variabelen nodig voor het gedeelte van de afbeelding (sprite) en de plek in het canvas
var wFrameB  = 200;		//breedte van 1 frame van de afbeelding
var hFrameB  = 80;		//hoogte van het frame
var frameNrB = 0;		//de sprite bevat meerdere frames. Het frameNr wordt op 0 gezet (= eerste frame)
var rowsB = 1, colsB = 4;

// vars voor explosie
var x0E, y0E;
var wFrameE = 128;
var hFrameE = 112;
var FrameNrE = 0;
var RowsE = 1, colsE = 4;





//algemene variabelen
var fps = 20;
var ctx, stage;

//variabelen, nodig voor de kat
var x0,  y0; //variabelen nodig voor het gedeelte van de afbeelding (sprite) en de plek in het canvas
var wFrame  = 100;		//breedte van 1 frame van de afbeelding
var hFrame  = 90;		//hoogte van het frame
var frameNr = 0;		//de sprite bevat meerdere frames. Het frameNr wordt op 0 gezet (= eerste frame)
var rows = 1, cols = 6;


var bValBom = false;
var hit = false;
var tBom = false;
var SpeedAdd = false;
var SpeedMinus = false;
var punt = 0;

var imgforward = new Image();
var imgbackward = new Image();
var bg  = new Image();
var bomb = new Image();
var exp = new Image();
window.onload = init;
document.onkeydown = checkKey;



function init() {
    stage = document.getElementById('stage');
    ctx   = stage.getContext("2d");
    imgforward.src = 'afb/trump_run.png';
    imgbackward.src = 'afb/trump_backward.png';
    bg.src  = 'afb/bg_zee.jpg';
    bomb.src = 'afb/banana.png';
    exp.src = 'afb/explosie1.png';
    setInterval( teken, (1000 / fps) );

}


function checkKey(e){
    e = e || window.event;

    if(e.keyCode == 32) {
        bValBom = true;
    }else if (e.keyCode == '37') {
        speed--;
    }
    else if (e.keyCode == '39') {
        speed++;
    }


}









function teken()
{

    // ------------ draw canvas bg (bg-zee) ------------------------------------------- //
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, stage.width, stage.height);
    ctx.drawImage(bg, 0,  0, stage.width, stage.height);

    // ------------ draw cat (bg-zee) ------------------------------------------------- //
    x = x + speed * xStep;
    y = y - 0.05;
    if(x > stage.width) {
        x = -1 * wFrame;
        y = 190;
    }
    if (x < 0 - wFrame){
        x = 6 * wFrame;
        y = 190;
    }
    x0 = frameNr*wFrame;
    y0 = 0;
    if(speed === 0){
        y = 190;
    }
    if(speed > 0){
        ctx.drawImage(imgforward, x0, y0, wFrame, hFrame, x, y, wFrame, hFrame);
        frameNr++;
    }else {
        ctx.drawImage(imgbackward, x0, y0, wFrame, hFrame, x, y, wFrame, hFrame);
        frameNr++;
    }
    if (frameNr >= cols) { frameNr = 0; }


    ctx.drawImage(bomb, xBom, yBom, 30, 50 );
    if(bValBom){
        yBom = yBom + yStepBom * speedBom;
        if( yBom > 235){
            yBom = 0;
            bValBom = false;

        }
    }


    document.getElementById("snelheid").innerHTML = speed;

    // EXPLOSIE
    if(yBom + 20 > y && xBom -10 > x && xBom  < (x + wFrame)){
        console.log("HIT");
        bValBom = false;
        tBom = true;
        hit = true;
        x = -100 - wFrame;
        console.log(tBom);
        yBom = 0;
    }
    if(hit){
        punt++;
        document.getElementById("score").innerHTML = punt;
        hit = false;

    }

    if(tBom){
        x0E = FrameNrE * wFrameE;
        y0E = 0;
        FrameNrE++;
        if(FrameNrE >= colsE) {
            FrameNrE = 0;
            tBom = false;
        }
        ctx.drawImage(exp, x0E, y0E, wFrameE, hFrameE, xBom - (wFrameE / 2), y - 15, wFrameE, hFrameE);
    }

}







