/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for Arduino app with material design.
 */
'use strict';

/** Create a namespace for the application. */
var Cublockly = Cublockly || {};

/** Lookup for names of supported languages. Keys in ISO 639 format. */
Cublockly.LANGUAGE_NAME = {
  'en': 'English',
  'fr': 'Français',
  'es': 'Español',
  'nl': 'Nederlands'
};

/**
 * Selected language, default English.
 * @type {string}
 */
Cublockly.LANG = 'en';

/** Initialize function for Cublockly, to be called on page load. */
Cublockly.init = function() {
  // Lang init must run first for the rest of the page to pick the right msgs
  Cublockly.initLanguage();

  // Inject Blockly into content_blocks and fetch additional blocks
  Cublockly.injectBlockly(document.getElementById('content_blocks'),
      Cublockly.TOOLBOX_XML, '../blockly/');
  //Cublockly.importExtraBlocks();

  Cublockly.designJsInit();
  //Cublockly.initialiseIdeButtons();

  Cublockly.bindDesignEventListeners();
  Cublockly.bindActionFunctions();
  Cublockly.bindBlocklyEventListeners();

  window.dispatchEvent(new Event('resize'));
};

/** Binds functions to each of the buttons, nav links, and related. */
Cublockly.bindActionFunctions = function() {

};

/** Initialize the page language. */
Cublockly.initLanguage = function() {
  // Save the current default state
  var defaultLang = Cublockly.LANG;

  // Check server settings and url language, url gets priority
  Cublockly.LANG = Cublockly.getUrlLanguage() ||
      Cublockly.getLanguageSetting() || Cublockly.LANG;


  if (defaultLang !== Cublockly.LANG) {
      Cublockly.injectLanguageJsSources();
      Cublockly.updateLanguageText();
  }
};

/**
 * Get the language previously set by the user from the server settings.
 * @return {string} Language saved in the server settings.
 */
Cublockly.getLanguageSetting = function() {
  //TODO: Server feature still to be implemented, for now return default
  return null;
};

/**
 * Get the language selected from the URL, format '?lang=en'.
 * @return {string} Selected language.
 */
Cublockly.getUrlLanguage = function() {
  var langKey = 'lang';
  var val = location.search.match(new RegExp('[?&]' + langKey + '=([^&]+)'));
  var language = val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : '';
  if (Cublockly.LANGUAGE_NAME[language] === undefined) {
    language = null;
  }
  return language;
};

/** Updates the page displayed text with the new language. */
Cublockly.updateLanguageText = function() {
  //TODO: The page strings still need to be moved into language files
  //document.getElementById('xxx').textContent = MSG['xxx'];
  //document.getElementById('xxxButton').title = MSG['xxx'];
};

/** Injects the language JavaScript files into the html head element. */
Cublockly.injectLanguageJsSources = function() {
  var head = document.getElementsByTagName('head')[0];
  var appLangJsLoad = document.createElement('script');
  appLangJsLoad.src = 'msg/' + Cublockly.LANG + '.js';
  head.appendChild(appLangJsLoad);
  var blocklyLangJsLoad = document.createElement('script');
  blocklyLangJsLoad.src = '../blockly/msg/js/' + Cublockly.LANG + '.js';
  head.appendChild(blocklyLangJsLoad);
};

/** Saves the blocks and reloads with a different language. */
Cublockly.changeLanguage = function() {
  // Store the blocks for the duration of the reload only
  Cublockly.saveSessionStorageBlocks();

  var languageMenu = document.getElementById('language');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
Cublockly.loadUserXmlFile = function() {
  // Create event listener function
  var parseInputXMLfile = function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
      var success = Cublockly.replaceBlocksfromXml(reader.result);
      if (success) {
        Cublockly.renderContent();
      } else {
        Cublockly.alertMessage(
            'Invalid XML',
            'The XML file was not successfully parsed into blocks.' +
            'Please review the XML code and try again.',
            false);
      }
    };
    reader.readAsText(files[0]);
  };
  // Create once invisible browse button with event listener, and click it
  var selectFile = document.getElementById('select_file');
  if (selectFile == null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';

    var selectFileWrapperDom = document.createElement('DIV');
    selectFileWrapperDom.id = 'select_file_wrapper';
    selectFileWrapperDom.style.display = 'none';
    selectFileWrapperDom.appendChild(selectFileDom);

    document.body.appendChild(selectFileWrapperDom);
    selectFile = document.getElementById('select_file');
    selectFile.addEventListener('change', parseInputXMLfile, false);
  }
  selectFile.click();
};

/**
  Saves an XML file if the XML category is selected. Saves a Cubelets file
  if Cubelets Code category is selected.
*/
Cublockly.saveFile = function()
{
  if(jQuery(".collapsible-header.active").attr('id') === "xml_collapsible_header")
  {
    Cublockly.saveXmlFile()
  }
  else
  {
    Cublockly.saveSketchFile();
  }
}

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
Cublockly.saveXmlFile = function() {
  Cublockly.saveTextFileAs(
      document.getElementById('sketch_name').value + '.xml',
      Cublockly.generateXml());
};

/**
 * Creates an Arduino Sketch file containing the Arduino code generated from
 * the Blockly workspace and prompts the users to save it into their local file
 * system.
 */
Cublockly.saveSketchFile = function() {
  Cublockly.saveTextFileAs(
      document.getElementById('sketch_name').value + '.c',
      Cublockly.generateArduino());
};

/**
 * Creates an text file with the input content and files name, and prompts the
 * users to save it into their local file system.
 * @param {!string} fileName Name for the file to be saved.
 * @param {!string} content Text datd to be saved in to the file.
 */
Cublockly.saveTextFileAs = function(fileName, content) {
  var blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, fileName);
};

/**
 * Retrieves the Settings from CublocklyServer to populates the form data
 * and opens the Settings modal dialog.
 */
Cublockly.openSettings = function() {
  CublocklyServer.requestCompilerLocation(
      Cublockly.setCompilerLocationHtml);
  CublocklyServer.requestSketchLocation(Cublockly.setSketchLocationHtml);
  CublocklyServer.requestArduinoBoards(Cublockly.setArduinoBoardsHtml);
  CublocklyServer.requestSerialPorts(Cublockly.setSerialPortsHtml);
  CublocklyServer.requestIdeOptions(Cublockly.setIdeHtml);
  // Language menu only set on page load within Cublockly.initLanguage()
  Cublockly.openSettingsModal();
};

/** Populate the workspace blocks with the XML written in the XML text area. */
Cublockly.XmlTextareaToBlocks = function() {
  var success = Cublockly.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    Cublockly.renderContent();
  } else {
    Cublockly.alertMessage(
        'Invalid XML',
        'The XML inputted into the text area was not successfully parsed into' +
        'blocks. Please review the XML code and try again.',
        false);
  }
};

/**
 * Private variable to save the previous version of the Arduino Code.
 * @type {!String}
 * @private
 */
Cublockly.PREV_ARDUINO_CODE_ = 'void setup() {\n\n}\n\n\nvoid loop() {\n\n}';

/**
 * Populate the Arduino Code and Blocks XML panels with content generated from
 * the blocks.
 */
Cublockly.renderContent = function() {
  // Only regenerate the code if a block is not being dragged
  if (Cublockly.blocklyIsDragging()) return;

  // Render Arduino Code with latest change highlight and syntax highlighting
  var arduinoCode = Cublockly.generateArduino();
  if (arduinoCode !== Cublockly.PREV_ARDUINO_CODE_) {
    var diff = JsDiff.diffWords(Cublockly.PREV_ARDUINO_CODE_, arduinoCode);
    var resultStringArray = [];
    for (var i = 0; i < diff.length; i++) {
      if (!diff[i].removed) {
        var escapedCode = diff[i].value.replace(/</g, "&lt;")
                                       .replace(/>/g, "&gt;");
        if (diff[i].added) {
          resultStringArray.push(
              '<span class="code_highlight_new">' + escapedCode + '</span>');
        } else {
          resultStringArray.push(escapedCode);
        }
      }
    }
    Cublockly.PREV_ARDUINO_CODE_ = arduinoCode;
  }
};

/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
Cublockly.TOOLBAR_SHOWING_ = true;

/**
 * Toggles the blockly toolbox and the Cublockly toolbox button On and Off.
 * Uses namespace member variable TOOLBAR_SHOWING_ to toggle state.
 */
Cublockly.toogleToolbox = function() {
  if (Cublockly.TOOLBAR_SHOWING_) {
    Cublockly.blocklyCloseToolbox();
    Cublockly.displayToolbox(false);
  } else {
    Cublockly.displayToolbox(true);
  }
  Cublockly.TOOLBAR_SHOWING_ = !Cublockly.TOOLBAR_SHOWING_;
};

/** @return {boolean} Indicates if the toolbox is currently visible. */
Cublockly.isToolboxVisible = function() {
  return Cublockly.TOOLBAR_SHOWING_;
};

/**
 * Lazy loads the additional block JS files from the ./block directory.
 * Initialises any additional Cublockly extensions.
 * TODO: Loads the examples into the examples modal
 */
Cublockly.importExtraBlocks = function() {
  /**
   * Parses the JSON data to find the block and languages js files.
   * @param {jsonDataObj} jsonDataObj JSON in JavaScript object format, null
   *     indicates an error occurred.
   */
  var jsonDataCb = function(jsonDataObj) {
    if (jsonDataObj === null) return Cublockly.openNotConnectedModal();
    if (jsonDataObj.categories !== undefined) {
      var head = document.getElementsByTagName('head')[0];
      for (var catDir in jsonDataObj.categories) {
        var blocksJsLoad = document.createElement('script');
        blocksJsLoad.src = '../blocks/' + catDir + '/blocks.js';
        head.appendChild(blocksJsLoad);

        var blocksLangJsLoad = document.createElement('script');
        blocksLangJsLoad.src = '../blocks/' + catDir + '/msg/' + 'messages.js';
            //'lang/' + Cublockly.LANG + '.js';
        head.appendChild(blocksLangJsLoad);

        var blocksGeneratorJsLoad = document.createElement('script');
        blocksGeneratorJsLoad.src = '../blocks/' + catDir +
            '/generator_arduino.js';
        head.appendChild(blocksGeneratorJsLoad);

        // Check if the blocks add additional Cublockly functionality
        var extensions = jsonDataObj.categories[catDir].extensions
        if (extensions) {
          for (var i = 0; i < extensions.length; i++) {
            var blockExtensionJsLoad = document.createElement('script');
            blockExtensionJsLoad.src = '../blocks/' + catDir + '/extensions.js';
            head.appendChild(blockExtensionJsLoad);
            // Add function to scheduler as lazy loading has to complete first
            setTimeout(function(category, extension) {
              var extensionNamespaces = extension.split('.');
              var extensionCall = window;
              var invalidFunc = false;
              for (var j = 0; j < extensionNamespaces.length; j++) {
                extensionCall = extensionCall[extensionNamespaces[j]];
                if (extensionCall === undefined) {
                  invalidFunc = true;
                  break;
                }
              }
              if (typeof extensionCall != 'function') {
                invalidFunc = true;
              }
              if (invalidFunc) {
                throw 'Blocks ' + category.categoryName + ' extension "' +
                      extension + '" is not a valid function.';
              } else {
                extensionCall();
              }
            }, 800, jsonDataObj.categories[catDir], extensions[i]);
          }
        }
      }
    }
  };
  // Reads the JSON data containing all block categories from ./blocks directory
  // TODO: Now reading a local file, to be replaced by server generated JSON
  Cublockly.getJsonData('../blocks/blocks_data.json', jsonDataCb);
};

/** Opens a modal with a list of categories to add or remove to the toolbox */
Cublockly.openExtraCategoriesSelect = function() {
  /**
   * Parses the JSON data from the server into a list of additional categories.
   * @param {jsonDataObj} jsonDataObj JSON in JavaScript object format, null
   *     indicates an error occurred.
   */
  var jsonDataCb = function(jsonDataObj) {
    if (jsonDataObj === null) return Cublockly.openNotConnectedModal();
    var htmlContent = document.createElement('div');
    if (jsonDataObj.categories !== undefined) {
      for (var catDir in jsonDataObj.categories) {
        // Function required to maintain each loop variable scope separated
        (function(cat) {
          var clickBind = function(tickValue) {
            if (tickValue) {
              var catDom = (new DOMParser()).parseFromString(
                  cat.toolbox.join(''), 'text/xml').firstChild;
              Cublockly.addToolboxCategory(cat.toolboxName, catDom);
            } else {
              Cublockly.removeToolboxCategory(cat.toolboxName);
            }
          };
          htmlContent.appendChild(Cublockly.createExtraBlocksCatHtml(
              cat.categoryName, cat.description, clickBind));
        })(jsonDataObj.categories[catDir]);
      }
    }
    Cublockly.openAdditionalBlocksModal(htmlContent);
  };
  // Reads the JSON data containing all block categories from ./blocks directory
  // TODO: Now reading a local file, to be replaced by server generated JSON
  Cublockly.getJsonData('../blocks/blocks_data.json', jsonDataCb);
};

/** Informs the user that the selected function is not yet implemented. */
Cublockly.functionNotImplemented = function() {
  Cublockly.shortMessage('Function not yet implemented');
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 * @private
 */
Cublockly.bindClick_ = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  // Need to ensure both, touch and click, events don't fire for the same thing
  var propagateOnce = function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
  };
  el.addEventListener('ontouchend', propagateOnce);
  el.addEventListener('click', propagateOnce);
};

window.addEventListener('load', function load(event) {
  window.removeEventListener('load', load, false);
  Cublockly.init();
});
