function exportFileToJPEG (dest) {
	var exportOptions = new ExportOptionsJPEG();
	var type = ExportType.JPEG;
	var fileSpec = new File(dest);
	exportOptions.antiAliasing = true;
	exportOptions.qualitySetting = 100;
	exportOptions.resolution = 360;
	app.activeDocument.exportFile( fileSpec, type, exportOptions );
	
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
      saveAI(app.documents[i]);
      //app.activeDocument.close();
      
      //    SavePNG(a, saveFile);          
    } 
    
        //var a = app.activeDocument;
    	//var Name = a.name.replace(/\.[^\.]+$/, ''); 
   		//var Path = a.path; 
   		   		//exportFileToJPEG(Path + "/" + Name +".jpg");
      //raster();	
   		//ImageCapture();
      	//		SavePNG(a, saveFile);          
    		alert('All done', 'Export');
    	}
    	else 	{
    		alert('Open a document before running this script', 'Error running exportToJPEG');
    	}

    } 


    main();