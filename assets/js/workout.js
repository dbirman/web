var pos = 0;
var start;
var text =["Starting!" ]

$(document).ready( function() {
    $("#wtext").hide();
    $("#ttext").hide();
})

toMMSS = function  (num) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}

var len = [15,60,60]
var breaks = 15;
var pos = 0;
var cbreak = false;
var rep = 0;
var text = ['Starting!','Jumping Jacks','Goblet Squat',]

var done = false;

var tid;

function timer() {
    if (done) {
        cancelTimeout(tid);
        finish();
        return;
    }
	tid = setTimeout(timer,50);
    elapsed = (new Date()) - start;
    update();
}

function update() {
    // Start by checking if we jumped segments
    var celapsed = celapsed + elapsed;
    if (celapsed > len[pos]) {
        //we did, jump seg
        pos = pos + 1;
        cbreak = !cbreak;
    }
    document.getElementById("ttext").innerHTML = toMMSS(celapsed/1000);
}

function finish() {
    document.getElementById("wtext").innerHTML = "Finished!";
}

function workout_start() {
	// Runs the workout script
    $("#lbutton").hide();
    $("#wtext").show();
    $("#ttext").show();
	start = new Date();
	timer();
}
