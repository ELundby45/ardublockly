'use strict';

goog.provide('Blockly.Cubelets.thinking');

goog.require('Blockly.Cubelets');


Blockly.Cubelets.weighted_average = function(block) {
 return ["weighted_average()", Blockly.Cubelets.ORDER_ATOMIC]
};

Blockly.Cubelets.minimum = function(block) {
 return ["minimum()", Blockly.Cubelets.ORDER_ATOMIC]
};

Blockly.Cubelets.maximum = function(block) {
 return ["maximum()", Blockly.Cubelets.ORDER_ATOMIC]
};

Blockly.Cubelets.inverse = function(block) {
 var value_inverse_of = Blockly.Cubelets.valueToCode(block, 'inverse_of', Blockly.Cubelets.ORDER_ATOMIC);
 return ["inverse("+value_inverse_of+")", Blockly.Cubelets.ORDER_ATOMIC]
};
