var svg = document.getElementById('svgApp');

var canvas = document.getElementById('canvas');

var pages = document.getElementsByClassName('page');


function calcResize(event) {
    svg.style.width = window.innerWidth + "px";
    svg.style.height = window.innerHeight + "px";
}

calcResize();

window.addEventListener('resize', function (event) {
    calcResize(event);
});

window.addEventListener('click', function (event) {

    if (event.target && event.target.nodeName == 'image' && appMat.a < 0.7) {
        var pageClick = null;
        for (var i = 0; i < pages.length; i++) {
            if (event.target.parentNode == pages[i]) {
                pageClick = i;
                break;
            }
        }
        if (pageClick != null) {
            focusPage(pageClick + 1);
        }
    }

    if (event.target && event.target.nodeName == 'DIV') {
        if (event.target.id == "zoomOut") {
            zoomChange('out')
        } else if (event.target.id == "zoomIn") {
            zoomChange('in');
        } else if (event.target.id == "all") {
            smoothMatrix(400, 30, 0.3)
        }

    }
});


function wh(event) {
    setMatrix(appMat.e += (event.deltaX * -1), appMat.f += (event.deltaY * -1));
}


var appTransform = svg.createSVGTransformFromMatrix(svg.createSVGMatrix());
var appMat = appTransform.matrix;
canvas.transform.baseVal.appendItem(appTransform);


function setMatrix(x, y, z) {
    //zoom
    appMat.a = z || appMat.a;
    appMat.d = z || appMat.a;

    // OffSet x & y
    appMat.e = x;
    appMat.f = y;

    canvas.transform.baseVal.getItem(0).setMatrix(appMat);
}

function focusPage(pageNumber, zero) {

    if (!pageNumber) return false;

    var selectPage = pages[pageNumber - 1];


    var box = selectPage.getBBox();

    var h = window.innerHeight;
    var w = window.innerWidth;

    var newZoom = Math.min((h - 50) / box.height, (w - 50) / box.width);


    if (!zero) {
        smoothMatrix((w / 2) - ((box.width / 2) * newZoom), (h / 2) - (((box.height / 2) + box.y) * newZoom), newZoom);
    } else {
        setMatrix((w / 2) - ((box.width / 2) * newZoom), (h / 2) - (((box.height / 2) + box.y) * newZoom), newZoom);
    }

}


function smoothMatrix(x, y, z) {
    var timestamp = new Date();
    var lasStep = timestamp;
    var index = 0;

    var velocity = 300;

    var scaleX = ((appMat.e) - x) / velocity;
    var scaleY = ((appMat.f) - y) / velocity;

    var scaleZoom = (z - appMat.a) / velocity;


    function moveStep() {
        var now = new Date();
        var diference = now - lasStep;
        lasStep = now;
        setMatrix((appMat.e) - (diference * scaleX), (appMat.f) - (diference * scaleY), appMat.a + (scaleZoom * diference));

        if ((now - timestamp) < velocity) {
            requestAnimationFrame(moveStep);
        } else {
            setMatrix(x, y, z);
        }
    }

    moveStep();
}

function zoomChange(mode) {

    var docBox = canvas.getBBox();

    var center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    var centerInMat = getXYMat(center.x, center.y);

    var newZoom = appMat.a;

    if ('in' == mode) {
        newZoom *= 1.2;
    }

    if ('out' == mode) {
        newZoom /= 1.2;
    }

    var newCenter = {
        x: (center.x - appMat.e) / newZoom,
        y: (center.y - appMat.f) / newZoom
    };

    var dif = {
        x: (centerInMat.x - newCenter.x) * newZoom,
        y: (centerInMat.y - newCenter.y) * newZoom
    };

    setMatrix(appMat.e - dif.x, appMat.f - dif.y, newZoom);

}


function getXYMat(x,y){
    return {
        x: (x - appMat.e) / appMat.a,
        y: (y - appMat.f) / appMat.a
    }
}

focusPage(1, true);


