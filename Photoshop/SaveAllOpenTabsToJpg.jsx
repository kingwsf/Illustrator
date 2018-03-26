function saveFileToJPEG (doc) {
    var saveOptions = new JPEGSaveOptions();
    saveOptions.embedColorProfile = true;
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    saveOptions.matte = MatteType.NONE;
    saveOptions.quality = 8;
 
    var docName = doc.name.replace(/\.[^\.]+$/, '');
    var jpegName = decodeURI(doc.path) + "/" + docName + ".jpg";
    var saveName = new File(jpegName);
    doc.saveAs(saveName, saveOptions, true, Extension.LOWERCASE);   
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
 
 
function main(){ 
  //alert("script started");
  if (app.documents.length > 0) {
    for (var i = 0; i < app.documents.length; i++) {
      //saveAI(app.documents[i]);
      saveFileToJPEG(app.documents[i]);
         
      //app.activeDocument.close();
       
      //    SavePNG(a, saveFile);          
    } 
     
        //var a = app.activeDocument;
        //var Name = a.name.replace(/\.[^\.]+$/, ''); 
        //var Path = a.path; 
                //exportFileToJPEG(Path + "/" + Name +".jpg");
      //raster();   
        //ImageCapture();
        //      SavePNG(a, saveFile);          
            alert('All done', 'Export');
        }
        else    {
            alert('Open a document before running this script', 'Error running exportToJPEG');
        }
 
} 
 
 
main();