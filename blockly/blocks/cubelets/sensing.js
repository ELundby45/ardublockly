goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');

Blockly.Blocks['get_sensor_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sensor value");
    this.setOutput(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
