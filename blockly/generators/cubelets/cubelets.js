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
  var i;
   var blocks=Cublockly.workspace.getAllBlocks();
   //if no block type is specified enable everything  
   if(!cubeletType){
      for (i=0;i<blocks.length;i++){
        blocks[i].setDisabled(false);
        blocks[i].setWarningText(null);
      }
      $(Cublockly.xmlTree).find("[data-blockTypes]").each(function(){
      $(this).attr('disabled', 'false'); 
    });
    return;
  }
   /**start at 2 because the first two blocks will always be setup and loop
    **Use boolean variable to track if it is a valid cuebelet type 
    **go through each block and check if block.cubelet is NULL, assume all cubelet types will work
    ** and set the boolean to true other wise loop through cubelet array and compare with cubelet type
    **/  
   for(i=2;i<blocks.length;i++){
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

   /**The following code is used disable the invalid blocks in the toolbox based on the cubelet type
    ** It gets the element data-blocksTypes from the xmlTree for the toolbox. For each of these 
    ** it checks if it is a valid type and updates the boolean if it is. It then disables/enables. 
    ** Currently only action cubelets have the attribute
    */ 

//Convert to jquery and find the attribute data-blockTypes for each 
$(Cublockly.xmlTree).find("[data-blockTypes]").each(function(){
    
    var restrictedTypes = JSON.parse($(this).attr('data-blockTypes'));
    console.log(restrictedTypes);
    check=false; 
    for(var i=0;i<restrictedTypes.length;i++){
      if(restrictedTypes[i]==cubeletType) check=true;
    }
    if(!check) $(this).attr('disabled', 'true');
    else $(this).attr('disabled', 'false'); 
});


//Update the toolbox
Cublockly.workspace.updateToolbox(Cublockly.xmlTree);
   return;
};
