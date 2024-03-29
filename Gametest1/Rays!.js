class creature {
    constructor(x,y,data) {

    }
}

class player {
    constructor(x,y,jmap) {
        this.x = x;
        this.y = y;
        this.jmap = jmap;
        this.xvel = 0;
        this.yvel = 0;
        this.movespeed = 1;
    }

    move() {
        if(key == "b") {
            console.log([mousex, mousey, charx, chary])
            if(mousex > charx) {charx += movementspeed;}
            else if(mousex < charx) {charx -= movementspeed;}
            //if(mousey > chary) {chary += movementspeed;}
            //else if(mousey < chary) {chary -= movementspeed;}
            key = false
        }

        this.x += this.xvel * this.movespeed;
        this.y += this.yvel * this.movespeed;

        if(this.xvel < 0) {this.xvel += drag;}
        else if(this.xvel > 0) {this.xvel -= drag;}
        if(this.yvel < 0) {this.yvel += drag;}
        else if(this.yvel > 0) {this.yvel -= drag;}
    }

    draw() {
        //console.log(this.jmap.joints)
        var x = this.x;
        var y = this.y;
        for (let i = 0; i < this.jmap.joints.length; i++) {
            var joint = this.jmap.joints[i];
            if(joint[0] != "origin") {

            }
            //console.log(joint);
        }
    }
}

var screensetup = function() {
    //width needs 256
    //height needs 176
    var widthlower = Math.floor(swidth/256);
    var heightlower = Math.floor(sheight/176);

    if(widthlower > heightlower) {mult = heightlower;}
    else if(widthlower < heightlower) {mult = widthlower;}
    else {mult = heightlower}

    var widthremain = swidth-(256*mult)
    var heightremain = sheight-(176*mult)

    left = Math.floor(widthremain/2);
    zero = Math.floor(heightremain/2);

    canvas = document.createElement("canvas");
    canvas.width = swidth;
    canvas.height = sheight;
    ctx = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    canvas.style.cursor = "none";
    loaddata();
}

var loaddata = function() {
    fetch("https://millibort.github.io/Gametest1/data/ground.json").then(res => res.json()).then(json => data[0] = json);
    fetch("https://millibort.github.io/Gametest1/data/air.json").then(res => res.json()).then(json => data[1] = json);
    fetch("https://millibort.github.io/Gametest1/data/water.json").then(res => res.json()).then(json => data[2] = json);
    fetch("https://millibort.github.io/Gametest1/data/grass.json").then(res => res.json()).then(json => data[3] = json);
    fetch("https://millibort.github.io/Gametest1/data/island.json").then(res => res.json()).then(json => data[4] = json);
    fetch("https://millibort.github.io/Gametest1/data/island2.json").then(res => res.json()).then(json => data[5] = json);
    fetch("https://millibort.github.io/Gametest1/data/island3.json").then(res => res.json()).then(json => data[6] = json);
    fetch("https://millibort.github.io/Gametest1/data/dede(S).json").then(res => res.json()).then(json => data[7] = json);
    fetch("https://millibort.github.io/Gametest1/data/map1.json").then(res => res.json()).then(json => maps[0] = json);
    fetch("https://millibort.github.io/Gametest1/data/background.json").then(res => res.json()).then(json => maps[1] = json);
    fetch("https://millibort.github.io/Gametest1/data/dede.json").then(res => res.json()).then(json => maps[2] = json);
    pre = setInterval(prerun, 100);
}

function prerun() {
    if(maps[back] != 1) {
        clearInterval(pre);
        console.log(data);
        console.log(maps)
        dede = new player(50, 157, maps[2])
        setInterval(Run, 50);
    }
}

var Run = function() {
    if(Math.floor(new Date().getTime() / 1000) > oldtime) {
        console.log(fps)
        fps = 0
        oldtime = Math.floor(new Date().getTime() / 1000)
    }
    else {
        fps ++
    }

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, swidth, sheight);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(left, zero, 256*mult, 176*mult);
    ctx.fill();

    //background draw
    const length = 64 * 2;
    const height = 44 * 2;
    const size = 2;
    var x = 0;
    while(x < length) {
        var y = 0;
        while(y < height){
            ctx.fillStyle = maps[back].map[y][x];
            ctx.beginPath();
            ctx.rect(left + (x*mult*size), zero + (y*mult*size), size*mult, size*mult);
            ctx.fill();
            y++;
        }
        x++;
    }

    var i2 = 0;
    while(i2<11) {
        var i = 0;
        while(i<16) {
            var num = maps[map].map[i2][i];
            var i3 = 0;
            while(i3<16) {
                var i4 = 0;
                while(i4<16) {
                    if(data[num].texture[Math.floor(an)][i3][i4] != "clear") {
                        ctx.fillStyle = data[num].texture[Math.floor(an)][i3][i4];
                        ctx.beginPath();
                        ctx.rect(left + (i*16*mult) + (i4*mult), zero + (i2*16*mult) + (i3*mult), 1*mult, 1*mult);
                        ctx.fill();
                    }
                    i4++;
                }
                i3++;
            }
            i++;
        }
        i2++
    }
    an+=0.25;
    if(an > 3.9999) {an = 0;}

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(left + (mousex*mult), zero + (mousey*mult), 1*mult, 1*mult);
    ctx.fill();
    //console.log(mousebutton)
    dede.draw()
}

var mousex = false;
var mousey = false;
var key = false;
var mousebutton = false;


window.addEventListener('mousedown', function (e) {
    mousebutton = e.button;
})
  window.addEventListener('mouseup', function (e) {
    mousebutton = false;
})
window.addEventListener('keydown', function (e) {
    key = e.key;
})
  window.addEventListener('keyup', function (e) {
    key = false;
})
window.addEventListener('keyup', function (e) {
    key = false;
})
function mousemove(event){ 
    mousex = Math.floor((event.clientX -left) / mult);
    mousey =  Math.floor((event.clientY -zero) / mult);
}
window.addEventListener('mousemove', mousemove);

const drag = 1;
var dede = "hold"
var oldtime = Math.floor(new Date().getTime() / 1000)
var fps = 0
const map = 0;
const back = 1;
var an = 0;
var done;
var pre;
var data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var maps = [1,1,1,1,1,1,1,1,1,1,1,1,1]
var mult;
var zero;
var left;
const swidth = window. innerWidth -20;
const sheight = window. innerHeight -20;
screensetup();