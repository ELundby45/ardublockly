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
  return loopBranch;
};

/**
 ** Check to see if blockly block can be uploaded to cubelet
 ** @param {cubeletType: cubelet type id} If it is not a valid type comment it out and display error 
 ** Also uses the added block feature block.cubelet which is a list of valid cubelet block types 
 ** If no valid cubelet types defined (NULL) assume it is valid for all 
 **   Void function.
 */
Blockly.Cubelets['check_cubelets']=function(cubeletType){
  //get all blocks in the workspace 
   var blocks=Cublockly.workspace.getAllBlocks();
   if(!cubeletType) return;
   /**start at 2 because the first two blocks will always be setup and loop
    **Use boolean variable to track if it is a valid cuebelet type 
    **go through each block and check if block.cubelet is NULL, assume all cubelet types will work
    ** and set the boolean to true other wise loop through cubelet array and compare with cubelet type
    **/  
   for(var i=2;i<blocks.length;i++){
    var check=false;
    if(blocks[i].cubelet){
      for(var j=0;j<blocks[i].cubelet.length;j++){
          if(blocks[i].cubelet[j]==cubeletType){
            check=true;
            break;
          }
      }
    }
    else{
     check=true;
   }
   //For each block if check is false display warning and disable 
    if(!check){
        blocks[i].setWarningText("This block can't be used with the selected Cubelet type");
        blocks[i].setDisabled(true);
      }
      //if it is true get rid of the warning (if there is one) and enable
      //Currently this also makes any previously disabled valid blocks get enabled 
      else{
        blocks[i].setWarningText(null);
        blocks[i].setDisabled(false);
      }
   }

   /**The following code is used disable the invalid blocks based on the cubelet type
    ** It is a switch statement that is based off of the cubelet type. 
    ** It sets a string variable with is the XML code for the toolbox and then 
    ** calls Cublockly.workspace.updateToolbox(toolbox); which replaces the code for 
    ** the toolbox. Not sure the best way to store the toolbox strings, enter string here 
    ** for all of them, store string in block object, etc 
    ** My current doubts with this are that it is anytime the toolbox code changes
    ** (block gets added) the general code as well as all of these need to be changed.
    */ 



   var toolbox;
    switch(cubeletType){
    case 43:
    toolbox=
          '<xml>' +
      '  <sep></sep>' +
      '  <category id="catSensing" name="Sensing">' +
      '    <block type="get_sensor_value"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catActing" name="Acting">' +
      '    <block type="set_actuator_value" disabled="true"></block>' +
      //'    <block type="set_flashlight"></block>' +
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
      '    <block type="toggle_directions" disabled="true"></block>' +
      '    <block type="set_direction_forward" disabled="true"></block>' +
      '    <block type="set_direction_reverse" disabled="true"></block>' +
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
      '    <block type="get_block_value">' +
      '       <value name="ID">' +
      '          <block type="math_number">' +
      '              <field name="NUM"></field>' +
      '          </block>' +
      '       </value>' +
      '    </block>' +
      '    <block type="set_block_value">' +
      '       <value name="block_value">' +
      '          <block type="math_number">' +
      '              <field name="NUM">255</field>' +
      '          </block>' +
      '       </value>' +
      '       <value name="ID">' +
      '          <block type="math_number">' +
      '              <field name="NUM">0</field>' +
      '          </block>' +
      '       </value>' +
      '    </block>' +
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
      //'    <block type="clear_interval"></block>' +
      '    <block type="set_timeout"></block>' +
      //'    <block type="clear_timeout"></block>' +
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
      '  <category id="catMathNum" name="Math/Numbers">' +
      '    <block type="math_number"></block>' +
      '    <block type="math_arithmetic"></block>' +
      //'    <block type="math_single"></block>' +
      //'    <block type="math_trig"></block>' +
      //'    <block type="math_constant"></block>' +
      //'    <block type="math_number_property"></block>' +
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
      /*'    <block type="mapFunc">' +
      '      <value name="value">' +
      '      <block type="weighted_average"></block>' +
      '      </value>' +
      '      <value name="startMinVal">' +
      '        <block type="math_number">' +
      '          <field name="NUM">0</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="startMaxVal">' +
      '        <block type="math_number">' +
      '          <field name="NUM">255</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +*/
      '  </category>' +
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
      '</xml>';
    break;

//If a cubelet type was passed as the argument but is not a action cubelet disable all action cubelets 
  default:
    toolbox=
              '<xml>' +
      '  <sep></sep>' +
      '  <category id="catSensing" name="Sensing">' +
      '    <block type="get_sensor_value"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catActing" name="Acting">' +
      '    <block type="set_actuator_value" disabled="true"></block>' +
      //'    <block type="set_flashlight"></block>' +
      '    <block type="set_bar" disabled="true">' +
      '        <value name="bar_index">' +
      '          <block type="math_number">' +
      '              <field name="NUM">0</field>' +
      '          </block>' +
      '        </value>' +
      '    </block>' +
      '    <block type="clear_bar" disabled="true">' +
      '        <value name="bar_index">' +
      '          <block type="math_number">' +
      '              <field name="NUM">0</field>' +
      '          </block>' +
      '        </value>' +
      '    </block>' +
      '    <block type="toggle_directions" disabled="true"></block>' +
      '    <block type="set_direction_forward" disabled="true"></block>' +
      '    <block type="set_direction_reverse" disabled="true"></block>' +
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
      '    <block type="get_block_value">' +
      '       <value name="ID">' +
      '          <block type="math_number">' +
      '              <field name="NUM"></field>' +
      '          </block>' +
      '       </value>' +
      '    </block>' +
      '    <block type="set_block_value">' +
      '       <value name="block_value">' +
      '          <block type="math_number">' +
      '              <field name="NUM">255</field>' +
      '          </block>' +
      '       </value>' +
      '       <value name="ID">' +
      '          <block type="math_number">' +
      '              <field name="NUM">0</field>' +
      '          </block>' +
      '       </value>' +
      '    </block>' +
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
      //'    <block type="clear_interval"></block>' +
      '    <block type="set_timeout"></block>' +
      //'    <block type="clear_timeout"></block>' +
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
      '  <category id="catMathNum" name="Math/Numbers">' +
      '    <block type="math_number"></block>' +
      '    <block type="math_arithmetic"></block>' +
      //'    <block type="math_single"></block>' +
      //'    <block type="math_trig"></block>' +
      //'    <block type="math_constant"></block>' +
      //'    <block type="math_number_property"></block>' +
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
      /*'    <block type="mapFunc">' +
      '      <value name="value">' +
      '      <block type="weighted_average"></block>' +
      '      </value>' +
      '      <value name="startMinVal">' +
      '        <block type="math_number">' +
      '          <field name="NUM">0</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="startMaxVal">' +
      '        <block type="math_number">' +
      '          <field name="NUM">255</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +*/
      '  </category>' +
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
      '</xml>';
}

    Cublockly.workspace.updateToolbox(toolbox);
   return;
};
