var React = require('react');
var ZoomControl = require('./UI/zoomControl.jsx');

var UI = React.createClass({
    render: function () {

        var uiStyle = {
            position: 'absolute',
            zIndex: '10'
        };

        return (
            <div style={uiStyle}>
                <ZoomControl />
            </div>
        )
    }
});

module.exports = UI;