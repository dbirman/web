var modal = document.getElementById('myModal');
var modal_content = document.getElementById('myContent');

// When the user clicks anywhere on the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == modal_content) {
    	hide();
    }
}

function disp() {
	modal.style.display="block";
}

function hide() {
    modal.style.display = "none";

}
