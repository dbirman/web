// Dan Birman, 2015
// Modify, edit, improve, or destroy this code in any way you see fit! I hope this tool is helpful for you.

//This is definitely NOT optimized, efficient, readable, or even commented code. Sorry :D. I wrote it on a flight from Seattle to
//San Francisco in a flurry of activity.

var settings = {};
settings.verbose = true;
settings.min = 3;
settings.seat = 'N';

settings.images = [];
for (var i=1;i<=36;i++) {
	tile = 'images/tiles';
	if (i<10) {tile = tile + '_0' + i;}
	else {tile = tile + '_' + i;}
	if (i>0) {tile = tile + '.gif';}
	else {tile = tile + '.png';}
	settings.images.push(tile);
}
settings.tiles = ['WD','GD','RD','--','--','NW','EW','SW','WW'];
for (var i=1;i<=9;i++) {
	settings.tiles.push(i + 'R');
}
for (var i=1;i<=9;i++) {
	settings.tiles.push(i + 'B');
}
for (var i=1;i<=9;i++) {
	settings.tiles.push(i + 'C');
}

preset = function(num) {
	switch (num) {
		case 1:
			imageVals = [9,10,11,12,13,14,15,16,17,18,18,18,5,5];
			update();
			break;
		case 2:
			imageVals = [0,0,0,1,1,1,2,2,2,16,16,16,6,6];
			update(); 
			break;
		case 3:
			imageVals = [28,29,30,28,29,30,28,29,30,28,29,30,2,2];
			update();
			break;
		case 4:
			imageVals = [18,18,18,19,19,19,20,20,20,7,7,7,6,6];
			update();
			break;
		case 5:
			imageVals = [18,18,18,19,19,19,20,20,20,21,21,21,6,6];
			update();
			break;
	}
}

// dragons: 0-2
// winds 6-9
// reds: 10-17
var imageVals = [];
for (var i =0; i< 14; i++) {
	imageVals.push(Math.floor((Math.random() * 35) + 1));
}

findVal = function(val) {
	return(settings.tiles[val]);
}
findImage = function(tile) {
	for (var i = 0;i<settings.tiles.length;i++) {
		if (tile==settings.tiles[i]) {
			return(settings.images[i]);
		}
	}
	return(null);
}


var log = [];

var one = {};
one.cards = ['1C','2C','3C'];
one.pung = false;
one.kung = false;
one.chi = true;
one.num = false;
one.terminals = false;
one.honors = true;
one.suited = true;
one.hidden = false;

var two = {};
two.cards = ['1C','2C','3C'];
two.pung = false;
two.kung = false;
two.chi = true;
two.num = false;
two.suited = true;
two.honors = true;
two.terminals = false;
two.hidden = false;

var thr = {};
thr.cards = ['1C','2C','3C'];
thr.pung = true;
thr.kung = false;
thr.chi = false;
thr.num = false;
thr.suited = true;
thr.honors = true;
thr.terminals = false;
thr.hidden = false;

var fur = {};
fur.cards = ['NW','NW','NW'];
fur.pung = true;
fur.kung = false;
fur.chi = false;
fur.num = false;
fur.suited = true;
fur.honors = true;
fur.terminals = false;
fur.hidden = false;

var pr = {};
pr.cards = ['WW','WW'];
pr.hidden = false;
pr.num = false;
pr.terminals = false;

var deck = {};


var selIDs = [];
var curSelImg = -1;
var selPhase = -1;
// turn selecting on
selecting = function(img) {
	switch (selPhase) {
		case -1:
			return
		case 0:
			// we are selecting which group
			select1(img);
			break;
		case 1:
			// we're selecting within group
			select2(img);
			break;
	}
	moveS(curSelImg);
}

select1 = function(img) {
	selPhase = 1;
	var sel1 = selIDs[parseInt(img.id[1])-1];
	switch (sel1) {
		case 1:
			//dragons
			setS('dragons');
			break;
		case 5:
			setS('winds');
			break;
		case 9:
			setS('reds');
			break;
		case 18:
			setS('bamboos');
			break;
		case 27:
			setS('circles');
			break;
	}
}

// first level selection
select2 = function(img) {
	selPhase = -1;
	var sel2 = selIDs[parseInt(img.id[1])-1];
	imageVals[curSelImg] = sel2;
	hideS();
	update();
}

startSelecting = function(img) {
	curSelImg = parseInt(img.id);
	selPhase = 0;
	setS('def');
	moveS(curSelImg);
}

moveS = function(num) {
	// shift the selection div, movegroup, according to num
	calcPos = document.getElementById(num).x-(selIDs.length*55/2);

	if (calcPos < 0) { calcPos = 0; }

	document.getElementById("movegroup").style.marginLeft = calcPos + "px";
}

showS = function(num) {
	for(var i=1;i<=num;i++) {document.getElementById("s"+i).hidden=false;}
	for(var i=num+1;i<=9;i++) {document.getElementById("s"+i).hidden=true;}
}

setS = function(group) {
	switch (group) {
		case 'def':
			selIDs = [1,5,9,18,27];
			break;
		case 'dragons':
			selIDs = [0,1,2];
			break;
		case 'winds':
			selIDs = [5,6,7,8];
			break;
		case 'reds':
			selIDs = [9,10,11,12,13,14,15,16,17];
			break;
		case 'bamboos':
			selIDs = [18,19,20,21,22,23,24,25,26];
			break;
		case 'circles':
			selIDs = [27,28,29,30,31,32,33,34,35];
			break;
		case 'default':
			console.log('error');
	}
	showS(selIDs.length);
	for(var i=1;i<=selIDs.length;i++) {
		document.getElementById("s"+i).src = findImage(findVal(selIDs[i-1]));
	}
}
hideS = function() {
	// for(var i=1;i<=9;i++) {document.getElementById("s"+i).show();}
	for(var i=1;i<=9;i++) {document.getElementById("s"+i).hidden=true;}
}


update = function() {
	one.cards = one.cards.sort(); two.cards = two.cards.sort(); thr.cards = thr.cards.sort(); fur.cards = fur.cards.sort(); pr.cards = pr.cards.sort();
	updateSrc();
	updateAll();
	deck.hand = [one, two, thr, fur, pr];
	// printHand();
	getDeckInfo();
	deck.allSuits = getAllSuits();
	score();
	print('<br>');
}

updateSrc = function() {
	for (var i = 0; i < 14; i++) {
		document.getElementById(i.toString()).src = findImage(findVal(imageVals[i]));
	}
}

printHand = function() {
	var pout = 'Hand: ';
	for (var di = 0; di < deck.hand.length; di++) {
		var cards = deck.hand[di].cards;
		for (var ci = 0; ci < cards.length; ci ++) {
			pout = pout + cards[ci] + " ";
		}
		pout = pout + "; "
	}
	print(pout);
}

updateSelf = function(img) {
	startSelecting(img);
}

updateAll = function() {
	one = updateInfo([findVal(imageVals[0]), findVal(imageVals[1]), findVal(imageVals[2])],one.kung,one.hidden);
	two = updateInfo([findVal(imageVals[3]), findVal(imageVals[4]), findVal(imageVals[5])],two.kung,two.hidden);
	thr = updateInfo([findVal(imageVals[6]), findVal(imageVals[7]), findVal(imageVals[8])],thr.kung,thr.hidden);
	fur = updateInfo([findVal(imageVals[9]), findVal(imageVals[10]), findVal(imageVals[11])],fur.kung,fur.hidden);
	pr = updatePr([findVal(imageVals[12]), findVal(imageVals[13])]);
}

updateInfo = function(cards,kung,hidden) {
	dat = {};
	dat.kung=kung;
	dat.hidden=hidden;
	dat.cards = cards;
	// is suited
	if (cards[0][1]==cards[1][1] && cards[0][1]==cards[2][1]) {dat.suited = true;}
	// includes a number
	dat.num = false;
	for (var i = 1; i < 10; i++) {
		if(anyNum(cards,i)) {dat.num=true; break}
	}
	// includes a chi
	dat.chi = dat.num && cards[2][0]==parseInt(cards[1][0])+1 && cards[1][0]==parseInt(cards[0][0])+1;
	// is pung
	dat.pung = dat.suited && cards[0][0]==cards[1][0] && cards[0][0]==cards[2][0];
	// has honors
	dat.honors = !dat.num;
	// has terminals
	dat.terminals = anyNum(cards,1) || anyNum(cards,9);
	// was hidden
	return(dat);
}

updatePr = function(cards) {
	dat = {};
	dat.cards = cards;
	dat.num = false;
	dat.hidden = false;
	dat.terminals = anyNum(cards,1) || anyNum(cards,9);
	for (var i=0; i < 2;i++) {
		if (cards[i][1]=='C' || cards[i][1]=='B' || cards[i][1]=='R') {dat.num=true;}
	}
	return(dat);
}

anyNum = function(cards,num) {
	r = false;
	for (var i=0;i<cards.length;i++) {
		if (cards[i][0]==num) {r = true;}
	}
	return(r);
}
anySuit = function(cards,suit) {
	r = false;
	for (var i=0;i<cards.length;i++) {
		if (cards[i][1]==suit) {r = true;}
	}
	return(r);
}

getDeckInfo = function() {
	var names = ['dragon','wind','bamboo','reds','circles'];
	var character = ['D','W','B','R','C'];
	var kungCount = 0;
	var pungCount = 0;
	var concPungCount = 0;
	var chiCount =0;

	// calculate consecutive pungs
	consecPungs = 0;
	numsuits = [];
	for (var di = 0; di < deck.hand.length-1; di++) {
		if (deck.hand[di].pung) {
			numsuits.push(deck.hand[di].cards[0]);
		}
	}
	numsuits.sort();
	// check for a chi within numsuits
	if ((numsuits.length == 3) &&
	 (parseInt(numsuits[0][0])==parseInt(numsuits[1][0])-1 && parseInt(numsuits[0][0])==parseInt(numsuits[2][0]-2)) &&
	 (numsuits[0][1]==numsuits[1][1] && numsuits[0][1]==numsuits[2][1])) {
			consecPungs = 1;
	} else if (numsuits.length == 4) {
		// have to check both 1 2 3 and 2 3 4
		if ((parseInt(numsuits[0][0])+1==parseInt(numsuits[1][0]) && parseInt(numsuits[0][0])+2==parseInt(numsuits[2][0]) && parseInt(numsuits[0][0])+3==parseInt(numsuits[3][0])) &&
	 (numsuits[0][1]==numsuits[1][1] && numsuits[0][1]==numsuits[2][1] && numsuits[0][1]==numsuits[3][1])) {
			consecPungs = 3;
		}
		else if (((parseInt(numsuits[0][0])+1==parseInt(numsuits[1][0]) && parseInt(numsuits[0][0])+2==parseInt(numsuits[2][0])) &&
	 (numsuits[0][1]==numsuits[1][1] && numsuits[0][1]==numsuits[2][1])) ||
			((parseInt(numsuits[1][0])==parseInt(numsuits[2][0])-1 && parseInt(numsuits[1][0])==parseInt(numsuits[3][0]-2)) &&
	 (numsuits[1][1]==numsuits[2][1] && numsuits[1][1]==numsuits[3][1]))) {
			consecPungs = 2;
		}
	}

	deck.consecPungs = consecPungs;

	for (var ni = 0; ni < names.length; ni++) {
		deck[names[ni] + 'Count'] = 0;
		for (var di = 0; di < deck.hand.length; di++ ) {
			var suits = getSuits(deck.hand[di].cards);
			if (suits.length==1 && suits[0] == character[ni]) {
				deck[names[ni] + 'Count'] = deck[names[ni] + 'Count'] + deck.hand[di].cards.length;
			}
		}
	}

	for (var di = 0; di < deck.hand.length-1; di++) {
		if (deck.hand[di].chi) {chiCount++;}
		if (deck.hand[di].kung) {kungCount++;}
		if (deck.hand[di].pung) {pungCount++;}
		if (deck.hand[di].pung && deck.hand[di].concealed) {concPungCount++;}
	}
	deck.kungCount = kungCount;
	deck.pungCount = pungCount;
	deck.concPungCount = concPungCount;
	deck.chiCount = chiCount;

	// now we get fucking fancy, find identical sequences
	var idCount = 0;
	for (var di = 0; di < deck.hand.length-1; di++) {
		for (var dii = di+1; dii < deck.hand.length-1; dii++) {
			//di is first deck
			//dii is second deck
			if (I(deck.hand[di].cards,deck.hand[dii].cards)) {idCount++;}
		}
	}
	deck.idCount = idCount;

	var terminalPungs = 0;
	var terminalChis = 0;
	var terminalPr = deck.hand[deck.hand.length-1].terminals;
	for (var di = 0; di < deck.hand.length-1; di++) {
		if (deck.hand[di].pung && deck.hand[di].terminals) {terminalPungs++;}
		if (deck.hand[di].chi && deck.hand[di].terminals) {terminalChis++;}
	}
	deck.terminalPungs = terminalPungs;
	deck.terminalChis = terminalChis;
	deck.terminalPr = terminalPr;

	deck.allIdentical = I(deck.hand[0],deck.hand[1]) && I(deck.hand[0],deck.hand[2]) && I(deck.hand[0],deck.hand[2]) && I(deck.hand[0],deck.hand[3]);
}

I = function(a,b) {
	return (a[0]==b[0] && a[1]==b[1] && a[2]==b[2])
}

getAllSuits = function() {
	var allSuits = [];
	for (var i = 0; i < deck.length; i ++) {
		var suits = getSuits(deck.hand[i].cards);
		allSuits = allSuits.concat(suits);
		if (suits.length==1) {
			deck.hand[i].suited = true;
			if (suits[0]=='D' || suits[0]=='W') {
				deck.hand[i].honors = true;
			}
		} else {
			deck.hand[i].suited = false;
			var honors = true;
			for (var i = 0; i < suits.length ; i++) {
				if (!suits[i]=='D' || !suits[i]=='W') {
					honors = false; break
				}
			}
			deck.hand[i].honors = honors;
		}
	}

	return(unique(allSuits));
}

getSuits = function(cards) {
	suitList = [];
	for (var i=0; i < cards.length; i++) {
		suitList.push(cards[i][1]);
	}
	return(unique(suitList));
}

unique = function(array) {
	us = [];
	for (var i = 0; i < array.length; i++) {
		if (us.indexOf(array[i]) == -1) {
			us.push(array[i]);
		}
	}
	return(us);
}

score = function() {
	one = deck.hand[0]; two = deck.hand[1]; thr = deck.hand[2]; fur = deck.hand[3]; pr = deck.hand[4];

	var val = 0;

	var allSuits = unique(getAllSuits);

	if (document.getElementById("wok").checked) {
		print('Win on Kung');
		val = val + 1;
	}
	
	if (document.getElementById("skw").checked) {
		print('Sky Win');
		val = val + 31;
	}
	if (document.getElementById("eaw").checked) {
		print('Earth Win');
		val = val + 31;
	}
	if (document.getElementById("spw").checked) {
		print('Seven Pairs: Not Yet Implemented');
		val = val + 6;
		print('Score: ' + val);
		return(val);
	}
	if (document.getElementById("sew").checked) {
		print('Seabed (last discard)');
		val = val + 2;
	}

	if (document.getElementById("riw").checked) {
		print('Riverbed (last wall tile)');
		val = val + 2;
	}
	if (document.getElementById("ttw").checked) {
		print('Thirteen Terminals');
		val = val + 32;
		print('Score: ' + val);
		return(val);
	}
	// start scoring, check each sequence

	// all chi
	if (one.chi && two.chi && thr.chi && fur.chi) {
		print('All Chi');
		val = val + 1;
	}
	// all concelaed
	if (one.hidden && two.hidden && thr.hidden && fur.hidden && pr.hidden) {
		print('All Concealed');
		val = val + 1;
	}
	// no terminals and no honors
	if (one.num && !one.terminals && two.num && !two.terminals && thr.num && !thr.terminals && fur.num && !fur.terminals && pr.num && !pr.terminals) {
		print('No Terminals or Honors');
		val = val + 1;
	}

	///// ONE SUIT /////

	//Nine gates//
	if (deck.chiCount==3 && pr.terminals) {
		if(false){}
		// print('not functional');
		// nine gates can be formed by: 11 123 345 678 999 or the flip

		// if the pair has terminals, there has to be a pung of terminals
		// if (one.pung && one.terminals | two.terminals)
	}
	//Pure One Suit
	else if (deck.bambooCount==14 || deck.redsCount==14 || deck.circlesCount==14) {
		print('Pure One Suit');
		val = val + 20;
	}
	// One Suit + Terminals
	else {
		var hCount = deck.dragonCount + deck.windCount;
		if ((one.num || two.num || thr.num || pr.num) && (hCount + deck.bambooCount==14 || hCount + deck.redsCount==14 || hCount + deck.circlesCount==14)) {
			// one suit and either dragons or winds
			print('One Suit + Honors');
			val = val + 8;
		}
	}

	///// HONOR TILES /////
	if (deck.dragonCount+deck.windCount==14) {
		print('All Honors');
		val = val + 64
	}
	else {
		// DRAGONS ONLY
		// big three dragons
		if (deck.dragonCount==9) {
			print('The Three Philosophers');
			val = val + 26;
		}
		// small three dragons
		else if (deck.dragonCount==8) {
			print('Small Three Dragons');
			val = val + 6;
		}
		else if ((one.pung && one.honors && (one.suit=='D' || one.cards[0][0]==settings.seat)) || (two.pung && two.honors && (two.suit=='D' || two.cards[0][0]==settings.seat)) || (thr.pung && thr.honors && (thr.suit=='D' || thr.cards[0][0]==settings.seat)) || (fur.pung && fur.honors && (fur.suit=='D' || fur.cards[0][0]==settings.seat))) {
				print('Seat Wind or Dragon Pung');
				val = val + 2;
		}
		// WINDS ONLY
		if (deck.windCount==12) {
			print('Big Four Winds');
			val = val + 80;
		}
		else if (deck.windCount == 11) {
			print('Small Four Winds');
			val = val + 64;
		}
		else if (deck.windCount == 9) {
			print('Big Three Winds');
			val = val + 24;
		}
		else if (deck.windCount == 8) {
			print('Small Three Winds');
			val = val + 5;
		}
	}

	///// PUNGS AND KUNGS /////
	// all kung
	if (deck.kungCount==4) {
		print('All Kung');
		val = val + 90; // note this is 96, but 6 + 90
	} else 	if (deck.concPungCount==4) {
		print('All Concealed Pung');
		val = val + 24;
	}else if (deck.pungCount==4) {
		print('All Pung');
		val = val + 6;
	}

	if (deck.concPungCount==3) {
		print('Three Concealed Pung');
		val = val + 6;
	}
	else if (deck.concPungCount==2) {
		print('Two Concealed Pung');
		val = val + 1;
	}
	
	if (deck.kungCount==3) {
		print('Three Kung');
		val = val + 24;
	}
	else if (deck.kungCount==2) {
		print('Two Kung');
		val = val + 4;
	}
	else if (deck.kungCount==1) {
		print('One Kung');
		val = val +1;
	}

	///// SEQUENCES /////
	if (deck.idCount==6) {
		print('All Identical');
		val = val + 96;
	} else if (deck.idCount==3) {
		print('Three Identical');
		val = val +24;
	} else if (deck.idCount==1) {
		print('Two Identical');
		val = val + 2;
	}

	if (deck.consecPungs==1 || deck.consecPungs==2) {
		print('Three Consecutive Pungs');
		val = val + 20;
	} else if (deck.consecPungs==3) {
		print('Four Consecutive Pungs');
		val = val +40;
	}

	///// CONSECUTIVE SETS /////
	if (deck.chiCount >= 3) {
		//we have 3 chis and at least 9 of one suit, check for 1->9
		var tList = [];
		var suit = '';

		if (deck.bamboosCount >= 9) {
			suit = 'B';
		} else if (deck.redsCount >= 9) {
			suit = 'R';
		} else if (deck.circlesCount >= 9) {
			suit = 'C';
		}

		if (suit != '') {
			for (var di=0; di < 4; di++) {
				if (deck.hand[di].chi && deck.hand[di].cards[0][1]==suit) {
					tList = tList.concat(deck.hand[di].cards);
				}
			}

			var find19 = [0,0,0,0,0,0,0,0,0]
			for (var ti=0; ti < tList.length; ti++) {
				tList[ti] = parseInt(tList[ti][0]);
				find19[tList[ti]-1] = 1;
			}

			if (all(find19)) {
				print('Nine Tile Straight');
				val = val + 8;
			}
		}
	}

	///// TERMINALS /////
	if (deck.terminalPungs == 4 && deck.terminalPr) {
		print('All Terminals');
		val = val + 80;
	} else if (one.pung && two.pung && thr. pung && fur.pung && (one.terminals || one.honors) && (two.honors || two.terminals) && (thr.honors || thr.terminals) && (fur.honors || fur.terminals) && (pr.terminals || pr.honors)) {
		// terminal + honors
		print('All Terminals + Honors');
		val = val + 20;
	} else if (one.terminals && two.terminals && thr.terminals && fur.terminals && pr.terminals) {
		// all include terminals
		print('All Sets Include Terminals');
		val = val + 10;
	} else if ((one.terminals || one.honors) && (two.terminals || two.honors) && (thr.terminals || thr.honors) && (fur.terminals || fur.honors) && (pr.terminals || pr.honors)) {
		// all sets include terminals + honors
		print('All Sets Include Terminals or Honors');
		val = val + 8;
	}

	if (val==0) {
		print('Chicken Hand');
		val = val + 1;
	}
	print('Score: ' + val);
	return(val);
}

all = function(array) {
	var ret = true;
	for (var i = 0; i < array.length; i++) {
		if (!array[i]) {ret = false; return(ret);}
	}
	return(ret);
}

any = function(array) {
	var ret = false;
	for (var i = 0; i < array.length; i++) {
		if (array[i]) {ret = true; return(ret);}
	}
	return(ret);
}

var rotator = [0,0,0,0];
var rotImages = ["images/none.png","images/hidden.png","images/kung.png","images/hkung.png"];
var hArray = [false, true, false, true];
var kArray = [false, false, true, true];
rotate = function(num) {
	rotator[num] = (rotator[num]+1) % 4;
	document.getElementById("r" + num).src = rotImages[rotator[num]];
	switch(num) {
		case 0:
			one.hidden = hArray[rotator[num]];
			one.kung = kArray[rotator[num]];
			break;
		case 1:
			two.hidden = hArray[rotator[num]];
			two.kung = kArray[rotator[num]];
			break;

		case 2:
			thr.hidden = hArray[rotator[num]];
			thr.kung = kArray[rotator[num]];
			break;

		case 3:
			fur.hidden = hArray[rotator[num]];
			fur.kung = kArray[rotator[num]];
			break;
	}
	update();
}

disp = function(tArray) {
	var html = '';
	for (var i = tArray.length-1; i > 0; i-- ){
		html = html + tArray[i] + "<br>";
	}
	document.getElementById('output').innerHTML = html;
}

var cText = []; var mL = 14;
print = function(text) {
	if (settings.verbose) {
		cText.push(text);
		while (cText.length > mL) {
			cText.shift();
		}
		disp(cText);
	}
	log.push(text);
}

update();
hideS();