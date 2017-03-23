/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Cublockly JavaScript for the Blockly resources and bindings.
 */
'use strict';

/** Create a namespace for the application. */
var Cublockly = Cublockly || {};

/**
 * Blockly main workspace.
 * @type Blockly.WorkspaceSvg
 */
Cublockly.workspace = null;

/**
 * Blockly workspace toolbox XML.
 * @type Element
 */
Cublockly.xmlTree = null;

/**
 * Injects Blockly into a given HTML element. Toolbox XMl has to be a string.
 * @param {!Element} blocklyEl Element to inject Blockly into.
 * @param {!string} toolboxXml String containing the toolbox XML content.
 * @param {!string} blocklyPath String containing the Blockly directory path.
 */
Cublockly.injectBlockly = function(blocklyEl, toolboxXml, blocklyPath) {
  // Remove any trailing slashes in the blockly path
  if (blocklyPath.substr(-1) === '/') {
    blocklyPath = blocklyPath.slice(0, -1);
  }
  Cublockly.xmlTree = Blockly.Xml.textToDom(toolboxXml);
  // The Toolbox menu language is edited directly from the XML nodes.
  Cublockly.updateToolboxLanguage();
  Cublockly.workspace = Blockly.inject(blocklyEl, {
      collapse: true,
      comments: true,
      css: true,
      disable: true,
      grid: false,
      maxBlocks: Infinity,
      media: blocklyPath + '/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      toolbox: Cublockly.xmlTree,
      trashcan: true,
    	//horizontalLayout : true, 
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.2,
        scaleSpeed: 1.2
      }
  });
  // On language change the blocks have been stored in session storage
  Cublockly.loadSessionStorageBlocks();
};

/** Binds the event listeners relevant to Blockly. */
Cublockly.bindBlocklyEventListeners = function() {
  Cublockly.workspace.addChangeListener(Cublockly.renderContent);

  // Ensure the Blockly workspace resizes accordingly
  window.addEventListener('resize',
      function() { Blockly.svgResize(Cublockly.workspace); }, false);
};

/** @return {!string} Generated Arduino code from the Blockly workspace. */
Cublockly.generateArduino = function() {
  return Blockly.Cubelets.workspaceToCode(Cublockly.workspace);
};

/** @return {!string} Generated XML code from the Blockly workspace. */
Cublockly.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Cublockly.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  return xmlText;
};

/**
 * Loads an XML file from the server and replaces the current blocks into the
 * Blockly workspace.
 * @param {!string} xmlFile XML file path in a reachable server (no local path).
 * @param {!function} cbSuccess Function to be called once the file is loaded.
 * @param {!function} cbError Function to be called if there is a connection
 *     error to the XML server.
 */
Cublockly.loadXmlBlockFile = function(xmlFile, cbSuccess, cbError) {
  var request = Cublockly.ajaxRequest();
  var requestCb = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var success = Cublockly.replaceBlocksfromXml(request.responseText);
        cbSuccess(success);
      } else {
        cbError();
      }
    }
  };
  try {
    request.open('GET', xmlFile, true);
    request.onreadystatechange = requestCb;
    request.send(null);
  } catch (e) {
    cbError();
  }
};

/**
 * Parses the XML from its argument input to generate and replace the blocks
 * in the Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Cublockly.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    return false;
  }
  Cublockly.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = Cublockly.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

/**
 * Parses the XML from its argument input to generate and add blocks to the
 * Blockly workspace.
 * @param {!string} blocksXmlDom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Cublockly.loadBlocksfromXmlDom = function(blocksXmlDom) {
  try {
    Blockly.Xml.domToWorkspace(blocksXmlDom, Cublockly.workspace);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Save blocks into session storage. Note that MSIE 11 does not support
 * sessionStorage on file:// URLs.
 */
Cublockly.saveSessionStorageBlocks = function() {
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Cublockly.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }
};

/** Load blocks saved on session storage and deletes them from storage. */
Cublockly.loadSessionStorageBlocks = function() {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if (loadOnce) {
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Cublockly.workspace);
  }

  //If there are not any blocks, load the default
  if(Blockly.mainWorkspace.getAllBlocks().length < 2)
  {
    //TODO: This is ugly
    var defaultXml = [	'<xml xmlns="http://www.w3.org/1999/xhtml">',
              '<block type="cubelets_setup" id="2" x="-287" y="-37"></block>',
              '<block type="cubelets_loop" id="5" x="13" y="-37"></block>',
              '</xml>']

      var xml = Blockly.Xml.textToDom(defaultXml.join(''));

    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }

};

/** Discard all blocks from the workspace. */
Cublockly.discardAllBlocks = function() {
  var blockCount = Cublockly.workspace.getAllBlocks().length;
  if (blockCount <= 1) {
    Cublockly.workspace.clear();
    Cublockly.renderContent();
  } else if (blockCount > 2) {
    Cublockly.alertMessage(
        'Delete blocks?',
        ((blockCount-2) > 1 ? 'There are ' + (blockCount-2) + ' blocks on the workspace. Are you sure ' : 'There is a block on the workspace. Are you sure') +
        'you want to delete '+((blockCount-2) > 1 ? 'them?' : 'it?'),
        true,
        function() {
          Cublockly.workspace.clear();
          Cublockly.renderContent();
          var defaultXml = [	'<xml xmlns="http://www.w3.org/1999/xhtml">',
            '<block type="cubelets_setup" id="2" x="-287" y="-37"></block>',
            '<block type="cubelets_loop" id="5" x="13" y="-37"></block>',
            '</xml>']

          var xml = Blockly.Xml.textToDom(defaultXml.join(''));
          Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        });
  }
};

/** @return {!boolean} Indicates if the Blockly workspace has blocks. */
Cublockly.isWorkspaceEmpty = function() {
  return Cublockly.workspace.getAllBlocks().length ? false : true;
};

/**
 * Changes the Arduino board profile if different from the currently set one.
 * @param {string} newBoard Name of the new profile to set.
 */
Cublockly.changeBlocklyArduinoBoard = function(newBoard) {
  if (Blockly.Cubelets.Boards.selected !== Blockly.Cubelets.Boards[newBoard]) {
    Blockly.Cubelets.Boards.changeBoard(Cublockly.workspace, newBoard);
  }
};

/** Update the toolbox categories language. */
Cublockly.updateToolboxLanguage = function() {
  var categories = ['catLogic', 'catLoops', 'catMath', 'catText',
                    'catVariables', 'catFunctions', 'catInputOutput',
                    'catTime', 'catMusic', 'catMotors', 'catComms'];
  var categoryNodes = Cublockly.xmlTree.getElementsByTagName('category');
  for (var i = 0, cat; cat = categoryNodes[i]; i++) {
    var catId = cat.getAttribute('id');
    if (MSG[catId]) {
      cat.setAttribute('name', MSG[catId]);
    }
  }
};

/**
 * Adds a category to the current toolbox.
 * @param {!string} categoryTitle Toolbox category title.
 * @param {!Element} categoryDom Toolbox category to add add the end of tree.
 */
Cublockly.addToolboxCategory = function(categoryTitle, categoryDom) {
  categoryDom.id = 'cat' + categoryTitle.replace(/\s+/g, '');
  categoryDom.setAttribute('name', categoryTitle);
  Cublockly.xmlTree.appendChild(document.createElement('sep'));
  Cublockly.xmlTree.appendChild(categoryDom);
  Cublockly.workspace.updateToolbox(Cublockly.xmlTree);
};

/**
 * Removes a category to the current toolbox.
 * @param {!String} categoryTitle Toolbox category name to remove from tree.
 */
Cublockly.removeToolboxCategory = function(categoryTitle) {
  var categoryId = 'cat' + categoryTitle.replace(/\s+/g, '');
  var categoryNodes = Cublockly.xmlTree.getElementsByTagName('category');
  for (var i = 0; i < categoryNodes.length; i++) {
    if (categoryNodes[i].getAttribute('id') === categoryId) {
      var previousNode = categoryNodes[i].previousElementSibling;
      Cublockly.xmlTree.removeChild(categoryNodes[i]);
      if (previousNode && previousNode.nodeName == 'sep') {
        Cublockly.xmlTree.removeChild(previousNode);
      }
    }
  }
  Cublockly.workspace.updateToolbox(Cublockly.xmlTree);
};

/** Closes the toolbox block container sub-menu. */
Cublockly.blocklyCloseToolbox = function() {
  Cublockly.workspace.toolbox_.flyout_.hide();
};

/** @return {!integer} The width of the blockly workspace toolbox. */
Cublockly.blocklyToolboxWidth = function() {
  return Cublockly.workspace.toolbox_.width;
};

/** @return {!boolean} Indicates if a block is currently being dragged. */
Cublockly.blocklyIsDragging = function() {
  return (Blockly.dragMode_ != 0) ? true : false;
};

/** Wraps the blockly 'cut' functionality. */
Cublockly.blocklyCut = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
    Blockly.selected.dispose(true, true);
  }
};

/** Wraps the blockly 'copy' functionality. */
Cublockly.blocklyCopy = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
  }
};

/** Wraps the blockly 'paste' functionality. */
Cublockly.blocklyPaste = function() {
  if (Blockly.clipboardXml_) {
    Blockly.hideChaff();
    Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
  }
};

/** Wraps the blockly 'delete' functionality. */
Cublockly.blocklyDelete = function() {
  if (Blockly.selected && Blockly.selected.isDeletable()) {
    Blockly.hideChaff();
    Blockly.selected.dispose(true, true);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
Cublockly.ajaxRequest = function() {
  var request;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  } catch (e) {
    try {
      // IE6 and earlier
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw 'Your browser does not support AJAX';
        request = null;
      }
    }
  }
  return request;
};
