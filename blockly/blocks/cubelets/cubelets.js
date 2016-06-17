goog.provide('Blockly.Blocks.cubelets');

goog.require('Blockly.Blocks');

Blockly.Blocks['cubelets_setup'] = {
	init : function() {
		this.appendDummyInput().appendField("setup");
		this.appendStatementInput("setup_do").appendField("do");
		this.setTooltip('Put code in in here that you want to execute once.');
		this.setHelpUrl('http://www.example.com/');
		this.setDeletable(false);
		this.setColour(275);
	}
};

Blockly.Blocks['cubelets_loop'] = {
	init : function() {
		this.appendDummyInput().appendField("loop");
		this.appendStatementInput("loop_do").appendField("do");
		this.setTooltip('Put your main routine in here. It will run over and over.');
		this.setHelpUrl('http://www.example.com/');
		this.setDeletable(false);
		this.setColour(275);
	},
	
	getVars : function(){
		//In here we will declare all global variables specific to Cubelets.
		return ['block_value'];
	},

	getVarType: function(varName) {
		return Blockly.Types.NUMBER;
  }
};
