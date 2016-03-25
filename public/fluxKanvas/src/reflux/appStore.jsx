var Reflux = require('reflux');
var AppActions = require('./appActions.jsx');

var AppStore = Reflux.createStore({
    listenables: [AppActions],
});

module.exports = AppStore;