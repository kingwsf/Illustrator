// Color all paths in random swatch
// ---------------------------------------------------------
colorPaths();

function colorPaths(){
  if (app.documents.length > 0) {
    var docRef = app.activeDocument;
    
    if(docRef.swatches.length > 2){

       if(docRef.pathItems.length > 0){
        alert('PathItems: ' 
          + docRef.pathItems.length + '\nSwatches: ' + (docRef.swatches.length - 2) + 
          '\nСейчас все раскрашу');
          for (var i = 0; i < docRef.pathItems.length; i++) {
            var item = docRef.pathItems[i];
            var swIndex = getRandom(0, docRef.swatches.length - 1);
            item.filled = true;
            //item.fillColor = makeColor(255,0,255);
           if(docRef.swatches[swIndex].name != '[Registration]' && docRef.swatches[swIndex].name != '[None]')
                  item.fillColor = docRef.swatches[swIndex].color;
            //alert('color: ' +  item.fillColor + '\nrect: ' + item.position + '\ncolor index: ' + swIndex);
          }

      } else {
        alert('No Path Items! Не вижу замкнутых контуров в документе!');
      }

    } else {
      alert('No swatches! Активных сватчесов нету!');
    }
   

    

}
else {
    alert('Кажется не открыт ни один документ');
}
}

function makeColor(r,g,b){
    var c = new RGBColor();
    c.red   = r;
    c.green = g;
    c.blue  = b;
    return c;
}

function getRandom(min, max) {
    //return Math.random() * (max - min) + min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

