var React = require('react');
var UI = require('./UI.jsx');
var Canvas = require('./Canvas.jsx');


var App = React.createClass({
    render: function(){
        return (
            <div>
                <Canvas />
                <UI />
            </div>
        );
    }
});

module.exports = App;
