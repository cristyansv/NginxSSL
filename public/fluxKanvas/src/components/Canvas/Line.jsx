var React = require('react');

var Line = React.createClass({
    pathString: function(points){
        var str = "M" + points[0].x + "," + points[0].y;

        for (var i=1; i<points.length; i++){
            str+= "L" + points[i].x + "," + points[i].y;
        }

        return str;
    },
    render: function () {

        var style = {
            strokeWidth: '2px'
        };

        return (
            <path
                style={style}
                stroke="#ff0000"
                fill="none"
                d={this.pathString(this.props.points)}
            />
        )
    }
});

module.exports = Line;