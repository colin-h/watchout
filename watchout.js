// start slingin' some d3 here.
 //  _              _
 // | |__     ___  | |  _ __     ___   _ __   ___
 // | '_ \   / _ \ | | | '_ \   / _ \ | '__| / __|
 // | | | | |  __/ | | | |_) | |  __/ | |    \__ \
 // |_| |_|  \___| |_| | .__/   \___| |_|    |___/
 //                    |_|

//create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", 1600) //1600
            .attr("height", 800); //800

//DATA
var enemyData = [50, 100, 150, 200, 250, 300, 350, 400, 500, 700, 950,1200],
    playerData = [{x:400, y:500, color:'#2F3640'}];

//Drag Method
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

var calcDist = function(x2,x1,y2,y1){
  return Math.sqrt( Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}

// ---------------------------------------------------------------------------------

// Creates Enemies
var enemies = svg.selectAll(".enemy")
  .data(enemyData)
  .enter()
  .append("circle")
  .classed("enemy", true)
  .attr("cx", function(d) {return d;})
  .attr("cy", 25)
  .attr("r", 15)

//Create Draggable Player
var player = svg.selectAll(".player")
  .data(playerData)
  .enter()
  .append("circle")
  .classed("player", true)
  .attr("fill", function(d) {return d.color})
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y})
  .attr("r", 20)
  .call(drag)

// ---------------------------------------------------------------------------------

// ANIMATION
setInterval(function() {
  d3.selectAll(".enemy")
  .transition()
  .duration(1000)
  .each(function() {
    d3.select(this).transition()
      .attr("cx", generatePosition())
      .attr("cy", generatePosition())
      // creat squares to test where dots have been
      svg.append("rect").attr("width", 20).attr("height", 20).attr("fill", "blue")
        .attr("x", d3.select(this).attr("cx"))
        .attr("y", d3.select(this).attr("cy"))
  });
}, 800)

//Detect Collisions
//setInterval to constantly check distances
setInterval(function() {
  d3.selectAll(".enemy")
  .each(function() {
    var thisEnemy = d3.select(this);
    // check distances
    var distBetweenTwo = calcDist(thisEnemy.attr("cx"), player.attr("cx"), thisEnemy.attr("cy"), player.attr("cy"))
    //if dots hit
    if (distBetweenTwo < 35) {
      //counts as collision
      debugger;
      //update scoreboard
      //flash svg
    }

  });
}, 20)

// var currentPlayerXPosition = player.attr("cx");
// var currentEnemyXPosition = d3.select(this).attr("cx");

// returns mouse coordinates at any moment
// svg.on("mousemove",function(){var position = d3.mouse(this)});
