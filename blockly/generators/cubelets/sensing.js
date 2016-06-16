'use strict';

goog.provide('Blockly.Cubelets.sensing');

goog.require('Blockly.Cubelets');

Blockly.Cubelets['get_sensor_value'] = function(block) {
  return ["get_sensor_value()", Blockly.Cubelets.ORDER_ATOMIC]
};
