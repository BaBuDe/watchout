// start slingin' some d3 here.
// Create function to genenrate  random data points (positsions)
//  produce an array
// D3 functions
// Create dots
// make them show up
//  d3 to the rescue  here
//  These will deal with relationship between dots and data
//  enter
//  update
//  exit
//
var coords = function () {
  var dataArray = [];

  for (var i = 0; i < 50; i++) {
    dataArray.push({"x": Math.random() * window.innerWidth, "y": Math.random() * window.innerHeight});
  }
	return dataArray;
};

var board = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

var render = function(callback)   {
  // var enemy = board.selectAll("circle").data(coords).enter().append("circle").attr("cx", function(d) {return d.x;}).attr("cy", function(d) { return d.y;}).attr("r", 10);
  callback = coords || coords();

  var enemy = board.selectAll("circle").data(coords);

  enemy.attr("cx", function(d) {return d.x;})
  		.attr("cy", function(d) {return d.y;})
  		.attr("r", 10);

	enemy.enter().append("circle")
			.attr("cx", function(d) {return d.x;})
			.attr("cy", function(d) {return d.y;})
			.attr("r", 10);

  setTimeout(render, 1000);
};

// setInterval(function() {render(coords())}, 100)

render();

//*****************************

// var boardWidth = window.innerWidth;
// var boardHeight = window.innerHeight;

// gameStats = {
// 	currentScore: 0,
// 	highScore: 0
// }

// //CVG container we'll attach enemies to
// var svg = d3.select('body').append("svg")
// 		.attr('width', boardWidth)
// 		.attr('height', boardHeight);

// //make enemies
// var enemyCircles = d3.range(50).map(function() {return {
// 	r: 10,
// 	cx: Math.random() * innerWidth,
// 	cy: Math.random() * innerHeight,
// 	}
// });

// //make player

// 	var player = svg.append("circle")
// 			.attr("class", "player")
// 			.attr("cx", enemyCircles[0].cx)
// 			.attr("cy", enemyCircles[0].cy)
// 			.attr("r", 10)
// 			.attr("fill", "purple")

// //place enemies every second
// setInterval(function() {
// 	for (var i = 1; i < enemyCircles.length; i++) {
// 	svg.append('circle')
// 		.attr("cx", enemyCircles[i].cx)
// 		.attr("cy", enemyCircles[i].cy)
// 		.attr("r", enemyCircles[i].r)
// 		.style("fill", "green");
//   }
// }, 200);

// //update the score
// var updateScore = function() {
// 	return d3.select('.current').text(gameStats.score.toString());
// };

// //update the high score
// var updateScore = function() {
// 	if (gameStats.score > gameStats.bestScore) {
// 		gameStats.bestScore = gameStats.score;
// 	}
// 	return d3.select('.high').text(gameStats.highScore.toString());
// };

// //make a drag function
// var dragMove = function(d) {
// 	d3.select(this)
// 		.attr("y", d3.event.y)
// 		.attr("x", d3.event.x)
// }

// var drag = d3.behavior.drag();

// d3.select(".player").call(drag);








