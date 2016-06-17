goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');

Blockly.Blocks['get_sensor_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sensor value");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
