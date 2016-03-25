var Reflux = require('reflux');
var LinesActions = require('./linesActions.jsx');
var utils = require('../services/utils.js');

var simplify = require('../services/simplify.js');

var MatrixStore = require('./MatrixStore.jsx');

var LinesStore = Reflux.createStore({
    listenables: [LinesActions],
    Lines: [],
    getLines: function(){
        this.fireUpdate();
    },
    addLine: function(id, x, y){

        var Matrix = MatrixStore.getMatrix();

        var point = {
            x: (x - Matrix.x) / Matrix.z,
            y: (y - Matrix.y) / Matrix.z
        };

        var newLine = {
            id: id,
            points: [point]
        };

        this.Lines.push(newLine);
        this.fireUpdate();
    },
    addLinePoint: function(id, x, y){

        var Matrix = MatrixStore.getMatrix();

        var updateLine = utils.findById(id, this.Lines, 'id').object;

        var point = {
            x: (x - Matrix.x) / Matrix.z,
            y: (y - Matrix.y) / Matrix.z
        };
        updateLine.points.push(point);
        this.fireUpdate();
    },
    endLine: function(id){
        var updateLine = utils.findById(id, this.Lines, 'id').object;
        console.log(updateLine.points.length);
        updateLine.points = simplify(updateLine.points, 3, false);
        console.log(updateLine.points.length);
        this.fireUpdate();

    },
    fireUpdate: function(){
        this.trigger('change', this.Lines);
    }
});

module.exports = LinesStore;