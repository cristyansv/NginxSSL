var React = require('react');
var DocumentManager = require('./DocumentManager.jsx');
var LinesManager = require('./LinesManager.jsx');

var Reflux = require('reflux');
var MatrixActions = require('../../reflux/matrixActions.jsx');
var MatrixStore = require('../../reflux/matrixStore.jsx');


var LinesActions = require('../../reflux/linesActions.jsx');

var utils = require('../../services/utils.js');

var SvgCanvas = React.createClass({
    mixins: [Reflux.listenTo(MatrixStore, 'onChange')],
    getInitialState: function () {
        return {
            Matrix: {
                x: 0,
                y: 0,
                z: 1
            }
        }
    },

    componentWillMount: function () {
        MatrixActions.getMatrix();
    },
    onChange: function (event, Matrix) {
        this.setState({Matrix: Matrix});
    },
    transformString(Matrix){
        return "matrix(" +
            Matrix.z + "," +
            "0," +
            "0," +
            Matrix.z + "," +
            Matrix.x + "," +
            Matrix.y +
            ")";
    },
    onScroll: function(event){
        event.preventDefault();
        MatrixActions.scrollMatrix(event.deltaX, event.deltaY);
    },
    onClick: function (event){
        console.log('click');
        if(this.newDrag && this.newDrag.add){
            event.stopPropagation();
        }
    },
    newDrag: {
        status: false,
        x: 0,
        y: 0,
        add: false
    },
    onMouseDown: function(event){
        this.newDrag = {
            id: null,
            status: true,
            x: event.pageX,
            y: event.pageY,
            add: false
        };
    },
    onMouseMove: function(event){
        if(this.newDrag && this.newDrag.status){
            if(!this.newDrag.add){
                this.newDrag.id = utils.generateID();
                this.newDrag.add = true;

                LinesActions.addLine(this.newDrag.id, this.newDrag.x, this.newDrag.y);
            }
            LinesActions.addLinePoint(this.newDrag.id, event.pageX, event.pageY);
        }
    },
    onMouseUp: function(event){

        if(this.newDrag && this.newDrag.status && this.newDrag.add){
            LinesActions.endLine(this.newDrag.id);
        }

        this.newDrag = {
            id: null,
            status: false,
            x: 0,
            y: 0,
            add: false
        }
    },
    render: function () {
        var svgStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            backgroundColor: '#dee3ea',
            zIndex: '0'
        };

        return (
            <svg
                onClick = {this.onClick}
                onMouseDown = {this.onMouseDown}
                onMouseUp = {this.onMouseUp}
                onMouseMove = {this.onMouseMove}
                onWheel={this.onScroll}
                style={svgStyle}
                xmlns="http://www.w3.org/svg/2000"
            >
                <g transform={this.transformString(this.state.Matrix)}>
                    <DocumentManager />
                    <LinesManager />
                </g>
            </svg>
        )
    }
});

module.exports = SvgCanvas;