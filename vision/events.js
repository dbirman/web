// Events code -- load the .json file and parse it, then add the appropriate modal windows
// and upcoming / past events

var events = [
	{
		"title":"A potential source of saliency in the primate brain",
		"author":"Marc Zirnsak",
		"date":"2018/04/25",
		"info":"Postdoc, Moore Lab, Stanford",
		"image":"default",
		"abstract":"The selection of visual signals for further cortical processing is determined by the saliency of their corresponding stimuli, that is, their relative distinctiveness to other stimuli. Despite the importance of stimulus saliency in driving signal selection, the neural mechanisms underlying the computation of saliency in the primate brain are still poorly understood. I will present results of an ongoing series of experiments which point towards a causal role of parietal structures in the computation of saliency."
	},
];

window.onload = function() {
	cDate = new Date(Date.now());
	// parse events
	for (let ei = 0; ei<events.length; ei++) {
		let e = events[ei],
			eDate = new Date(events[ei].date);

		if (eDate.valueOf()>cDate.valueOf()) {
			console.log('Date is in the future');

		} else {
			console.log('Date is in the past');
		}
	}
}

function createModal(event) {
	// create a new modal and append to body
}