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






































































































Blockly.Cubelets['bidirectional_rotate']= function(block){
    var argument0 = Blockly.Cubelets.valueToCode(block, 'source',
      Blockly.Cubelets.ORDER_NONE) || '0';
  /*instead of doing this just say functionName= what is wanted if the below function call is run then it checks for a safe name twice 
   *because at func name it also runs safe name, which means all the calls end up being written as function_2
   */
  //var functionName = Blockly.Cubelets.variableDB_.getDistinctName('bidirectional_rotate', Blockly.Generator.NAME_TYPE);
  var functionName="bidirectional_rotate";
  Blockly.Cubelets.bidirectional_rotate.bi_directional_rotate = functionName;
  var func = [
      'void bidirectional_rotate(uint8_t bv) {',
      '   uint8_t direction = FORWARD;',
      //Below line is specific to the snow cat, otherwise use just forward (the line above)
     // '   uint8_t direction = FORWARD-control_side;',
      '   static uint8_t motor_speed;',
      '       if (bv < 123) {',
      '         set_drive_direction(direction);',
      '         motor_speed = 2 * (127 - bv);',
      '       } else if (bv > 131) {',
      '             set_drive_direction(!direction);',
      '             motor_speed = 2 * (bv - 128);',
      '       } else {',
      '           motor_speed = 0;',
      '       }',
      '       set_actuator_value(motor_speed);',
      '}'];
  var funcName = Blockly.Cubelets.addFunction('bidirectional_rotate', func.join('\n'));
  var code = funcName + '('+argument0+');';
  var forwardDeclartion = 'void ' + funcName + '(uint8_t bv);';
  Blockly.Cubelets.addInclude("function_"+funcName, forwardDeclartion);
  return code;
}