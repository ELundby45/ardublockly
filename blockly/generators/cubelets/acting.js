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




