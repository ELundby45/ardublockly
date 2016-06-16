'use strict';

goog.provide('Blockly.Cubelets.acting');

goog.require('Blockly.Cubelets');

Blockly.Cubelets['set_actuator_value'] = function(block) {
	var value_actuator_value = Blockly.Cubelets.valueToCode(block, 'actuator_value', Blockly.Cubelets.ORDER_ATOMIC);
  return "set_actuator_value("+value_actuator_value+");\n";
};

Blockly.Cubelets.set_flashlight = function(block) {
  var block_value = Blockly.Cubelets.valueToCode(block, 'block_value', Blockly.Cubelets.ORDER_ATOMIC);
  var code = 'set_flashlight('+block_value+');\n';
  return code;
};

Blockly.Cubelets.set_bar = function(block) {
  var bar_index = Blockly.Cubelets.valueToCode(block, 'bar_index', Blockly.Cubelets.ORDER_ATOMIC);
  var code = 'set_bar('+bar_index+');\n';
  return code;
};

Blockly.Cubelets.clear_bar = function(block) {
  var bar_index = Blockly.Cubelets.valueToCode(block, 'bar_index', Blockly.Cubelets.ORDER_ATOMIC);
  var code = 'clear_bar('+bar_index+');\n';
  return code;
};

Blockly.Cubelets['toggle_directions'] = function(block) {
  var code = 'toggle_directions();\n';
  return code;
};

Blockly.Cubelets['set_direction_forward'] = function(block) {
  var code = 'set_drive_direction(FORWARD);\n';
  return code;
};

Blockly.Cubelets['set_direction_reverse'] = function(block) {
  var code = 'set_drive_direction(BACKWARD);\n';
  return code;
};
