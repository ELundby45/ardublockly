//Replace the console object with one that barfs to the screen if running in iframe.
window.console = {
    panel: $('body').append('<div id="debugInfo" style="position: absolute; z-index:999; top:0;"></div>'),
    log: function(m){
        $("#debugInfo").prepend('<div>'+m+'</div>');
    },
    warn: function(m){
        $("#debugInfo").prepend('<div>Warning: '+m+'</div>');
    }
};
