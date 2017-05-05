goog.provide('Blockly.Blocks.acting');

goog.require('Blockly.Blocks');

Blockly.Blocks.acting.HUE = 53;

Blockly.Blocks['set_actuator_value'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.acting.HUE);
    this.appendValueInput("actuator_value")
        .setCheck("Number")
        .appendField("set actuator value to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('For use with Action Cubelets only. Sets the actuator value to a number 0-255.');
    //this.setHelpUrl('http://www.example.com/');
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
    this.setColour(Blockly.Blocks.acting.HUE);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_bar'] = {
  init: function() {
    this.appendValueInput("bar_index")
        .setCheck("Number")
        .appendField("set bar graph led");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.acting.HUE);
    this.setTooltip('Turns an individual LED on on a Bar Graph Cubelet. Pass in a number 0-9');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['clear_bar'] = {
  init: function() {
    this.appendValueInput("bar_index")
        .setCheck("Number")
        .appendField("clear bar graph led");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.acting.HUE);
    this.setTooltip('Turns an individual LED off on a Bar Graph Cubelet. Pass in a number 0-9');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['toggle_directions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("toggle motor direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Can be used only on Rotate or Drive Cubelets.');
    this.setColour(Blockly.Blocks.acting.HUE);
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_direction_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set motor direction forward");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Can be used only on Rotate or Drive Cubelets.');
    this.setColour(Blockly.Blocks.acting.HUE);
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_direction_reverse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set motor direction reverse");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Can be used only on Rotate or Drive Cubelets.');
    this.setColour(Blockly.Blocks.acting.HUE);
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bidirectional_rotate']={
  init: function() {
    this.jsonInit({
    "type": "block_type",
   "message0": "bidirectional rotate %1",
    "args0": [
    {
      "type": "input_value",
      "name": "source"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": Blockly.Blocks.acting.HUE,
  })
}};