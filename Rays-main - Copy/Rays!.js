canvas = document.createElement("canvas");
canvas.width = 750;
canvas.height = 750;
ctx = canvas.getContext("2d");
document.body.insertBefore(canvas, document.body.childNodes[0]);

class point {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        }
    }

class quad {
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }

    render = function(c) {
        var sp1 = c.renderpoint(this.p1);
        var sp2 = c.renderpoint(this.p2);
        var sp3 = c.renderpoint(this.p3);
        var sp4 = c.renderpoint(this.p4);

        //ctx.beginPath();
        //ctx.

       //console.log([sp1, sp2, sp3, sp4])
    }
}

class camera{
    constructor(x, y, z, size, dist){
        this.x = x;
        this.y = y;
        this.z = z;
        this.hang = 0;
        this.vang = 0;
        this.size = size;
        this.dist = dist;
        this.screen = [];
        this.clearscreen();
    }

    clearscreen = function(){
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.rect(0, 0, 750, 750);
        ctx.fill();
        this.screen = [];
        var i = 0;
        while(i < this.size){
            this.screen.push([]);
            var s = 0;
            while(s < this.size){
                this.screen[i].push(0);
                s++;
            }
            i++;
        }
    }

    renderall = function(list) {
        var runs = 0;
        while(runs < list.length) {
            this.renderpoint(list[runs]);
            runs ++;
        }
    }
    
    renderpoint = function(p){
        var run = 0;
        var run = p.x - this.x;
        var rise = p.y - this.y;
        if(rise < 0) {
            return;
        }
        var what = p.z - this.z;
        //console.log([run, rise, what])
        if(run != 0){
            //console.log(1)
            var goes = this.dist / rise;
            run *= goes;
            what *= goes;
        }
        var pix = Math.round((this.size / 2) + run);
        var piz = Math.round((this.size / 2) + what);
        //console.log(pix);
        //console.log(piz);
        if(pix < this.size && pix > 0 && piz < this.size && piz > 0) {
            this.screen[piz][pix] =  1;
        }
        return([piz, pix]);
    }        
}

var Run = function() {
    cam.clearscreen();
    
    var test = new quad(new point(240, 400, 240), new point(230, 400, 240), new point(240, 400, 230), new point(230, 400, 230))
    cam.renderpoint(new point(240, 390, 240));
    cam.renderpoint(new point(230, 390, 240));
    cam.renderpoint(new point(240, 390, 230));
    cam.renderpoint(new point(230, 390, 230));

    cam.renderpoint(new point(260, 390, 240));
    cam.renderpoint(new point(250, 390, 240));
    cam.renderpoint(new point(260, 390, 230));
    cam.renderpoint(new point(250, 390, 230));

    cam.renderpoint(new point(260, 400, 240));
    cam.renderpoint(new point(250, 400, 240));
    cam.renderpoint(new point(260, 400, 230));
    cam.renderpoint(new point(250, 400, 230));


    cam.renderpoint(new point(250, 590, 240));
    cam.renderpoint(new point(240, 590, 240));
    cam.renderpoint(new point(250, 590, 230));
    cam.renderpoint(new point(240, 590, 230));

    cam.renderpoint(new point(250, 600, 240));
    cam.renderpoint(new point(240, 600, 240));
    cam.renderpoint(new point(250, 600, 230));
    cam.renderpoint(new point(240, 600, 230));
    //console.log(cam.screen);
    test.render(cam);
    ctx.fillStyle = "#FFFFFF";
    var goes = 0;
    var square = [];
    while(goes < cam.screen.length) {
        var goes2 = 0;
        while(goes2 < cam.screen.length) {
            if(cam.screen[goes2][goes] == 1) {
                ctx.beginPath();
                ctx.rect(goes, goes2, 3, 3);
                ctx.fill();
                square.push([goes, goes2]);
            }
            goes2 ++;
        }
       goes ++;
    }
    var goes = 0;
    while(goes < square.length) {
        
        goes ++;
    }
    //console.log(square);
    if(key == "s") {cam.z ++;}
    if(key == "w") {cam.z --;}
    if(key == "d") {cam.x ++;}
    if(key == "a") {cam.x --;}
    if(key == "k") {cam.y ++;}
    if(key == "i") {cam.y --;}
    if(key == "e") {cam.hang ++;}
    if(key == "q") {cam.hang --;}
    if(key == "z") {cam.vang ++;}
    if(key == "x") {cam.vang --;}
};

var key = false;
window.addEventListener('keydown', function (e) {
    key = e.key;
})
  window.addEventListener('keyup', function (e) {
    key = false;
})

var cam = new camera(250, 200, 250, 750, 400);
//var ps = [new point(1,3,0), new point(2,4,0), new point(3,6,0), new point(4,8,0)];
var Interv = setInterval(Run, 16);
/* cam.renderpoint(new point(4, 4, 2));
console.log(cam.screen);
cam.x -= 2;
cam.clearscreen();
cam.renderpoint(new point(4, 4, 2));
console.log(cam.screen); */