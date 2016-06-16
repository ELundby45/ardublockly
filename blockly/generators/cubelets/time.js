/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Cubelets code generator for the Time blocks.
 *     Cubelets built-in function docs: http://Cubelets.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Cubelets.time');

goog.require('Blockly.Cubelets');


/**
 * Code generator for the delay Cubelets block.
 * Cubelets code: loop { wait(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Cubelets['time_delay'] = function(block) {
  var delayTime = Blockly.Cubelets.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Cubelets.ORDER_ATOMIC) || '0';
  var code = 'wait(' + delayTime + ');\n';
  return code;
};

Blockly.Cubelets['set_interval'] = function(block) {
  var text_time_interval = block.getFieldValue('time_interval');
  var text_callback_name = block.getFieldValue('callback_name');

  var args = Blockly.Cubelets.statementToCode(block, 'callback_do');

	var code = "void "+text_callback_name+"(void){\n"+args+"\n}"
  Blockly.Cubelets.definitions_[text_callback_name] = code;

  return "set_interval("+text_time_interval+", "+text_callback_name+");\n";
};

Blockly.Cubelets['set_timeout'] = function(block) {
  var text_time_interval = block.getFieldValue('time_interval');
  var text_callback_name = block.getFieldValue('callback_name');

  var args = Blockly.Cubelets.statementToCode(block, 'callback_do');
	
	var code = "void "+text_callback_name+"(void){\n"+args+"\n}"
  Blockly.Cubelets.definitions_[text_callback_name] = code;

  return "set_timeout("+text_time_interval+", "+text_callback_name+");\n";
};
