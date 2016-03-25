var React = require('react');
var Line = require('./Line.jsx');

var Reflux = require('reflux');

var LinesActions = require('../../reflux/linesActions.jsx');
var LinesStore = require('../../reflux/linesStore.jsx');



var LinesManager = React.createClass({
    mixins: [Reflux.listenTo(LinesStore, 'onChange')],
    getInitialState: function(){
        return {
            Lines: []
        }
    },
    componentWillMount: function(){
        LinesActions.getLines();
    },
    onChange: function(event, Lines) {
        this.setState({Lines: Lines});
    },
    render: function () {
        var Lines = this.state.Lines.map(function(line){
            return <Line key={line.id} points={line.points}/>
        });

        return (
            <g>
                {Lines}
            </g>
        )
    }
});

module.exports = LinesManager;