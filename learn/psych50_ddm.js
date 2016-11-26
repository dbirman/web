
// Cannonball variables
var y0 = 0,
	vy = 49,
	ay = -9.8;

var x0 = 0,
	vx = 1,
	ax = 0;

// Equations
var time = divide(range(0,50),10);

function textarea1(e) {
	var key = window.event.keyCode;
	if (key===13) {
		e.preventDefault();
		eval(document.getElementById('textarea1').value);
		drawPlot1();
	}
}

function quadratic(t) {
	x = add(add(x0,multiply(vx,t)),multiply(ax,pow(t,2)));
	y = max(0,add(add(y0,multiply(vy,t)),multiply(ay,pow(t,2))));
	return {x,y}
}

function drawPlot1() {
	var out = quadratic(time);
	trace = {
		x: out.x,
		y: out.y,
		mode:'markers',
		type:'scatter'
	}
	layout.title = 'Cannonball height over time';
	Plotly.newPlot('plot1',[trace],layout);
}

function run(i) {
	// Runs each time a block starts incase that block has to do startup
	switch(i) {
		
 }
}

function launch_local() {
	drawPlot1();
	katex.render("y(t)=y_{0}+v_{y}t+\\frac{1}{2}at^{2}",document.getElementById("katex1"),{displayMode:true});
	katex.render("y(t)=y_{0}+v_{y}t+\\frac{1}{2}at^{2}",document.getElementById("katex2"),{displayMode:true});	
}