//Incoming Messages/Requests from our parent.
window.addEventListener('message', function(event) {
  if(!event.data)  {
    return;
  }
  var message = JSON.parse(event.data);
  if(!message.request){
    console.log("There was no request from this message.")
    return;
  }
  if(message.request == 'getCubeletsCode'){

    var response_message = {
      "response": message.request,
      "data": Cublockly.generateArduino()
    }
    sendCSPMessage(response_message);
  }
  else if(message.request == 'getXml'){
    var response_message = {
      "response": message.request,
      "data": Cublockly.generateXml()
    }
    sendCSPMessage(response_message);
  }
  else if(message.request == 'setXml'){
    //message.data
    Cublockly.replaceBlocksfromXml(message.data);
    Cublockly.renderContent();
  }
  else if(message.request == "registerChangeListener")
  {
    Cublockly.workspace.addChangeListener(onBlocklyWorkspaceChanged);
  }
  else if(message.request == "setCubeletType"){    
    Blockly.Cubelets['check_cubelets'](message.data.blockTypeId)
  }
 });

 function onBlocklyWorkspaceChanged(){
   var event_message = {
     "event": "onBlocklyWorkspaceChanged",
     "data": Cublockly.generateXml()
   }
   sendCSPMessage(event_message);
 }

//Send an outgoing response or event
 function sendCSPMessage(message){
   parent.postMessage(JSON.stringify(message),"*");
 }
