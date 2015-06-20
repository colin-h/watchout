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
            .attr("width", 800) //1600
            .attr("height",800); //800

//DATA
var enemyData = [50, 100, 150, 200, 250, 300, 350, 400, 500, 700, 950,1200,1400,1600],
    playerData = [{x:400, y:500, color:'#2F3640'}];

var highScore = 0
var currentScore = 0

//Drag Method
var drag = d3.behavior.drag()
             .on("dragstart", function(){ player.attr("fill", "#6D7D94"); })
             .on("drag", function() {

               //check x borders
               if (d3.event.x > 790){
                 player.attr("cx", 780)
               } else if (d3.event.x < 0) {
                 player.attr("cx", 20)
               } else {
                 player.attr("cx", d3.event.x);
               }

               //y borders
               if (d3.event.y > 790){
                 player.attr("cy", 780)
               } else if (d3.event.y < 0) {
                 player.attr("cy", 20)
               } else {
                 player.attr("cy", d3.event.y);
               }})

             //when unclicked, change color
             .on("dragend", function() {player.attr("fill", "#2F3640")});

var generatePosition = function() {
  pos = Math.random()*800
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
    .transition("random")
    .duration(1000)
    .each(function() {
      d3.select(this).transition()
        .attr("cx", generatePosition())
        .attr("cy", generatePosition())
        // create squares to test where dots have been
        // svg.append("rect").attr("width", 20).attr("height", 20).attr("fill", "blue")
        //   .attr("x", d3.select(this).attr("cx"))
        //   .attr("y", d3.select(this).attr("cy"))
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
      //update scoreboard
      if (currentScore > highScore) {
        highScore = currentScore
      }
      currentScore = 0
      d3.select(".high").select("span").text(highScore)
      d3.select(".current").select("span").text(currentScore)

      //create popup box
      svg.selectAll(".message").data(["ouch!"]).enter()
        .append("text")
        .classed("message", true)
        .text(function(d) {return d})
        .attr("x", 400)
        .attr("y", 400)
        .transition().delay(300).remove()




      //sends enemies to top of svg
      d3.selectAll(".enemy")
        .transition()
        .duration(150)
        .attr("cy", 30)


      // d3.selectAll(".enemy").transition("random").delay(2000)

      //flash svg
    }

  });
}, 20)

//
setInterval(function(){
  currentScore += 1
  d3.select(".current").select("span").text(currentScore)

}, 50)

// var currentPlayerXPosition = player.attr("cx");
// var currentEnemyXPosition = d3.select(this).attr("cx");

// returns mouse coordinates at any moment
// svg.on("mousemove",function(){var position = d3.mouse(this)});
