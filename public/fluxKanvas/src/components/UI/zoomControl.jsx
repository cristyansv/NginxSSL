var React = require('react');
var ZoomButton = require('./zoomButton.jsx');

var MatrixActions = require('../../reflux/matrixActions.jsx');

var ZoomControl = React.createClass({
    zoomHandler: function (action){
        MatrixActions.zoom(action);
    },
    render: function () {

        var style = {
            backgroundColor: 'white',
            display: 'flex',
            borderRadius: '3px'
        };

        var outer = {
            borderRadius: '3px',
            padding: '1px',
            backgroundColor: 'black',
            position: 'absolute',
            left: '10px',
            top: '10px'
        };

        return (
            <div style={outer}>
                <div style={style}>
                    <ZoomButton action="In" icon="+" zoom={this.zoomHandler}/>
                    <ZoomButton action="Out" icon="-" zoom={this.zoomHandler}/>
                </div>
            </div>
        )
    }
});

module.exports = ZoomControl;