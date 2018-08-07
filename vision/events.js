// Events code -- load the .json file and parse it, then add the appropriate modal windows
// and upcoming / past events

var events = [
	{
		"title":"TBA",
		"link":"TBA",
		"author":"Sonia Poltoratski",
		"type":"Journal Club",
		"date":"2018/08/22",
		"abstract":""
	},
	{
		"title":"TBA",
		"author":"Justin Gardner",
		"type":"Talk",
		"date":"2018/08/29",
		"info":"Dept of Psychology, Stanford",
		"image":"gardner.jpg",
		"abstract":""
	},
	{
		"title":"Interpreting Deep Neural Networks by Explaining their Predictions",
		"author":"Wojciech Samek",
		"type":"Talk",
		"date":"2018/08/09",
		"info":"FHI Berlin",
		"image":"samek.jpg",
		"abstract":"Deep neural networks (DNNs) are reaching or even exceeding the human level on an increasing number of complex tasks. However, due to their complex non-linear structure, these models are usually applied in a black box manner, i.e., no information is provided about what exactly makes them arrive at their predictions. This lack of transparency can be a major drawback in practice. In my talk I will present a general technique, Layer-wise Relevance Propagation (LRP), for interpreting DNNs by explaining their predictions. I will demonstrate the effectivity of LRP when applied to various datatypes (images, text, audio, video, EEG/fMRI signals) and neural architectures (ConvNets, LSTMs), and will summarize what we have learned so far by peering inside these black boxes."	
	},
	{
		"title":"Applications of deep learning to clinical vision care",
		"author":"Rory Sayres",
		"type":"Talk",
		"date":"2018/08/08",
		"info":"Google Brain",
		"image":"sayres.jpg",
		"abstract":"I will describe some work from Google Brain, a research group within Google, on topics in ophthalmology. Retinal fundus images are a widespread method of assessing eye health, and can detect a range of health issues. These include complications of diabetes such as diabetic retinopathy (DR), which has a high prevalence (up to 30% of diabetic populations) and is a leading cause of blindness worldwide. Using deep learning methods, our team developed and validated models to predict DR severity with doctor-level accuracy. We are using these models to assist screening programs to increase health care access. I will also describe research using these models to assist clinicians. Touching on recent work in developing interpretable models, I will show conditions in which a clinician plus a model is more accurate than either alone."	
	},
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
		"info":"PhD Student, Huk Lab, UT Austin",
		"image":"bonnen.jpeg",
		"abstract":"Much is known about how retinal stimulation is processed through later stages of the visual system. But understanding the meaning of these cortical activity patterns for making inferences about the dynamic three-dimensional environment is a distinct computational problem. We show that treating patterns of retinal stimulation as proxies for the visual world oversimplifies the problem of how neural activity can be read out to infer the properties of the environment. This is because the projection of the environment onto the two retinas fundamentally shapes the information available in the tuning and responses of cortical neurons. In the case of three-dimensional (3D) motion this environment-to-retinae perspective predicts non-canonical shapes of neuronal tuning functions. These non-canonical shapes are consistent with existing electrophysiological recordings in middle temporal area (MT) and explain unintuitive misperceptions of 3D motion in existing psychophysical data."	
	},
	{
		"date":"2018/05/23",
		"type":"Open"
	},
	{
		"title":"Dissonant Representations of Visual Space in Prefrontal Cortex during Eye Movements",
		"author":"Xiaomo Chen",
		"type":"Talk",
		"date":"2018/05/16",
		"info":"Postdoc, Moore Lab, Stanford",
		"image":"xiaomo.jpeg",
		"abstract":"TBA"	
	},
	{
		"title":"TBA",
		"author":"Guillaume Riesen",
		"type":"Talk",
		"date":"2018/05/29",
		"info":"PhD Student, Gardner Lab, Stanford",
		"image":"riesen_guillaume.jpg",
		"abstract":"TBA"	
	},
	{
		"title":"Image reconstruction by domain-transform manifold learning",
		"link":"https://www.nature.com/articles/nature25988",
		"author":"Elias Wang",
		"type":"Journal Club",
		"date":"2018/06/06",
		"abstract":"Image reconstruction is essential for imaging applications across the physical and life sciences, including optical and radar systems, magnetic resonance imaging, X-ray computed tomography, positron emission tomography, ultrasound imaging and radio astronomy1,2,3. During image acquisition, the sensor encodes an intermediate representation of an object in the sensor domain, which is subsequently reconstructed into an image by an inversion of the encoding function. Image reconstruction is challenging because analytic knowledge of the exact inverse transform may not exist a priori, especially in the presence of sensor non-idealities and noise. Thus, the standard reconstruction approach involves approximating the inverse function with multiple ad hoc stages in a signal processing chain4,5, the composition of which depends on the details of each acquisition strategy, and often requires expert parameter tuning to optimize reconstruction performance. Here we present a unified framework for image reconstruction—automated transform by manifold approximation (AUTOMAP)—which recasts image reconstruction as a data-driven supervised learning task that allows a mapping between the sensor and the image domain to emerge from an appropriate corpus of training data. We implement AUTOMAP with a deep neural network and exhibit its flexibility in learning reconstruction transforms for various magnetic resonance imaging acquisition strategies, using the same network architecture and hyperparameters. We further demonstrate that manifold learning during training results in sparse representations of domain transforms along low-dimensional data manifolds, and observe superior immunity to noise and a reduction in reconstruction artefacts compared with conventional handcrafted reconstruction methods. In addition to improving the reconstruction performance of existing acquisition methodologies, we anticipate that AUTOMAP and other learned reconstruction approaches will accelerate the development of new acquisition strategies across imaging modalities."	
	},
	{
		"title":"TBA",
		"author":"Hsin-hung Li",
		"type":"Talk",
		"date":"2018/06/13",
		"info":"PhD Student, Moore Lab, Stanford",
		"image":"default.jpg",
		"abstract":"TBA"	
	},
	{
		"title":"Set summary perception, outlier pop out, and categorization: a common underlying computation?",
		"author":"Shaul Hochstein",
		"type":"Talk",
		"date":"2018/06/20",
		"info":"Professor, Hebrew University of Jerusalem",
		"image":"hochstein.jpg",
		"abstract":"TBA"	
	},
];

window.onload = function() {
	cDate = new Date(Date.now());
	let thisweek = [];
	let upcoming = [];
	let past = [];
	let archive = [];
	// parse events by date and sort into upcoming and past
	for (let ei = 0; ei<events.length; ei++) {
		let e = events[ei],
			eDate = new Date(events[ei].date);

		let eV = eDate.valueOf()/1000/60/60/24;
		let cV = cDate.valueOf()/1000/60/60/24;
		if (eDate.valueOf()>cDate.valueOf()) {
			if (eV<(cV+7)) {
				console.log('Date is within one week');
				thisweek.unshift(e);
			} else {
				console.log('Date is in the future');
				upcoming.push(e);
			}
		} else if (e.type.toLowerCase()!="open") {
			if (eV<(cV-90)) {
				console.log('Date is more than 3 months past');
				archive.push(e);
			} else {
				console.log('Date is within 3 months');
				past.unshift(e);
			}
		}
	}
	// 
	for (let ei = 0; ei<thisweek.length; ei++) {
		let e = thisweek[ei],
			eDate = new Date(thisweek[ei].date);
		buildEvent(e,eDate,'thisweek');
	}
	// build upcoming events
	for (let ei = 0; ei<upcoming.length; ei++) {
		let e = upcoming[ei],
			eDate = new Date(upcoming[ei].date);
		buildEvent(e,eDate,'upcoming');
	}
	// build past events
	for (let ei = 0; ei<past.length; ei++) {
		let e = past[ei],
			eDate = new Date(past[ei].date);
		buildEvent(e,eDate,'past');
	}
	// archive
	for (let ei = 0; ei<archive.length; ei++) {
		let e = archive[ei],
			eDate = new Date(archive[ei].date);
		archiveEvent(e,eDate);
	}
}

function archiveEvent(e,eDate) {
	let table = document.getElementById("archive_table");

	row = table.insertRow(1);

	let date = row.insertCell(0);
	date.innerHTML = eDate.toDateString();
	let speaker = row.insertCell(1);
	speaker.innerHTML = e.author;
	let title = row.insertCell(2);
	title.innerHTML = e.title;

	row.style.borderBottom = "1px solid";
	row.style.borderTop = "1 px solid";
	row.style.borderCollapse = "collapse";
}

function buildEvent(e,eDate,type) {
	let info = createInfo(e,eDate);
	let temp_div = document.createElement('div');
	if (e.type=='Talk') {
		let modal_id = createModal(e,eDate);
		temp_div.onclick = function() {openModal(modal_id);}
		temp_div.setAttribute("class", "info");
	} else if (e.type=='Journal Club') {
		temp_div.onclick = function() {window.open(e.link,"_self");}
		temp_div.setAttribute("class", "info");
	} else {
		temp_div.setAttribute("class", "info-open");
	}
	temp_div.id = e.date;
	temp_div.innerHTML = info;

	document.getElementById(type).appendChild(temp_div);
	document.getElementById(type).appendChild(document.createElement('br'));
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
	} else if (event.type=="Journal Club") {
		str = str.concat('<div class="info_left"></div>')
		// Add title
		str = str.concat('<div class="info_right">')
		str = str.concat('<h4>Journal club: '+event.title+'</h4>');
		if (event.time!=undefined) {
			str = str.concat('<h5>'+eDate.toDateString()+' - '+event.time+'</h5>');
		} else {
			str = str.concat('<h5>'+eDate.toDateString()+' - 9:30 AM</h5>');
		}
		str = str.concat('<br>')
		str = str.concat('<h5>Journal club led by '+event.author+'</h5>')
		str = str.concat('</div>');
	} else {
		// Create left div (img)
		str = str.concat('<div class="info_left">'+
			'<img class="info_img" src="./imgs/'+event.image+'"/>'
			+'</div>')
		// Add title
		str = str.concat('<div class="info_right">')
		str = str.concat('<h4>'+event.title+'</h4>');
		if (event.time!=undefined) {
			str = str.concat('<h5>'+eDate.toDateString()+' - '+event.time+'</h5>');
		} else {
			str = str.concat('<h5>'+eDate.toDateString()+' - 9:30 AM</h5>');
		}
		str = str.concat('<br>')
		str = str.concat('<h5>'+event.author+'</h5>')
		str = str.concat('</div>');
	}

	return str;
}

function createModal(event,eDate) {
	let id = Math.round(Math.random() * 100000000);
	console.log('Creating modal with id: ' + id);
	// create a new modal and append to body
	let modal_div = document.createElement('div');
	modal_div.setAttribute("class","modal");
	modal_div.setAttribute("id",id);

	let str = '';

	str = str.concat('<div class="modal-content fifty">')
	str = str.concat('<span class="close">&times;</span>')
	str = str.concat('<br>')
	// str = str.concat('<div class="modal-content-info">')
	str = str.concat('<h1>'+event.title+'</h1>')
	str = str.concat('<img class="modal-img" src="./imgs/'+event.image+'"/>')
	if (event.time!=undefined) {
		str = str.concat('<h5>'+eDate.toDateString()+' - '+event.time+'</h5>');
	} else {
		str = str.concat('<h5>'+eDate.toDateString()+' - 9:30 AM</h5>');
	}
	str = str.concat('<h5>Jordan Hall (Building 420), Room 419</h5>')
	str = str.concat('<h2>'+event.author+'</h2>')
	str = str.concat('<h5>Presenter Affiliation: '+event.info+'</h5>')
	str = str.concat('<h2>Abstract</h2>')
	str = str.concat('<p>'+event.abstract+'</p>')
	// str = str.concat('</div>')
	// str = str.concat('<div class="modal-content-img">')
	// str = str.concat('</div>')
	str = str.concat('</div>')

	modal_div.innerHTML = str;

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