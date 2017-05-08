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
    var cubelets=[45,48,46,47];
    this.setCubelet(cubelets);
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
    var cubelets=[48];
    this.setCubelet(cubelets);

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
    var cubelets=[43];
    this.setCubelet(cubelets);
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
    var cubelets=[43];
    this.setCubelet(cubelets);
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
    var cubelets=[45,46];
    this.setCubelet(cubelets);
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
    var cubelets=[45,46];
    this.setCubelet(cubelets);
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
    var cubelets=[45,46];
    this.setCubelet(cubelets);
  }
};

Blockly.Blocks['bidirectional_rotate']={
  init: function() {
    this.jsonInit({
    "type": "block_type",
   "message0": "two-way motor %1",
    "args0": [
    {
      "type": "input_value",
      "name": "source"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Bases the direction and actuator value off of the input.",
  "colour": Blockly.Blocks.acting.HUE,
  })
    //works for drive and rotate cubelet
        var cubelets=[45,46];
    this.setCubelet(cubelets);
}};

  /**
   * Block for increasing/decreasing actuator value over a period of time 
   * @this Blockly.Block
   */
Blockly.Blocks['ramp_func'] = {

  init: function() {
    this.jsonInit(
{
  "type": "block_type",
  "message0": "Ramp %1 to %2 in  %3 milliseconds",
  "args0": [
    {
      "type": "input_value",
      "name": "from_ramp",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "to_ramp",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "time_ramp",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": Blockly.Blocks.acting.HUE,
  "tooltip": "Increase or decrease the actuator value over time a time period.",
  "helpUrl": "",

      });
    //Ramp works for  flashlight, drive, rotate, and speaker 
    var cubelets=[45,48,46,47];
    this.setCubelet(cubelets);
    }
};

