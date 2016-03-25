var Reflux = require('reflux');
var DocumentActions = require('./documentActions.jsx');

var DocumentStore = Reflux.createStore({
    listenables: [DocumentActions],
    bounds: {},
    getBounds: function(){
        return this.bounds;
    },
    setBounds: function(bounds){
        this.bounds = bounds;
        this.boundUpdate();
    },
    boundUpdate: function(){
        this.trigger('change', this.bounds);
    }
});

module.exports = DocumentStore;