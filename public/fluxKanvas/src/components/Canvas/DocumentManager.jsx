var React = require('react');
var Document = require('./Document.jsx');

var Reflux = require('reflux');

var DocumentActions = require('../../reflux/documentActions.jsx');
var DocumentStore = require('../../reflux/documentStore.jsx');

var MatrixActions = require('../../reflux/matrixActions.jsx');


var Documents = [
    {
        id: "kotzhyqfr_grad1jor_1",
        src: "/images/kotzhyqfr_grad1jor_1.svg",
        x: 0,
        y: 0,
        height: 792,
        width: 612
    },
];

var DocumentManager = React.createClass({
    componentWillMount(){
        MatrixActions.zoomBounds(Documents[0], true);
    },
    componentDidMount: function() {
        DocumentActions.setBounds(this.refs.canvas.getBBox());
    },
    focusManager: function(bounds){
        MatrixActions.zoomBounds(bounds);
    },
    render: function () {

        var documentList = Documents.map(function(doc){
            return <Document focus={this.focusManager} key={doc.id} src={doc.src} x={doc.x} y={doc.y} width={doc.width} height={doc.height} />
        }.bind(this));

        return (
            <g ref="canvas">
                {documentList}
            </g>
        )
    }
});

module.exports = DocumentManager;