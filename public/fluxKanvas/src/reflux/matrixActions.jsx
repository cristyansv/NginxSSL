var Reflux = require('reflux');

var MatrixActions = Reflux.createActions([
    'getMatrix',
    'setMatrix',
    'scrollMatrix',
    'zoom',
    'zoomBounds'
]);

module.exports = MatrixActions;