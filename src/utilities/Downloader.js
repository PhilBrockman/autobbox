import { saveAs } from 'file-saver';
var JSZip = require('jszip')

function genTxt(dict){
  let s = Object.keys(dict).sort()
  let out = []
  for(var i = 0; i < s.length; i++){
    out.push(s[i])
  }
  return (out.join('\n'));
}

export function toJSON(d){
  var zip = new JSZip()
  zip.file("data/label_map.txt", ['1', '2', '3', '4', '5', '6', '7', '8', '9', '90'].join("\n"))

  for (var i = 0; i < d.length; i++){
    let prefix = `data/${d[i].filename}`
    zip.file(prefix+".jpg", d[i].base64, {base64: true});
    let txtContent = []
    for (var j = 0; j < d[i].digits.length; j++){
      let digit = d[i].digits[j].bbox
      txtContent.push( `${d[i].digits[j].class_label} ${digit.xcent} ${digit.ycent} ${digit.width} ${digit.height}`)
    }
    zip.file(prefix+".txt", txtContent.join('\n'));
  }

  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, "labeled data.zip");
  })

}
