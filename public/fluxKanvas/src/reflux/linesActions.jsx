var Reflux = require('reflux');

var LinesActions = Reflux.createActions([
    'getLines',
    'setLines',
    'addLine',
    'updateLine',
    'addLinePoint',
    'endLine',
]);

module.exports = LinesActions;