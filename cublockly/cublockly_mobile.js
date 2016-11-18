

/** Create a namespace for the application. */
var Cublockly = Cublockly || {};

Cublockly.htmlPrompt = function(message, defaultValue, callback) {
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
  $('#gen_prompt_ok_link').bind('click', function() {
    input.off('keypress');
    $('#changeValueModal').foundation('close');
    callback(input.val());
  });
  $('#gen_prompt_cancel_link').bind('click', function() {
    input.off('keypress');
    //$('#changeValueModal').foundation('close');
    callback(null);
  });

  input.keypress(function (e) {
    console.log(e);
    if (e.which == 13) {
      $('#gen_prompt_ok_link').click();
      return false;
    }
  });
  //TODO on close:
  //$('#gen_prompt_input').off('keypress');

  $('#changeValueModal').foundation('open');
  input.focus();
  input.select();
  window.location.hash = '';
};

/** Initialize Cublockly code required for Electron on page load. */
window.addEventListener('load', function load(event) {
  window.removeEventListener('load', load, false);
  $(document).foundation();
  // Original signature: function(message, opt_defaultInput, opt_callback)
  Blockly.prompt = Cublockly.htmlPrompt;
});
