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

var main = 4;
var breaks = 1;
var bigbreak = 5;
var pos = 0;
var cbreak = false;
var rep = 0;
var nreps = 3;
var text = ['Jumping Jacks','Goblet Squat','Mountain Climbers','One-Arm Dumbell','T-Pushup','Burpee','2-DB Row','Side Lunge','Pushup Row','Lunge','2-DB Press'];
var rtext = [];
var len = [];
for (var i = 0; i < text.length-1; i++) {
    rtext.push(text[i]);
    rtext.push('Break! Next: ' + text[i+1]);
    len.push(main*1000); len.push(breaks*1000);
}
rtext.push(text[i]);

var done = false;

var tid;

function timer() {
    if (done) {
        clearTimeout(tid);
        finish();
        return;
    }
	tid = setTimeout(timer,50);
    elapsed = (new Date()) - start;
    update();
}

var celapsed = 0;
function update() {
    // Start by checking if we jumped segments
    if (rep == nreps) {
        done = true;
        return;
    } else if (pos >= len.length && ) {
        // we finished a repetition
    }
    if ((elapsed - celapsed) > len[pos]) {
        //we did, jump seg
        pos = pos + 1;
        cbreak = !cbreak;
        celapsed = elapsed;
    }
    document.getElementById("wtext").innerHTML = rtext[pos];
    document.getElementById("ttext").innerHTML = toMMSS(elapsed/1000);
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
