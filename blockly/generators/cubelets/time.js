/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Cubelets code generator for the Time blocks.
 *     Cubelets built-in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Cubelets.time');

goog.require('Blockly.Cubelets');


/**
 * Code generator for the delay Cubelets block.
 * Cubelets code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Cubelets['time_delay'] = function(block) {
  var delayTime = Blockly.Cubelets.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Cubelets.ORDER_ATOMIC) || '0';
  var code = 'delay(' + delayTime + ');\n';
  return code;
};

/**
 * Code generator for the delayMicroseconds block.
 * Cubelets code: loop { delayMicroseconds(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Cubelets['time_delaymicros'] = function(block) {
  var delayTimeMs = Blockly.Cubelets.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.Cubelets.ORDER_ATOMIC) || '0';
  var code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

/**
 * Code generator for the elapsed time in milliseconds block.
 * Cubelets code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Cubelets['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Cubelets.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * Cubelets code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Cubelets['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Cubelets.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * Cubelets code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Cubelets['infinite_loop'] = function(block) {
  return 'while(true);\n';
};
