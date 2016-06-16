'use strict';

goog.provide('Blockly.Cubelets.messaging');

goog.require('Blockly.Cubelets');


Blockly.Cubelets.set_block_value = function(block) {
 var value_block_value = Blockly.Cubelets.valueToCode(block, 'block_value', Blockly.Cubelets.ORDER_ATOMIC);
 var value_id = Blockly.Cubelets.valueToCode(block, 'ID', Blockly.Cubelets.ORDER_ATOMIC);
 value_block_value = value_block_value || 0;
 value_id = value_id || 0;
 var code = 'set_block_value(' + value_id + ', ' + value_block_value + ');\n';
 return code;
};

Blockly.Cubelets.get_block_value = function(block) {
 var value_id = block.getFieldValue('ID')
 value_id = value_id || 0;
 return ['get_block_value(' + value_id + ')', Blockly.Cubelets.ORDER_ATOMIC]
};
