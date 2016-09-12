goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');

Blockly.Blocks.sensing.HUE = 338;

Blockly.Blocks['get_sensor_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sensor value");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('For use on Sense Cubelets only. Read the value of the sensor. Returns a number 0-255.');
    this.setColour(Blockly.Blocks.sensing.HUE);
    //this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
