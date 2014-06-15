// start slingin' some d3 here.
gameStats = {
	currentScore: 0,
	highScore: 0,
	collisions: 0
}

var updateCollisions = function() {
	return d3.select('.collisions').text('Collisions: ' + gameStats.collisions.toString());
};

var updateScore = function() {
	return d3.select('.current').text('Score: ' + gameStats.currentScore.toString());
};

var updateHighScore = function() {
  gameStats.highScore = Math.max(gameStats.currentScore, gameStats.highScore);
	return d3.select('.high').text('High score: ' + gameStats.highScore.toString());
};

var getCoordinates = function () {
  var dataArray = [];

  for (var i = 0; i < 50; i++) {
    dataArray.push({"x": Math.random() * window.innerWidth, "y": Math.random() * window.innerHeight});
  }
	return dataArray;
};

var board = d3.select("body").append("svg")
		.attr("width", window.innerWidth)
		.attr("height", window.innerHeight);

var enemy = board.selectAll("circle.enemy").data(getCoordinates())
		.enter().append("circle")
		.attr("cx", function(d) {return d.x;})
		.attr("cy", function(d) {return d.y;})
		.attr("r", 10)
		.attr("fill", "blue")
		.attr("class", "enemy");

var move = function(coordinates) {
	var newCoordinates = coordinates || getCoordinates();
  enemy.data(newCoordinates)
    .transition()
    .duration(1000)
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;})
  detectCollisions();
  updateScore();
  updateHighScore();
}
setInterval(move, 1000);


var player = board.append("circle")
	.attr("fill", "red")
	.attr("class", "playerDot")
	.attr("cx", Math.random() * window.innerWidth)
	.attr("cy", Math.random() * window.innerHeight)
	.attr("r", 10);

var dragMove = function() {
	d3.select(this)
		.attr("cy", d3.event.y)
		.attr("cx", d3.event.x)
  detectCollisions();
}
var drag = d3.behavior.drag().on("drag", dragMove);
d3.select(".playerDot").call(drag);


var intersects = function(x1, y1, r1, x2, y2, r2) {
  var xDist = x1 - x2;
  var yDist = y1 - y2;
  var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  return dist < r1 + r2;
};


// So, detects collisions, but only gets called when dragging mouse, or (I
// beleve) at the endpoint of a transition. Need to figure out how to do the
// calculations *during* the transition, though that'll probably be
// computationally intensive
var detectCollisions = function() {
  var collision = false;
  enemy.each(function() {
    var enemy = d3.select(this);
    var enemyX = enemy[0][0].cx.animVal.value;
    var enemyY = enemy[0][0].cy.animVal.value;
    var enemyR = enemy[0][0].r.animVal.value;
    var playerX = player[0][0].cx.animVal.value;
    var playerY = player[0][0].cy.animVal.value;
    var playerR = player[0][0].r.animVal.value;
    if (intersects(enemyX, enemyY, enemyR, playerX, playerY, playerR)) {
      gameStats.collisions++;
      updateCollisions();
      updateHighScore();
      gameStats.currentScore = 0;
      updateScore();
    }
  });
};

var increaseScore = function() {
  gameStats.currentScore++;
  updateScore();
};
setInterval(increaseScore, 50);
