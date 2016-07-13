/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript to configure front end design for Cublockly app.
 */
'use strict';

/** Create a namespace for the application. */
var Cublockly = Cublockly || {};


/** Initialises all the design related JavaScript. */
Cublockly.designJsInit = function() {

};

/** Binds the event listeners relevant to the page design. */
Cublockly.bindDesignEventListeners = function() {
  // Resize blockly workspace on window resize
  window.addEventListener(
      'resize', Cublockly.resizeBlocklyWorkspace, false);
};


/**
 * Sets the toolbox HTML element to be display or not and change the visibility
 * button to reflect the new state.
 * When the toolbox is visible it should display the "visibility-off" icon with
 * no background, and the opposite when toolbox is hidden.
 * @param {!boolean} show Indicates if the toolbox should be set visible.
 */
Cublockly.displayToolbox = function(show) {
  var toolbox = $('.blocklyToolboxDiv');
  var toolboxTree = $('.blocklyTreeRoot');
  var button = document.getElementById('button_toggle_toolbox');
  var buttonIcon = document.getElementById('button_toggle_toolbox_icon');

  // Because firing multiple clicks can confuse the animation, create an overlay
  // element to stop clicks (due to the materialize framework controlling the
  // event listeners is better to do it this way for easy framework update).
  var elLocation = $('#button_toggle_toolbox').offset();
  jQuery('<div/>', {
      id: 'toolboxButtonScreen',
      css: {
        position: 'fixed',
        top: elLocation.top,
        left: elLocation.left,
        height: $('#button_toggle_toolbox').height(),
        width: $('#button_toggle_toolbox').width(),
        cursor: 'pointer',
        zIndex: 12
      },
  }).appendTo('body');

  var classOn = 'button_toggle_toolbox_on';
  var classOff = 'button_toggle_toolbox_off';
  var visOn = 'mdi-action-visibility';
  var visOff = 'mdi-action-visibility-off';
  if (show) {
    toolbox.show();
    button.className = button.className.replace(classOn, classOff);
    buttonIcon.className = buttonIcon.className.replace(visOn, visOff);
    toolbox.animate(
        {height: document.getElementById('content_blocks').style.height}, 300,
        function() {
          toolboxTree.css('overflow-y', 'auto');
          window.dispatchEvent(new Event('resize'));
          $('#toolboxButtonScreen').remove();
        });
  } else {
    toolboxTree.css('overflow-y', 'hidden');
    buttonIcon.className = buttonIcon.className.replace(visOff, visOn);
    toolbox.animate({height: 38}, 300, function() {
      button.className = button.className.replace(classOff, classOn);
      toolbox.fadeOut(350, 'linear', function() {
        window.dispatchEvent(new Event('resize'));
        setTimeout(function() { toolbox.height(38); }, 100);
        $('#toolboxButtonScreen').remove();
      });
    });
  }
};

/** Resizes the container for the Blockly workspace. */
Cublockly.resizeBlocklyWorkspace = function() {
  var contentBlocks = document.getElementById('content_blocks');
  var wrapperPanelSize =
      Cublockly.getBBox_(document.getElementById('blocks_panel'));

  contentBlocks.style.top = wrapperPanelSize.y + 'px';
  contentBlocks.style.left = wrapperPanelSize.x + 'px';
  // Height and width need to be set, read back, then set again to
  // compensate for scrollbars.
  contentBlocks.style.height = wrapperPanelSize.height + 'px';
  contentBlocks.style.height =
      (2 * wrapperPanelSize.height - contentBlocks.offsetHeight) + 'px';
  contentBlocks.style.width = wrapperPanelSize.width + 'px';
  contentBlocks.style.width =
      (2 * wrapperPanelSize.width - contentBlocks.offsetWidth) + 'px';
};


/**
 * Controls the height of the block and collapsible content between 2 states
 * using CSS classes.
 * It's state is dependent on the state of the IDE output collapsible. The
 * collapsible functionality from Materialize framework adds the active class,
 * so this class is consulted to shrink or expand the content height.
 */
Cublockly.contentHeightToggle = function() {
  var outputHeader = document.getElementById('ide_output_collapsible_header');
  var blocks = document.getElementById('blocks_panel');
  var arduino = document.getElementById('content_arduino');
  var xml = document.getElementById('content_xml');

  // Blockly doesn't resize with CSS3 transitions enabled, so do it manually
  var timerId = setInterval(function() {
    window.dispatchEvent(new Event('resize'));
  }, 15);
  setTimeout(function() {
    clearInterval(timerId);
  }, 400);

  // Apart from checking if the output is visible, do not bother to shrink in
  // small screens as the minimum height of the content will kick in and cause
  // the content to be behind the IDE output data anyway.
  if (!outputHeader.className.match('active') && $(window).height() > 800) {
    blocks.className = 'content height_transition blocks_panel_small';
    arduino.className = 'content height_transition content_arduino_small';
    xml.className = 'content height_transition content_xml_small';
  } else {
    blocks.className = 'content height_transition blocks_panel_large';
    arduino.className = 'content height_transition content_arduino_large';
    xml.className = 'content height_transition content_xml_large';
  }

  // If the height transition CSS is left then blockly does not resize
  setTimeout(function() {
    blocks.className = blocks.className.replace('height_transition', '');
    arduino.className = arduino.className.replace('height_transition', '');
    xml.className = xml.className.replace('height_transition', '');
  }, 400);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Cublockly.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};
