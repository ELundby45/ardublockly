goog.provide('Blockly.Blocks.acting');

goog.require('Blockly.Blocks');

Blockly.Blocks['set_actuator_value'] = {
  init: function() {
  	this.setColour(30);
    this.appendValueInput("actuator_value")
        .setCheck("Number")
        .appendField("set actuator value to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_flashlight'] = {
  init: function() {
    this.appendValueInput("block_value")
        .setCheck("Number")
        .appendField("set flashlight to");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_bar'] = {
  init: function() {
    this.appendValueInput("bar_index")
        .setCheck("Number")
        .appendField("set bar");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['clear_bar'] = {
  init: function() {
    this.appendValueInput("bar_index")
        .setCheck("Number")
        .appendField("clear bar");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['toggle_directions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("toggle directions()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(30);
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_direction_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set_direction_forward()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(30);
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_direction_reverse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set_direction_reverse()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(30);
    this.setHelpUrl('http://www.example.com/');
  }
};
