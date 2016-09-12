/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Time functions.
 *     The arduino built in functions syntax can be found in
 *     http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.time');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.time.HUE = 155;

Blockly.Blocks['time_delay'] = {
  /**
   * Delay block definition
   * @this Blockly.Block
   */
  init: function() {
    //this.setHelpUrl('http://arduino.cc/en/Reference/Delay');
    //this.setColour(Blockly.Blocks.time.HUE);
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MILI')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};

Blockly.Blocks['set_interval'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField("every")
        .appendField(new Blockly.FieldTextInput("100"), "time_interval")
        .appendField("milliseconds");
    this.appendStatementInput("callback_do")
        .setCheck("timer_callback")
        .appendField("do")
        .appendField(new Blockly.FieldTextInput("something"), "callback_name");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_timeout'] = {
  init: function() {
  	this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField("after")
        .appendField(new Blockly.FieldTextInput("100"), "time_interval")
        .appendField("milliseconds");
    this.appendStatementInput("callback_do")
        .setCheck("timer_callback")
        .appendField("do")
        .appendField(new Blockly.FieldTextInput("something"), "callback_name");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};
