var UnityProgress = function(dom){
    this.progress = 0;
    this.message = '';
    this.dom = dom;

    this.message = dom.parentNode.querySelector('.progress-message');
    this.value = dom.parentNode.querySelector('.progress-value');

    this.progressContainer = dom.parentNode.querySelector('.webgl-loader-container');

    this.Awake();
};

UnityProgress.prototype = {

    Awake: function(){

    },
    
    SetProgress: function(progress){
        this.value.innerHTML = Math.round(progress * 100) + '%';
    },

    SetMessage: function(message){
        this.message.innerHTML = message;
    },

    Clear: function(){
        this.message.innerHTML = '';
        this.value.innerHTML = '';

        this.progressContainer.parentNode.removeChild(this.progressContainer);
    },

    Update: function(){
        
    }

};