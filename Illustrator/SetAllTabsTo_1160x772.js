var width = 1160,
  height = 772;

var dimensions = width.toString() + 'x' + height.toString();

function SetArtboardTo1k(doc){
       var rect = doc.artboards[0].artboardRect;
       var x = rect[0] - (width - rect[0])/2;
       var y = rect[1] + (height - rect[1])/2;
       w = x + width;
       h = y - height;
       doc.artboards[0].artboardRect = [x, y, w, h];
  } 


try {
  if (app.documents.length > 0) {
    isWidth = confirm("Set ALL open tabs to " + dimensions + "?");
    if(isWidth) {
      for (var i = 0; i < app.documents.length; i++) {
        var a = app.documents[i];
        app.activeDocument = a;
  
        SetArtboardTo1k(a);
        app.doScript('SetAllTo_' + dimensions, 'MyActions');
        //createAction(actionStr, set);
        //app.doScript(action, set);
        //app.clearAction(action);
        saveAI(a);
          //app.activeDocument.close();
        }
        alert("All done", 'Resizing artboards');
    }   else  {
        alert('Open a document before running this script', 'Error');
    }
    

  } 
    
} catch(e) {
  alert("Malfunction mistake: " + e.message);
}

function saveAI(doc){
    var Name = doc.name.replace(/\.[^\.]+$/, ''); 
    var dest = new File("/c/tempai/" + Name +".ai");
    var saveOpts = new IllustratorSaveOptions();
    saveOpts.embedLinkedFiles = true;
    saveOpts.fontSubsetThreshold = 0.0
    saveOpts.pdfCompatible = true
    doc.saveAs(dest, saveOpts);
   //doc.close();
}