var service = {
    generateID: function(){
        return "K"+Math.random().toString(36).slice(-8);
    },
    findById: function(value, array, search){
        var len = array.length;
        for(var i=0; i<len; i++){
            if(array[i][search] == value){
                return {
                    index: i,
                    object: array[i]
                }
            }
        }
        return null;
    }
};


module.exports = service;