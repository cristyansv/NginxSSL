svg = document.getElementById('svgApp');

canvas = document.getElementById('canvas');


function calcResize(event){
    svg.style.width = window.innerWidth + "px";
    svg.style.height = window.innerHeight + "px";
}

calcResize();

window.addEventListener('resize', function(event){
    calcResize(event);
});

function wh(event){
    setMatrix(appMat.e+=(event.deltaX*-1), appMat.f+=(event.deltaY*-1));
    console.log(event);
}


var appTransform = svg.createSVGTransformFromMatrix(svg.createSVGMatrix());
var appMat = appTransform.matrix;
canvas.transform.baseVal.appendItem(appTransform);


function setMatrix(x,y,z){

    //zoom
    appMat.a = z || appMat.a;
    appMat.d = z || appMat.a;

    // OffSet x & y
    appMat.e = x;
    appMat.f = y;

    canvas.transform.baseVal.getItem(0).setMatrix(appMat);
}


