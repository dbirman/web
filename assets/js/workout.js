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
    // if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}

var main = 60;
var breaks = 20;
var grtime = 10;

var bigbreak = 5;
var pos = 0;
var cbreak = false;
var rep = 0;
var nreps = 3;
var text1p = ['Warmup: Kicks, Scorpions, Hand-Walks',
            'Continue Warm-up',
            'Rest',
            'Jumping Jacks',
            'Goblet Squat',
            'Mountain Climbers',
            'One-Arm Dumbell',
            'T-Pushup',
            'Burpee',
            '2-DB Row',
            'Side Lunge',
            'Pushup Row',
            'Lunge',
            'Leg Lifts',
            '2-DB Press',
            'Jumping Jacks (Cooldown)'];
var text2p = ['Warmup: Kicks, Scorpions, Hand-Walks',
            'Continue warmup',
            'Rest',
            'T-Pushup & Jacks',
            'Row & Burpees',
            'Side Lunge & Sit-ups',
            'Goblet Squat',
            'Mountains & T-Pushups',
            'Burpee & Row',
            'Single DB',
            'Lunge',
            'Pushup Row & Mountains',
            'Press & Leg Lifts',
            'Sit-ups & Side Lunge',
            'Leg Lifts & Pushup Row',
            'Jacks & Press',
            'Jumping Jacks (Cooldown)'];
var text;
var rtext = [];
var len = [];

var done = false;

var tid;

// load sounds
var snd_start = new Audio("assets/snd/beep_start.wav"); // buffers automatically when created
var snd_end = new Audio("assets/snd/beep_end.wav");

function timer() {
    if (done) {
        clearTimeout(tid);
        return;
    }
	tid = setTimeout(timer,50);
    elapsed = (new Date()) - start;
    update();
}

var celapsed = 0;
var beep_done = 0;
function update() {
    // Start by checking if we jumped segments
    if (pos >= len.length ) {
        // we finished a repetition
        done = true;
        beep_done = 1;
        finish();
        return;
    }
    if ((cbreak) && !beep_done && ((len[pos]-(elapsed-celapsed)) < 4000)) {
        snd_start.play();
        beep_done = 1;
    }
    if ((!cbreak) && !beep_done && ((len[pos]-(elapsed-celapsed)) < 500)) {
        snd_end.play();
        beep_end = 1;
    }
    // If within seconds and didn't beep yet
    if ((elapsed - celapsed) > len[pos]) {
        //we did, jump seg
        pos = pos + 1;
        cbreak = !cbreak;
        celapsed = elapsed;
        beep_done = 0;
    }
    document.getElementById("wtext").innerHTML = rtext[pos];
    document.getElementById("ttext").innerHTML = toMMSS((len[pos]-(elapsed-celapsed))/1000);
}

function finish() {
    document.getElementById("wtext").innerHTML = "Finished!";
    $("#ttext").hide();
}

function workout_start(num) {
    if (num==1) {
        text = text1p;
    } else if (num==2) {
        text = text2p;
    } else {
        alert('Something is wrong with the numbers');
        return
    }
    rtext.push('Get Ready!');
    len.push(grtime*1000);
    for (var i = 0; i < text.length-1; i++) {
        rtext.push(text[i]);
        rtext.push('Break! Next: ' + text[i+1]);
        len.push(main*1000); len.push(breaks*1000);
    }
    rtext.push(text[i]);
    len.push(main*1000);
	// Runs the workout script
    $("#lbutton").hide();
    $("#l2button").hide();
    $("#wtext").show();
    $("#ttext").show();
    $("#hdr").hide();
	start = new Date();
    cbreak = true;
	timer();
}
