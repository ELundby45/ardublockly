goog.provide('Blockly.Blocks.thinking');

goog.require('Blockly.Blocks');

Blockly.Blocks.thinking.HUE = 120;

Blockly.Blocks['weighted_average'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.thinking.HUE);
    this.appendDummyInput()
        .appendField("weighted average");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('Calculate the Cubelets weighted average of neighboring Cubelets blocks values.');
    //this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['maximum'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.thinking.HUE);
    this.appendDummyInput()
        .appendField("maximum");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('Returns the largest block value from neighboring blocks.');
    //this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['minimum'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.thinking.HUE);
    this.appendDummyInput()
        .appendField("minimum");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('Returns the smallest block value from neighboring blocks.');
    //this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['inverse'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.thinking.HUE);
    this.appendValueInput("inverse_of")
        .setCheck("Number")
        .appendField("inverse of");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip('Returns the inverse of the supplied block value.');
    //this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
