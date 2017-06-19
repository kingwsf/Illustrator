
var logfilePath = '/c/ai-saver-log.txt';
var base_path = '/d/Dropbox/';
var dir = Folder(base_path);

log_init();

try {
	var box = new Window('dialog', "AI-saver script");  
	
	box.panel = box.add('panel', undefined, "Working path");
	box.panel.orientation = 'row';
	box.panel.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP];

	var dirEt = box.panel.add('edittext', undefined, base_path); 
	dirEt.size = [ 250,20 ];

	var chooseBtn = box.panel.add('button', undefined, 'Choose ...' );
	chooseBtn.onClick = function() { dirEt.text = dir = Folder(base_path).selectDlg(); }

	box.startBtn = box.add('button',undefined, "Start", {name:'start'});  
	box.closeBtn = box.add('button',undefined, "Close", {name:'close'});  

	box.closeBtn.onClick = function(){  
		box.close();  
	}
	box.startBtn.onClick = function(){ 
		box.close();  
		openAllEpsFiles();
		SaveAll();
		alert("All done", 'AI saver complete');
	}
	box.show()  	
} catch(e) {
	alert("Malfunction mistake: " + e.message);
	log('total malfuncion' + e.message);
}

function openAllEpsFiles(){
	log("Script work in dir: " + dir);
	//var dir = Folder.selectDialog("Where?");
	var eps_files = dir.getFiles("*.eps");
	log("eps files count:" + eps_files.length);
	for(var f = 0; f < eps_files.length; f++){
		//alert(GetFileName(eps_files[f]));		
		var ai_file = File(dir + "/" + GetFileName(eps_files[f]) + ".ai");
		if(!ai_file.exists) {
			//alert("file " + ai_file + " not exists");
			log("opening " + eps_files[f]);
			var doc = app.open(eps_files[f]);
		} else {
			log(eps_files[f] + " AI exists");
		}
	}
} 

function SaveAll(){
	if (app.documents.length > 0) {
		for (var i = 0; i < app.documents.length; i++) {
			var a = app.documents[i];
			app.activeDocument = a;
			saveAI(a);
		}
	}
}


function saveAI(doc){
	var Name = doc.name.replace(/\.[^\.]+$/, '').replace(/ \[Converted\]/g, '');
	log("saving " + Name); 
	var dest = new File(dir + "/" + Name +".ai");
	var saveOpts = new IllustratorSaveOptions();
	saveOpts.embedLinkedFiles = true;
	saveOpts.fontSubsetThreshold = 0.0
	saveOpts.pdfCompatible = true
	doc.saveAs(dest, saveOpts);
	//doc.close();
}

function GetFileName(value) {
	var path = value.toString();
	var lastIndex = path.lastIndexOf("/");
	var file = path.slice(lastIndex + 1);
	var lastIndexPeriod = file.lastIndexOf(".");
	return file.slice(0, lastIndexPeriod);
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
		newLog.write('AI-saver ' + Today + '\n');
		newLog.close();
	} catch(e) {
		alert('logfile cannot be created. ' + e.message)
	}

}