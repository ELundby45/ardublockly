goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');

Blockly.Blocks.sensing.HUE = 338;

Blockly.Blocks['get_sensor_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sensor value");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.sensing.HUE);
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
