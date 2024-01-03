img = "" ;
var status = "" ;
objects = [] ;

function preload() {
    img = loadImage("TV.png") ;
}

function setup() {
    canvas = createCanvas(400 , 400) ;
    canvas.position(480 , 200) ;
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded) ;
    document.getElementById("status").innerHTML = "Status :- Detecting Objects" ;
}

function modelLoaded() {
    console.log("CoCoSSD is Initialised !") ;
    status = true ;
    objectDetector.detect(img , gotResults) ;
}
function gotResults(error , results) {
    if(error) {
        console.error(error) ;
    }
    console.log(results) ;
    objects = results ;
}

function draw() {
    image(img , 0 , 0 , 400 , 400) ;

    if(status != "") {
        for(i = 0 ; i < objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected" ;
            fill('#FF0000') ;
            stroke('#FF0000') ;
            noFill() ;
            percent = floor(objects[i].confidence * 100) ;
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y) ;
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height) ;
        }
    }
}
function back() {
    window.location = "index.html" ;
}