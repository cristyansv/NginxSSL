var React = require('react');

var ZoomIn = React.createClass({
    onClick: function(){
        this.props.zoom(this.props.action);
    },
    render: function () {

        var style = {
            padding: '5px',
        };

        return (
            <div onClick={this.onClick} style={style}>{this.props.icon}</div>
        )
    }
});

module.exports = ZoomIn;