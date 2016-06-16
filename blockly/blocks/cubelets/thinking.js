goog.provide('Blockly.Blocks.thinking');

goog.require('Blockly.Blocks');

Blockly.Blocks['weighted_average'] = {
  init: function() {
  	this.setColour(45);
    this.appendDummyInput()
        .appendField("weighted average");
    this.setOutput(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['maximum'] = {
  init: function() {
  	this.setColour(45);
    this.appendDummyInput()
        .appendField("maximum");
    this.setOutput(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['minimum'] = {
  init: function() {
  	this.setColour(45);
    this.appendDummyInput()
        .appendField("minimum");
    this.setOutput(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['inverse'] = {
  init: function() {
  	this.setColour(45);
    this.appendValueInput("inverse_of")
        .setCheck("Number")
        .appendField("inverse of");
    this.setOutput(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
