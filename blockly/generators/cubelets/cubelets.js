goog.provide('Blockly.Cubelets.cubelets');

goog.require('Blockly.Cubelets');

Blockly.Cubelets['cubelets_setup'] = function(block) {
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
  return loopBranch;


  var code = "void loop(){\n"+args+"\n}"
  Blockly.Cubelets.definitions_['loop'] = code;
  return null;
};
