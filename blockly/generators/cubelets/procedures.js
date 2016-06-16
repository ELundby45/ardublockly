/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Cubelets code for procedure (function) blocks.
 *
 * TODO: For now all variables will stay at "int". Once type is implemented
 *       it needs to be captured on the functions with return.
 */
'use strict';

goog.provide('Blockly.Cubelets.procedures');

goog.require('Blockly.Cubelets');


/**
 * Code generator to create a function with a return value (X).
 * Cubelets code: void functionname { return X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {null} There is no code added to loop.
 */
Blockly.Cubelets['procedures_defreturn'] = function(block) {
  var funcName = Blockly.Cubelets.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Cubelets.statementToCode(block, 'STACK');
  if (Blockly.Cubelets.STATEMENT_PREFIX) {
    branch = Blockly.Cubelets.prefixLines(
        Blockly.Cubelets.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Cubelets.INDENT) + branch;
  }
  if (Blockly.Cubelets.INFINITE_LOOP_TRAP) {
    branch = Blockly.Cubelets.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Cubelets.valueToCode(block, 'RETURN',
      Blockly.Cubelets.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }

  // Get arguments with type
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] =
        Blockly.Cubelets.getCubeletsType_(block.getArgType(block.arguments_[x])) +
        ' ' +
        Blockly.Cubelets.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
  }

  // Get return type
  var returnType = Blockly.Types.NULL;
  if (block.getReturnType) {
    returnType = block.getReturnType();
  }
  returnType = Blockly.Cubelets.getCubeletsType_(returnType);

  // Construct code
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Cubelets.scrub_(block, code);
  Blockly.Cubelets.userFunctions_[funcName] = code;
  return null;
};

/**
 * Code generator to create a function without a return value.
 * It uses the same code as with return value, as it will maintain the void
 * type.
 * Cubelets code: void functionname { }
 */
Blockly.Cubelets['procedures_defnoreturn'] =
    Blockly.Cubelets['procedures_defreturn'];

/**
 * Code generator to create a function call with a return value.
 * Cubelets code: loop { functionname() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Cubelets['procedures_callreturn'] = function(block) {
  var funcName = Blockly.Cubelets.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Cubelets.valueToCode(block, 'ARG' + x,
        Blockly.Cubelets.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Cubelets.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to create a function call without a return value.
 * Cubelets code: loop { functionname() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Cubelets['procedures_callnoreturn'] = function(block) {
  var funcName = Blockly.Cubelets.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Cubelets.valueToCode(block, 'ARG' + x,
        Blockly.Cubelets.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

/**
 * Code generator to create a conditional (X) return value (Y) for a function.
 * Cubelets code: if (X) { return Y; }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Cubelets['procedures_ifreturn'] = function(block) {
  var condition = Blockly.Cubelets.valueToCode(block, 'CONDITION',
      Blockly.Cubelets.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Cubelets.valueToCode(block, 'VALUE',
        Blockly.Cubelets.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};

/**
 * Code generator to add code into the setup() and loop() functions.
 * Its use is not mandatory, but necessary to add manual code to setup().
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Cubelets['arduino_functions'] = function(block) {
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    var targetBlock = block.getInputTargetBlock(name);
    var code = Blockly.Cubelets.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    return code;
  }

  var setupBranch = Blockly.Cubelets.statementToCode(block, 'SETUP_FUNC');
  //var setupCode = Blockly.Cubelets.scrub_(block, setupBranch); No comment block
  if (setupBranch) {
    Blockly.Cubelets.addSetup('userSetupCode', setupBranch, true);
  }

  var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
  //var loopcode = Blockly.Cubelets.scrub_(block, loopBranch); No comment block
  return loopBranch;
};
