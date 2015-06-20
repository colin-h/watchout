// start slingin' some d3 here.

//create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", 1600) //1600
            .attr("height", 800); //800


var circlePositionData = [50, 100 /*150, 200, 250, 300, 350, 400, 500, 700, 950,1200*/]

var drag = d3.behavior.drag()
             .on("dragstart", function(){ player.attr("fill", "#6D7D94"); })
             .on("drag", function() { d3.select(".player")
                          .attr("cx", d3.event.x)
                          .attr("cy", d3.event.y); })
             .on("dragend", function() {player.attr("fill", "#2F3640")});

var generatePosition = function() {
  pos = Math.random()*900
  return pos
}

// creates enemy circles
var enemies = svg.selectAll(".enemy")
  .data(circlePositionData)
  .enter()
  .append("circle")
  .classed("enemy", true)
  .attr("cx", function(d) {return d;})
  .attr("cy", 25)
  .attr("r", 15)


// repeats movement animation
setInterval(function() {
  d3.selectAll(".enemy")
  .transition()
  .duration(1000)
  .each(function() {
    d3.select(this).transition()
      .attr("cx", generatePosition())
      .attr("cy", generatePosition())
  });
}, 800)



//create player, give it draggable attribute
var playerData = [{x:400, y:500, color:'#2F3640'}];

var player = svg.selectAll("player")
  .data(playerData)
  .enter()
  .append("circle")
  .classed("player", true)
  .attr("fill", function(d) {return d.color})
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y})
  .attr("r", 20)
  .call(drag)

var position = [playerData[0].x, playerData[0].y]

var calcDist = function(x1,y1,x2,y2){
  return Math.sqrt( Math.pow((x2 - x1), 2) - Math.pow((y2 - y1), 2))
}

// returns mouse coordinates at any moment
// svg.on("mousemove",function(){var position = d3.mouse(this)})

//detect collisions
//setInterval every couple of ms
  //run a function that checks each enemy attrs cx cy
  //if the abs value of position of enemy - position of circle < radius of player,
    //counts as collision
setInterval(function() {
  d3.selectAll(".enemy")
  .each(function() {
    var thisEnemy = d3.select(this);
    var distBetweenTwo =calcDist(thisEnemy.attr("cx"), player.attr("cx"), thisEnemy.attr("cy"), player.attr("cy"))
    if (distBetweenTwo < 10) {
      console.log(distBetweenTwo)
      //update scoreboard
      //flash red
    }

  });
},10)

// var currentPlayerXPosition = player.attr("cx")
// var currentEnemyXPosition = d3.select(this).attr("cx")
