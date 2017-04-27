goog.provide('Blockly.Cubelets.cubelets');

goog.require('Blockly.Cubelets');

Blockly.Cubelets['cubelets_setup'] = function(block) {
  Blockly.Cubelets.addInclude("cubelet.h", '#include "cubelet.h"')
  Blockly.Cubelets.addInclude("stdbool.h", '#include <stdbool.h>')
  var setupBranch = Blockly.Cubelets.statementToCode(block, 'setup_do');
  //var setupCode = Blockly.Cubelets.scrub_(block, setupBranch); No comment block
  if (setupBranch) {
    Blockly.Cubelets.addSetup('userSetupCode', setupBranch, true);
  }
  return null;
};

Blockly.Cubelets['cubelets_loop'] = function(block) {
  var args = Blockly.Cubelets.statementToCode(block, 'loop_do');
  var loopBranch = Blockly.Cubelets.statementToCode(block, 'loop_do');
 var block= Cublockly.workspace.getAllBlocks();
 console.log(block);
  return loopBranch;
};

