svg = document.getElementById('svgApp');

canvas = document.getElementById('canvas');


function calcResize(event){
    svg.style.width = window.innerWidth;
    svg.style.height = window.innerHeight;
}

calcResize();

window.addEventListener('resize', function(event){
    calcResize(event);
});



svg.addEventListener('mousewheel', function(event){
    setMatrix(appMat.e+=(event.deltaX*-1), appMat.f+=(event.deltaY*-1));
});

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

}