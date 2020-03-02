function arraySwap(array,overwriteNewValue,keepKey){if(typeof(array)=="undefined"){return false;};if(typeof(array)!="object"){array=new Array(array);};var output=new Array();if(typeof(overwriteNewValue)=="undefined"){for(var k in array){output[array[k]]=k;}}else{if(!keepKey){for(var k in array){output[array[k]]=overwriteNewValue;}}else{for(var k in array){output[k]=overwriteNewValue;}};}return output;}


