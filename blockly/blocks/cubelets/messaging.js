goog.provide('Blockly.Blocks.messaging');

goog.require('Blockly.Blocks');

Blockly.Blocks.messaging.HUE = 206;

Blockly.Blocks['set_block_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(Blockly.Blocks.messaging.HUE);
    this.appendValueInput("block_value")
        .setCheck("Number")
        .appendField("set block value to");
    this.appendValueInput("ID")
        .setCheck("Number")
        .appendField("for id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['get_block_value'] = {
  init: function() {
    this.appendValueInput("ID")
        .setCheck("Number")
        .appendField("get block value for block with ID");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.messaging.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
