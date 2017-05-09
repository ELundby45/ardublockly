'use strict';

goog.provide('Blockly.Cubelets.acting');

goog.require('Blockly.Cubelets');

Blockly.Cubelets['set_actuator_value'] = function(block) {
  var value_actuator_value = Blockly.Cubelets.valueToCode(block, 'actuator_value', Blockly.Cubelets.ORDER_ATOMIC);
  if(value_actuator_value>255||value_actuator_value<0){
    block.setWarningText("The actuator value should be between 0 and 255");
  }
  else{
    block.setWarningText(null);
  }
  return "set_actuator_value("+value_actuator_value+");\n";
};

Blockly.Cubelets.set_flashlight = function(block) {
  var block_value = Blockly.Cubelets.valueToCode(block, 'block_value', Blockly.Cubelets.ORDER_ATOMIC);
  var code = 'set_flashlight('+block_value+');\n';
  return code;
};

Blockly.Cubelets.set_bar = function(block) {
  var bar_index = Blockly.Cubelets.valueToCode(block, 'bar_index', Blockly.Cubelets.ORDER_ATOMIC);
  if(bar_index<0||bar_index>9){
    block.setWarningText("The bar graph takes values between 0 and 9");
  }
  else{
    block.setWarningText(null);
  }
  var code = 'set_bar('+bar_index+');\n';
  return code;
};

Blockly.Cubelets.clear_bar = function(block) {
  var bar_index = Blockly.Cubelets.valueToCode(block, 'bar_index', Blockly.Cubelets.ORDER_ATOMIC); 
  if(bar_index>9||bar_index<0){
    block.setWarningText("The bar graph takes values between 0 and 9");
  }
  else{
    block.setWarningText(null);
  }
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

Blockly.Cubelets['two_way_motor']= function(block){
    var argument0 = Blockly.Cubelets.valueToCode(block, 'source',
      Blockly.Cubelets.ORDER_NONE) || '0';
  /*instead of doing this just say functionName= what is wanted if the below function call is run then it checks for a safe name twice 
   *because at func name it also runs safe name, which means all the calls end up being written as function_2
   */
  //var functionName = Blockly.Cubelets.variableDB_.getDistinctName('bidirectional_rotate', Blockly.Generator.NAME_TYPE);
  var functionName="two_way_motor";
  Blockly.Cubelets.two_way_motor.two_way_motor = functionName;
  var func = [
      'void two_way_motor(uint8_t bv) {',
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
  var funcName = Blockly.Cubelets.addFunction('two_way_motor', func.join('\n'));
  var code = funcName + '('+argument0+');';
  var forwardDeclartion = 'void ' + funcName + '(uint8_t bv);';
  Blockly.Cubelets.addInclude("function_"+funcName, forwardDeclartion);
  return code;
}

//Version of ramp that puts code into void loop 
/*Blockly.Cubelets['ramp_func']=function(block){
  var argument0 = Blockly.Cubelets.valueToCode(block, 'from_ramp',
      Blockly.Cubelets.ORDER_NONE) || '0';
  var argument1 = Blockly.Cubelets.valueToCode(block, 'to_ramp',
      Blockly.Cubelets.ORDER_NONE) || '0';
  var argument2 = Blockly.Cubelets.valueToCode(block, 'time_ramp',
      Blockly.Cubelets.ORDER_NONE) || '0';
  //If the to is larger then the from then increase actuator value 
  if(argument1>argument0){
    var code= 
    'int ramp_delay='+argument2+'/('+argument1+'-'+ argument0+');\n'+
      'for(int i='+argument0+';i<='+argument1+';i++){\n'+
      '  set_actuator_value(i);\n'+
      '  wait(ramp_delay);\n'+
      '}';
  }
  //if to and from are equal just set the actuator value 
  else if(argument0===argument1){
    var code='set_actuator_value('+argument0+');'
  }
  //if from is larger then to then decrease actuator value 
  else{
  var code=      
     'int ramp_delay='+ argument2+'/('+argument0+'-'+argument1+');\n'+
      'for(int i='+argument0+';i>='+argument1+';i--){\n'+
      ' set_actuator_value(i);\n'+
      ' wait(ramp_delay);\n'+
      '}';
  }
  return code;

}*/


/**
 * Changes actuator value consistently over a set time 
 * Cubelets code: complex code, can create external functions.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Cubelets['ramp_func']=function(block){
  var argument0 = Blockly.Cubelets.valueToCode(block, 'from_ramp',
      Blockly.Cubelets.ORDER_NONE) || '0';
  var argument1 = Blockly.Cubelets.valueToCode(block, 'to_ramp',
      Blockly.Cubelets.ORDER_NONE) || '0';
  var argument2 = Blockly.Cubelets.valueToCode(block, 'time_ramp',
      Blockly.Cubelets.ORDER_NONE) || '0';

  var functionName = Blockly.Cubelets.variableDB_.getDistinctName(
      'ramp_func', Blockly.Generator.NAME_TYPE);
  Blockly.Cubelets.ramp_func.ramp_function = functionName;
  var func = [
      'void ramp (int to, int from, int time) {',
      '   int i, delay;',
      '   if(to<from){',
      '       delay=time/(from-to);',
      '       for(i=to;i<=from;i++){',
      '           set_actuator_value(i);',
      '            wait(delay);',
      '        }',
      '   }',
      '   else if(to>from){',
      '       delay=time/(to-from);',
      '       for(i=to;i>=from;i--){',
      '           set_actuator_value(i);',
      '           wait(delay);',
      '       }',
      '     }',
      '   else{',
      '       set_actuator_value(to);',
      '   }',
      '  return;',
      '}'];
  var funcName = Blockly.Cubelets.addFunction('ramp', func.join('\n'));
  var code = funcName + '(' + argument0 + ',' + argument1 + ','+argument2+');';
  var forwardDeclartion = 'void ' + funcName + '(int from, int to, int time);';
  Blockly.Cubelets.addInclude("function_"+funcName, forwardDeclartion);


  return code;
}; 
