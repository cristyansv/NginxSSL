var Reflux = require('reflux');
var MatrixActions = require('./matrixActions.jsx');

var DocumentStore = require('./documentStore.jsx');

var MatrixStore = Reflux.createStore({
    listenables: [MatrixActions],
    Matrix: {
        x: 0,
        y: 0,
        z: 1
    },
    getMatrix: function () {
        return this.Matrix;
    },
    zoom: function (type) {

        var center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        var centerInMat = {
            x: (center.x - this.Matrix.x) / this.Matrix.z,
            y: (center.y - this.Matrix.y) / this.Matrix.z
        };

        var newZoom = this.Matrix.z;

        if ('In' == type) {
            newZoom *= 1.2;
        }

        if ('Out' == type) {
            newZoom /= 1.2;
        }

        var newCenter = {
            x: (center.x - this.Matrix.x) / newZoom,
            y: (center.y - this.Matrix.y) / newZoom
        };

        var dif = {
            x: (centerInMat.x - newCenter.x) * newZoom,
            y: (centerInMat.y - newCenter.y) * newZoom
        };


        this.setMatrix(this.Matrix.x - dif.x, this.Matrix.y - dif.y, newZoom);
    },
    setMatrix: function (x, y, z) {
        this.Matrix.x = x;
        this.Matrix.y = y;
        this.Matrix.z = z || this.Matrix.z;
        this.fireUpdate();
    },
    smoothMatrix: function (x, y, z) {
        var timestamp = new Date();
        var lasStep = timestamp;
        var index = 0;

        var velocity = 300;

        var scaleX = ((this.Matrix.x) - x) / velocity;
        var scaleY = ((this.Matrix.y) - y) / velocity;

        var scaleZoom = (z - this.Matrix.z) / velocity;
        function moveStep() {
            var now = new Date();
            var diference = now - lasStep;
            lasStep = now;
            this.setMatrix(
                (this.Matrix.x) - (diference * scaleX),
                (this.Matrix.y) - (diference * scaleY),
                this.Matrix.z + (scaleZoom * diference));

            if ((now - timestamp) < velocity) {
                requestAnimationFrame(moveStep.bind(this));
            } else {
                this.setMatrix(x, y, z);
            }
        }

        moveStep.bind(this)();
    },
    scrollMatrix: function (deltaX, deltaY) {
        this.setMatrix(this.Matrix.x += (deltaX * -1), this.Matrix.y += (deltaY * -1), this.Matrix.z);
    },
    zoomBounds: function (bounds, instant) {

        var h = window.innerHeight;
        var w = window.innerWidth;

        var newZoom = Math.min((h - 50) / bounds.height, (w - 50) / bounds.width);

        if(instant){
            this.setMatrix((w / 2) - ((bounds.width / 2) * newZoom), (h / 2) - (((bounds.height / 2) + bounds.y) * newZoom), newZoom);
        }else {
            this.smoothMatrix((w / 2) - ((bounds.width / 2) * newZoom), (h / 2) - (((bounds.height / 2) + bounds.y) * newZoom), newZoom);
        }
    },
    fireUpdate: function () {
        this.trigger('change', this.Matrix);
    }
});

module.exports = MatrixStore;