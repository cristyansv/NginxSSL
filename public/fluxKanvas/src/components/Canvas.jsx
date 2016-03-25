var React = require('react');
var SvgCanvas = require('./Canvas/SvgCanvas.jsx');




var Canvas = React.createClass({
    render: function () {
        return (
            <div>
                <SvgCanvas  />
            </div>
        )
    }
});

module.exports = Canvas;