goog.provide('Blockly.Blocks.thinking');

goog.require('Blockly.Blocks');

Blockly.Blocks['weighted_average'] = {
  init: function() {
  	this.setColour(45);
    this.appendDummyInput()
        .appendField("weighted average");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['maximum'] = {
  init: function() {
  	this.setColour(45);
    this.appendDummyInput()
        .appendField("maximum");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['minimum'] = {
  init: function() {
  	this.setColour(45);
    this.appendDummyInput()
        .appendField("minimum");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['inverse'] = {
  init: function() {
  	this.setColour(45);
    this.appendValueInput("inverse_of")
        .setCheck("Number")
        .appendField("inverse of");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
