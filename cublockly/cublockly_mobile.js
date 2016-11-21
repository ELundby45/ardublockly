

/** Create a namespace for the application. */
var Cublockly = Cublockly || {};

Cublockly.htmlPrompt = function(message, defaultValue, callback) {
  //iOS is having troubles when modal closes with infinite scrolling. disable until closed.
  Cublockly.disableResize = true;
  var input = null;
  if(!isNaN(defaultValue) && defaultValue){
    input = $('#gen_prompt_input_number');
    input.show();
    $('#gen_prompt_input_text').hide();
  }
  else{
    input = $('#gen_prompt_input_text');
    input.show();
    $('#gen_prompt_input_number').hide();
  }

  $('#gen_prompt_message').html('');
  $('#gen_prompt_message').append(message);
  input.val(defaultValue);
  // Bind callback events to buttons
  $('#gen_prompt_ok_link').on('click', function() {
    input.blur();
    $('#gen_prompt_ok_link').off('click');
    $('#changeValueModal').foundation('close');
    callback(input.val());
    Cublockly.disableResize = true;
  });

  input.keypress(function (e) {
    if (e.which == 13) {
      $('#gen_prompt_ok_link').click();
      return false;
    }
  });

  var onCloseHandler = function(){
    $('#changeValueModal').off('closed.zf.reveal', onCloseHandler);
    $('#gen_prompt_ok_link').off('click');
  }
  $('#changeValueModal').on('closed.zf.reveal', onCloseHandler);

  $('#changeValueModal').foundation('open');

  //These don't behave nicely on iOS
  //input.click();
  //input.focus();
  //input.select();
  //window.location.hash = '';
};

/** Initialize Cublockly code required for Electron on page load. */
window.addEventListener('load', function load(event) {
  window.removeEventListener('load', load, false);
  $(document).foundation();
  // Original signature: function(message, opt_defaultInput, opt_callback)
  Blockly.prompt = Cublockly.htmlPrompt;
});
