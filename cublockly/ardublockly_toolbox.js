/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Cublockly = Cublockly || {};

Cublockly.TOOLBOX_XML =
'<xml>' +
'  <sep></sep>' +
'  <category id="catSensing" name="Sensing">' +
'    <block type="get_sensor_value"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catActing" name="Acting">' +
'    <block type="set_actuator_value"></block>' +
'    <block type="set_flashlight"></block>' +
'    <block type="set_bar">' +
'        <value name="bar_index">' +
'          <block type="math_number">' +
'              <field name="NUM">0</field>' +
'          </block>' +
'        </value>' +
'    </block>' +
'    <block type="clear_bar">' +
'        <value name="bar_index">' +
'          <block type="math_number">' +
'              <field name="NUM">0</field>' +
'          </block>' +
'        </value>' +
'    </block>' +
'    <block type="toggle_directions"></block>' +
'    <block type="set_direction_forward"></block>' +
'    <block type="set_direction_reverse"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catThinking" name="Thinking">' +
'    <block type="weighted_average"></block>' +
'    <block type="minimum"></block>' +
'    <block type="maximum"></block>' +
'    <block type="inverse"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category name="Messaging">' +
'    <block type="get_block_value"></block>' +
'    <block type="set_block_value"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catTiming" name="Timing">' +
'    <block type="time_delay">' +
'      <value name="DELAY_TIME_MILI">' +
'        <block type="math_number">' +
'          <field name="NUM">1000</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="set_interval"></block>' +
'    <block type="set_timeout"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catLogic" name="Logic">' +
'    <block type="controls_if"></block>' +
'    <block type="logic_compare"></block>' +
'    <block type="logic_operation"></block>' +
'    <block type="logic_negate"></block>' +
'    <block type="logic_boolean"></block>' +
'    <block type="logic_null"></block>' +
'    <block type="logic_ternary"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catLoops" name="Loops">' +
'    <block type="controls_repeat_ext">' +
'      <value name="TIMES">' +
'        <block type="math_number">' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="controls_whileUntil"></block>' +
'    <block type="controls_for">' +
'      <value name="FROM">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'      <value name="TO">' +
'        <block type="math_number">' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'      <value name="BY">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="controls_flow_statements"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catMath" name="Math/Numbers">' +
'    <block type="math_number"></block>' +
'    <block type="math_arithmetic"></block>' +
'    <block type="math_single"></block>' +
'    <block type="math_trig"></block>' +
'    <block type="math_constant"></block>' +
'    <block type="math_number_property"></block>' +
'    <block type="math_change">' +
'      <value name="DELTA">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="math_round"></block>' +
'    <block type="math_modulo"></block>' +
'    <block type="math_constrain">' +
'      <value name="LOW">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'      <value name="HIGH">' +
'        <block type="math_number">' +
'          <field name="NUM">100</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="math_random_int">' +
'      <value name="FROM">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'      <value name="TO">' +
'        <block type="math_number">' +
'          <field name="NUM">100</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="math_random_float"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <sep></sep>' +
'  <category id="catVariables" name="Variables">' +
'    <block type="variables_get"></block>' +
'    <block type="variables_set"></block>' +
'    <block type="variables_set">' +
'      <value name="VALUE">' +
'        <block type="variables_set_type"></block>' +
'      </value>' +
'    </block>' +
'    <block type="variables_set_type"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
'  <sep></sep>' +
'  <sep></sep>' +
'  <sep></sep>' +
'</xml>';
