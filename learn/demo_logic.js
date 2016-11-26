var curBlock = 1;

function prev() {
	document.getElementById("block"+curBlock).style.display="none";
	if (curBlock>1) {curBlock--;}
	run(curBlock);
	document.getElementById("block"+curBlock).style.display="";
}
function next() {
	document.getElementById("block"+curBlock).style.display="none";
	if (document.getElementById("block"+(curBlock+1))) {
		curBlock++;
		document.getElementById("block"+curBlock).style.display="";
	} else {		
		document.getElementById("endblock").style.display="";
	}
	run(curBlock);
}

function launch() {
	var i = 2;
  document.getElementById("endblock").style.display="none";
	var block = document.getElementById("block"+i);
	while(block) {
		block.style.display="none";
		i++;
		block = document.getElementById("block"+i);
	}
	run(curBlock);
	launch_local(); // this function has to be written in the local .js file
}


function createArray(length) {
  var arr = new Array(length || 0),
  i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function gsc2hex( percentage ) {
  var color_part_dec = 255 * percentage;
  var color_part_hex = Number(parseInt( color_part_dec , 10)).toString(16);
  return "#" + color_part_hex + color_part_hex + color_part_hex;
}
