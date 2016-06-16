/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Cubelets code for variables blocks.
 */
'use strict';

goog.provide('Blockly.Cubelets.variables');

goog.require('Blockly.Cubelets');


/**
 * Code generator for variable (X) getter.
 * Cubelets code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Cubelets['variables_get'] = function(block) {
  var code = Blockly.Cubelets.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Cubelets.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * Cubelets code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Cubelets['variables_set'] = function(block) {
  var argument0 = Blockly.Cubelets.valueToCode(block, 'VALUE',
      Blockly.Cubelets.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Cubelets.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * Code generator for variable (X) casting (Y).
 * Cubelets code: loop { (Y)X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Cubelets['variables_set_type'] = function(block) {
  var argument0 = Blockly.Cubelets.valueToCode(block, 'VARIABLE_SETTYPE_INPUT',
      Blockly.Cubelets.ORDER_ASSIGNMENT) || '0';
  var varType = Blockly.Cubelets.getCubeletsType_(
      Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.Cubelets.ORDER_ATOMIC];
};
