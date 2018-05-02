// Events code -- load the .json file and parse it, then add the appropriate modal windows
// and upcoming / past events

var events = [
	{
		"title":"Visual communication in context",
		"author":"Judith E. Fan",
		"type":"Talk",
		"date":"2017/10/04",
		"info":"Postdoc, Goodman/Yamins Labs, Stanford",
		"image":"fan.jpg",
		"abstract":"Communication is central to the success of our species: it allows us to learn from each other, coordinate our actions, and express otherwise hidden thoughts. Critically, human communication goes beyond language production — humans also express their ideas in visual form. Visual communication lies at the heart of key innovations, and forms the foundation for the cultural transmission of knowledge and higher-level reasoning. My recent work examines drawing, the most basic form of visual communication. Communicative uses of drawing pose a core challenge for theories of vision and communication alike: they require a detailed understanding of how sensory information is encoded and how social context guides what information is relevant to communicate. Our strategy for addressing this challenge is to combine high-performing computational models of vision with formal Bayesian models of social reasoning during communication in order to explain how people flexibly adapt their drawings according to the current context. In this talk, I will briefly review my prior work, describe our current experimental and modeling approach in more detail, and summarize some of our preliminary results. In the long run, understanding the computational basis of visual communication may shed light on the nature of human visual abstraction and the sources of variation in pictorial style."	
	},
	{
		"title":"A potential source of saliency in the primate brain",
		"author":"Marc Zirnsak",
		"type":"Talk",
		"date":"2018/04/25",
		"info":"Postdoc, Moore Lab, Stanford",
		"image":"default.jpg",
		"abstract":"The selection of visual signals for further cortical processing is determined by the saliency of their corresponding stimuli, that is, their relative distinctiveness to other stimuli. Despite the importance of stimulus saliency in driving signal selection, the neural mechanisms underlying the computation of saliency in the primate brain are still poorly understood. I will present results of an ongoing series of experiments which point towards a causal role of parietal structures in the computation of saliency."
	},
	{
		"title":"Flexible readout of stable cortical representations support motion visibility perception",
		"author":"Daniel Birman",
		"type":"Talk",
		"date":"2018/05/02",
		"info":"PhD Student, Gardner Lab, Stanford",
		"image":"birman.jpg",
		"abstract":"The cortical representations of two component features of motion visibility, contrast and coherence, are intertwined in cortical space and use similar representational codes. How such similar overlapping stimulus representations are read out during perceptual discrimination of a single feature, especially when task context must remain flexible, remains unclear. Observers tasked with reporting about either motion visibility feature do so without interference from the other feature and can unexpectedly remap their reports. To reconcile these perceptual observations with the physiology we test the hypothesis that the visual system might take advantage of small differences in feature sensitivity across cortex to separate motion contrast and coherence during readout. We find that this linking model predicts that sensory enhancement is not necessary to direct attention toward a single feature. Instead our results suggest the existence of a flexible readout mechanism which allows cortical representations to remain stable even as task context shifts."	
	},
	{
		"title":"Encoding and decoding 3D motion",
		"author":"Kathryn Bonnen",
		"type":"Talk",
		"date":"2018/05/09",
		"info":"PhD Student, Huk Lab, Stanford",
		"image":"bonnen.jpeg",
		"abstract":"Much is known about how retinal stimulation is processed through later stages of the visual system. But understanding the meaning of these cortical activity patterns for making inferences about the dynamic three-dimensional environment is a distinct computational problem. We show that treating patterns of retinal stimulation as proxies for the visual world oversimplifies the problem of how neural activity can be read out to infer the properties of the environment. This is because the projection of the environment onto the two retinas fundamentally shapes the information available in the tuning and responses of cortical neurons. In the case of three-dimensional (3D) motion this environment-to-retinae perspective predicts non-canonical shapes of neuronal tuning functions. These non-canonical shapes are consistent with existing electrophysiological recordings in middle temporal area (MT) and explain unintuitive misperceptions of 3D motion in existing psychophysical data."	
	},
	{
		"date":"2018/05/23",
		"type":"Open"
	}
];

window.onload = function() {
	cDate = new Date(Date.now());
	let upcoming = [];
	let past = [];
	// parse events by date and sort into upcoming and past
	for (let ei = 0; ei<events.length; ei++) {
		let e = events[ei],
			eDate = new Date(events[ei].date);
		if (eDate.valueOf()>cDate.valueOf()) {
			console.log('Date is in the future');
			upcoming.push(e);
		} else {
			console.log('Date is in the past');
			past.unshift(e);
		}
	}
	// build upcoming events
	for (let ei = 0; ei<upcoming.length; ei++) {
		let e = upcoming[ei],
			eDate = new Date(upcoming[ei].date);
		buildEvent(e,eDate);
	}
	// build past events
	for (let ei = 0; ei<past.length; ei++) {
		let e = past[ei],
			eDate = new Date(past[ei].date);
		buildEvent(e,eDate);
	}
}

function buildEvent(e,eDate) {
	let info = createInfo(e,eDate);
	let temp_div = document.createElement('div');
	let modal_id = createModal(e);
	temp_div.onclick = function() {openModal(modal_id);}
	temp_div.setAttribute("class", "info");
	temp_div.id = e.date;
	temp_div.innerHTML = info;

	if (eDate.valueOf()>cDate.valueOf()) {
		console.log('Date is in the future');
		document.getElementById("upcoming").appendChild(temp_div);
		document.getElementById("upcoming").appendChild(document.createElement('br'));
	} else {
		console.log('Date is in the past');
		document.getElementById("past").appendChild(temp_div);
		document.getElementById("past").appendChild(document.createElement('br'));
	}
}

function createInfo(event,eDate) {
	let str = '';

	if (event.type=="Open") {
		// set just the header
		str = str.concat('<div class="info_open">')
		str = str.concat('<br>');
		str = str.concat('<h5>'+eDate.toDateString()+'</h5>');
		str = str.concat('<h5>Open date: email <a href="mailto:danbirman@gmail.com">Dan</a> or <a href="mailto:mareikegrotheer@gmail.com">Mareike</a> if you are interested in presenting.</h5>')
		str = str.concat('</div>');
	} else {
		// Create left div (img)
		str = str.concat('<div class="info_left">'+
			'<img class="info_img" src="./imgs/'+event.image+'"/>'
			+'</div>')
		// Add title
		str = str.concat('<div class="info_right">')
		str = str.concat('<h4>'+event.title+'</h4>');
		str = str.concat('<h5>'+eDate.toDateString()+'</h5>')
		str = str.concat('<br>')
		str = str.concat('<h5>'+event.author+'</h5>')
		str = str.concat('</div>');
	}

	return str;
}

function createModal(event) {
	let id = Math.round(Math.random() * 100000000);
	console.log('Creating modal with id: ' + id);
	// create a new modal and append to body
	let modal_div = document.createElement('div');
	modal_div.setAttribute("class","modal");
	modal_div.setAttribute("id",id);

	let str = '';

	str = str.concat('<div class="modal-content fifty">')
	str = str.concat('<span class="close">&times;</span>')
	str = str.concat('<p>temp</p>')
	str = str.concat('</div>')

	document.body.appendChild(modal_div);

	return id;
}


// <div id="temp" class="modal">

//   <!-- Modal content -->
//   <div class="modal-content sixty">
//     <span class="close">&times;</span>
//   </div>
// </div>

//// modal stuff

function openModal(id) {
	console.log('Opening: ' + id);
	document.getElementById(id).style.display='block';
}

window.onclick = function(event) { closeCheck(event); }
window.ontouchstart = function(event) {closeCheck(event); }

function closeCheck(event) {
	target = event.target;
	if ((event.target.className == "close") || (event.target.className== "modal-content-big")) {
    	// chain parentElements until you find the modal
    	var parent = event.target.parentElement;
    	while (parent.className!="modal") {
    		parent = parent.parentElement;
    	}
    	parent.style.display = "none";
    }
    if (event.target.className == "modal") {
    	event.target.style.display = "none";
    }
}