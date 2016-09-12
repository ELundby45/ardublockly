goog.provide('Blockly.Blocks.messaging');

goog.require('Blockly.Blocks');

Blockly.Blocks.messaging.HUE = 206;

Blockly.Blocks['set_block_value'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(Blockly.Blocks.messaging.HUE);
    this.appendValueInput("block_value")
        .setCheck("Number")
        .appendField("set block value to");
    this.appendValueInput("ID")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("for id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip("Override the block value of another Cubelet based on that Cubelet's ID.");
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
    this.setTooltip('Retrieve the block value of another Cubelet based on its ID.');
    //this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
