/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for list blocks.
 *
 * TODO: A lot of this can be converted to arrays code by creating functions to
 *       replicate this kind of behavior.
 */
'use strict';

goog.provide('Blockly.Cubelets.lists');

goog.require('Blockly.Cubelets');


Blockly.Cubelets['lists_create_empty'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_create_with'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_repeat'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_length'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_isEmpty'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_indexOf'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_getIndex'] = Blockly.Cubelets.noGeneratorCodeInline;

Blockly.Cubelets['lists_setIndex'] = Blockly.Cubelets.noGeneratorCodeLine;
