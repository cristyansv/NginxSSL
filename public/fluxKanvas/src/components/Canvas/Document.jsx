var React = require('react');

var Document = React.createClass({
    componentWillMount: function (){
    },
    onClick: function(){
        this.props.focus(this.refs.doc.getBBox());
    },
    render: function () {
        return (
            <g onClick={this.onClick} ref="doc">
                <image
                    xmlns="http://www.w3.org/svg/2000"
                    xlinkHref={this.props.src}
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                />
            </g>
        )
    }
});

module.exports = Document;