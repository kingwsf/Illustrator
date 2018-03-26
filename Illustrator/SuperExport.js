//var destFolder = "C:\\tempai\\";
var logfilePath = '/c/tempai/super-exoprt-log.txt';
var tempActionFile = '/c/tempai/temp.aia';
var tempActionSet = 'TempActions';
var tempExportAction = 'tempExportJpg'; 

log_init();

try {
  if (app.documents.length > 0) {
    isWidth = confirm("Export ALL open tabs?");
    if(isWidth) {
      log('documents: ' + app.documents.length);
      for (var i = 0; i < app.documents.length; i++) {
        
        var a = app.documents[i];
        app.activeDocument = a;
        var epsName = a.fullName.fsName;
        
        log(i + ' processing file: ' + a.fullName.fsName);        
        /*alert(a.fullName + '\nfolder: ' + destFolder +
             '\nname: ' + a.name + 
             '\npath: ' + a.path + 
             '\nfullName.fsName: ' + a.fullName.fsName + 
             '\nfullName.parent.fsName: ' + a.fullName.parent.fsName +
             '\nepsName: ' + epsName.replace(/\.eps/g, '') + 
             '\nrename: ' + epsName.replace(/\.eps| \[Converted\]/g, '') + '.jpg');
        */
        SetArtboardTo1k(a);
        createAction(a.fullName.parent.fsName);

        app.doScript(tempExportAction, tempActionSet);

        //saveAI(a);
        app.unloadAction(tempActionSet, '');

        
//        alert(epsName.replace(/\.eps/g, ''));
        try{
          var f = new File(epsName.replace(/\.eps/g, '') + '-01.jpg');
          f.rename(epsName.replace(/\.eps| \[Converted\]/g, '') + '.jpg');
          f.close();
        } catch(e) {
            alert("Can't rename JPG. " + e.message);
            log(e.message);
        }      
        
        //a.close();
      }

      alert("All done", 'Export JPEG');
      log('success');
    }   else  {
        alert('Open a document before running this script', 'Error');
        log('Open a document before running this script');
    }
    

  } 
    
} catch(e) {
  alert("Malfunction mistake: " + e.message);
  log('total malfuncion' + e.message);
}

function SetArtboardTo1k(doc){
  var rect = doc.artboards[0].artboardRect;
  var x, y, w, h, dimensions;
  if(Math.abs(rect[2]) == Math.abs(rect[3])){
    x = rect[0] - (1000 - rect[0])/2;
    y = rect[1] + (1000 - rect[1])/2;
    w = x + 1000;
    h = y - 1000;
    dimensions = '1000x1000';
  } else {
    x = rect[0] - (1160 - rect[0])/2;
    y = rect[1] + (772 - rect[1])/2;
    w = x + 1160;
    h = y - 772;
    dimensions = '1160x772';
  }
  doc.artboards[0].artboardRect = [x, y, w, h];
  app.doScript('SetAllTo_' + dimensions, 'MyActions');
  
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


function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function  ascii2Hex (hex) {
    return hex.replace(/./g, function (a) {return a.charCodeAt(0).toString(16)})
}


function createAction (dest) {
  var actionStr = ['/version 3',
        '/name [ ' + tempActionSet.length,
          ascii2Hex(tempActionSet),
        ']',
        '/isOpen 1',
        '/actionCount 1',
        '/action-1 {',
          '/name [ ' + tempExportAction.length,
            ascii2Hex(tempExportAction),
          ']',
          '/keyIndex 0',
          '/colorIndex 0',
          '/isOpen 0',
          '/eventCount 1',
          '/event-1 {',
            '/useRulersIn1stQuadrant 0',
            '/internalName (adobe_exportDocument)',
            '/localizedName [ 6',
              '4578706f7274',
            ']',
            '/isOpen 1',
            '/isOn 1',
            '/hasDialog 1',
            '/showDialog 0',
            '/parameterCount 7',
            '/parameter-1 {',
              '/key 1885434477',
              '/showInPalette 0',
              '/type (raw)',
              '/value < ' + 104,
                '0800000003000000030000000200000000006801010000000000000001000000',
                '69006d006100670065006d006100700000006300680000000000000000000000',
                '69006d006100670065006d006100700000006300680000000000000000000000',
                '0000000001000000',
              '>',
              '/size 104',
            '}',
            '/parameter-2 {',
              '/key 1851878757',
              '/showInPalette -1',
              '/type (ustring)',
              '/value [ ' + dest.length,
                ascii2Hex(dest),
              ']',
            '}',
            '/parameter-3 {',
              '/key 1718775156',
              '/showInPalette -1',
              '/type (ustring)',
              '/value [ ' + 16,
                '4a5045472066696c6520666f726d6174',
              ']',
            '}',
            '/parameter-4 {',
              '/key 1702392942',
              '/showInPalette -1',
              '/type (ustring)',
              '/value [ ' + 12,
                '6a70672c6a70652c6a706567',
              ']',
            '}',
            '/parameter-5 {',
              '/key 1936548194',
              '/showInPalette -1',
              '/type (boolean)',
              '/value 1',
            '}',
            '/parameter-6 {',
              '/key 1935764588',
              '/showInPalette -1',
              '/type (boolean)',
              '/value 1',
            '}',
            '/parameter-7 {',
              '/key 1936875886',
              '/showInPalette -1',
              '/type (ustring)',
              '/value [ 1',
                '31',
              ']',
            '}',
        '}',
      '}'].join('\n');
    var f = new File(tempActionFile);
    //f.encoding = "UTF8";
    f.open('w');
    f.write(actionStr);
    f.close();
    app.loadAction(f);
    f.remove();
}

function log(str) {
    var f = new File(logfilePath);
    f.open('a');
    f.write(str + '\n');
    f.close();    
}
 
function log_init(){
  try{
    var Today = new Date();
    var newLog = new File(logfilePath);  
    newLog.open('w');
    newLog.write('SuperExport ' + Today + '\n');
    newLog.close();
  } catch(e) {
    alert('logfile cannot be created. ' + e.message)
  }

}