var CircleAnimation = function() {
  var stage = new Kinetic.Stage({
    container: 'circleAnimation',
    width: 400,
    height: 400
  });
  var shapesLayer = new Kinetic.Layer();
  /*circle*/
  var circle = new Kinetic.Circle({
    x: stage.getWidth() /2,
    y: stage.getHeight() /2,
    fill: "#"+((1<<24)*Math.random()|0).toString(16),
    radius: stage.getWidth() /2,
    num: 1
  });
  circle.on("mouseover", function(){
    split(circle);
  });

  shapesLayer.add(circle);
  function split(parent){             
    var circle1 = new Kinetic.Circle({
      x: parent.getX() - parent.getRadius() /2,
      y: parent.getY() - parent.getRadius() /2,
            fill: "#"+((1<<24)*Math.random()|0).toString(16),//circle color
            radius: parent.getRadius() /2,
            num:parent.attrs.num +1
          });

    if(circle1.attrs.num < 6){
      circle1.on("mouseover", function(){
        split(circle1); 
      });
    }

    shapesLayer.add(circle1);

    var circle2 = new Kinetic.Circle({
      x: parent.getX() - parent.getRadius() /2,
      y: parent.getY() + parent.getRadius() /2,
            fill: "#"+((1<<24)*Math.random()|0).toString(16), //circle color
            radius: parent.getRadius() /2,
            num:parent.attrs.num +1
          });
    if(circle2.attrs.num < 6){
      circle2.on("mouseover", function(){
        split(circle2);
      });
    }
    shapesLayer.add(circle2);

    var circle3 = new Kinetic.Circle({
      x: parent.getX() + parent.getRadius() /2,
      y: parent.getY() + parent.getRadius() /2,
            fill: "#"+((1<<24)*Math.random()|0).toString(16), //circle color
            radius: parent.getRadius() /2,
            num:parent.attrs.num+1
          });
    if(circle3.attrs.num < 6){
      circle3.on("mouseover", function(){
        split(circle3);
      });
    }
    shapesLayer.add(circle3);

    var circle4 = new Kinetic.Circle({
      x: parent.getX() + parent.getRadius() /2,
      y: parent.getY() - parent.getRadius() /2,
            fill: "#"+((1<<24)*Math.random()|0).toString(16), //circle color
            radius: parent.getRadius() /2,
            num:parent.attrs.num+1
          });
    if(circle4.attrs.num < 6){
      circle4.on("mouseover", function(){
        split(circle4);
      });
    }
    shapesLayer.add(circle4);
    parent.remove();
    stage.add(shapesLayer);
  }
  /*circle*/
  stage.add(shapesLayer);
};

var PopularRepositories = function() {
  var repositories = {"jobs": [
  [
  "sup-internet",
  "html-css",
  "php-mysql",
  "webdesign",
  "js-jquery",
  "cSharp-dotNet"

  ],
  [
  "soonvibes",
  "zend",
  "html-css-soonvibes",
  "js-jquery-soonvibes"
  ],
  [
  "melty",
  "js-jquery-melty",
  "html-css-melty",
  "php-mysql-melty"
  ],
  [
  "Eurelis",
  "js-jquery-eurelis",
  "angularJS",
  "html-css-eurelis",
  "drupal-magento"
  ]
  ]};



  var spaceBetweenPoints;
  var nextTopPoint;
  var nextBottomPoint;

  var dots = [];

  var colors = ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#F1C40F','#E67E22','#E74C3C'];
  $firstBullet = false;
  var topPos = 30;
  var middlePos = 70;
  var bottomPos = 110;

  $xPos = 10;
  $yPos = middlePos;
  spaceBetweenPoints = 40; 

  function drawLine(startX, startY, endY, endX) {
    if (startY > endY) {
      startY = startY - 10;
      startX += 5;
      endX = startX + spaceBetweenPoints - 15;
      $firstBullet = true;
    } else if (startY < endY) {
      startY += 10;
      startX += 5;
      endX = startX + spaceBetweenPoints - 15;
      $firstBullet = true;
    } else {
      startX += 10;
      endX = typeof endX !== 'undefined' ? endX - 10 : startX + spaceBetweenPoints - 20;
      $firstBullet = false;
    }


    canvas_context.beginPath();
    canvas_context.moveTo(startX,startY);
    canvas_context.lineTo(endX,endY);
    canvas_context.stroke();
  }

  function drawBullet(X, Y, radius) {
    if (typeof radius === "undefined") {
      radius = 5;
    }
    canvas_context.beginPath();
    canvas_context.arc(X,Y,radius,0,2*Math.PI);
    canvas_context.fill();
  }

  function drawLineAndBullet(startX, startY, endY, text, dotNumber) {
    //create line ...
    drawLine(startX, startY, endY);

    //... and his own bullet
    var radius = 5;
    if (typeof text !== "undefined" && typeof dots[dotNumber] === "undefined") {
      dots.push({
        x: startX + spaceBetweenPoints,
        y: endY,
        r: 5,
        rXr: 25,
        tip: text,
        color: $currentColor,
        isHovered: false
      });


    } else if (typeof dots[dotNumber] !== "undefined") {
      radius = dots[dotNumber].r;
    }

    drawBullet(startX + spaceBetweenPoints,endY, radius);

    //update positions
    $xPos += spaceBetweenPoints;
    $yPos = endY;
    $dotNumber ++;
  }

  function drawCanvas() {
    $dotNumber = 0;
    //initialize with first bullet
    drawBullet($xPos,$yPos)
    //create first line
    drawLineAndBullet($xPos, $yPos, middlePos);

    var beginPos = 0;
    var lastTopPos = 0;
    var lastBottomPos = 0;
    for (var i = 0; i < repositories.jobs.length; i++) {
      $yPos = middlePos;
      if (beginPos !== 0) {
        $xPos = beginPos + ($xPos - beginPos) / 2;
      }

      if ((i % 2) != 1) {
        //prevent superposition 
        if ($xPos <= lastTopPos) {
          $xPos = lastTopPos + spaceBetweenPoints;
        }
        //create middle line and first bullet
        canvas_context.fillStyle = '#333';
        canvas_context.strokeStyle = '#333';
        if (beginPos !== 0) {
          drawLine(beginPos, middlePos, middlePos, $xPos);
          drawBullet($xPos, middlePos); 
        }
        $currentColor = colors[i];
        canvas_context.fillStyle = $currentColor;
        canvas_context.strokeStyle = $currentColor;
        beginPos = $xPos;
        for (var job = 0; job < repositories.jobs[i].length; job++) {
          drawLineAndBullet($xPos, $yPos, topPos, repositories.jobs[i][job], $dotNumber);
        }              
        lastTopPos = $xPos;
      }
      else {
        //prevent superposition 
        if ($xPos <= lastBottomPos) {
          $xPos = lastBottomPos + spaceBetweenPoints;
        }
        //create middle line and first bullet
        canvas_context.fillStyle = '#333';
        canvas_context.strokeStyle = '#333';
        if (beginPos !== 0) {
          drawLine(beginPos, middlePos, middlePos, $xPos);
          drawBullet($xPos, middlePos); 
        }

        $currentColor = colors[i];
        canvas_context.fillStyle = $currentColor;
        canvas_context.strokeStyle = $currentColor;
        beginPos = $xPos;

        for (var job = 0; job < repositories.jobs[i].length; job++) {
          drawLineAndBullet($xPos, $yPos, bottomPos, repositories.jobs[i][job], $dotNumber);
        }
        lastBottomPos = $xPos;
      }
    }
    canvas_context.closePath();
  }

  var canvas = document.getElementById("popularRepositories");
  if (canvas.getContext) {
    var canvas_context = canvas.getContext("2d");

    if(window.devicePixelRatio == 2) {
      canvas.setAttribute('width', 2000);
      canvas.setAttribute('height', 340);
      canvas_context.scale(2,2);
    }

    var canvasOffset = $("#popularRepositories").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    //define text style
    canvas_context.font = "10px sans-serif";
    canvas_context.textAlign = "center";

    canvas_context.fillStyle = '#333';
    canvas_context.strokeStyle = '#333';
    
    drawCanvas();

    // request mousemove events
    $("#popularRepositories").mousemove(handleMouseMove);
    $("#popularRepositories").on('touchstart', handleMouseMove);

    // show tooltip when mouse hovers over dot
    function handleMouseMove(e){

      mouseX=parseInt((e.pageX - $('#canvasContainer').offset().left) + $('#canvasContainer').scrollLeft());
      mouseY=parseInt((e.pageY - $('#canvasContainer').offset().top));
      // Put your mousemove stuff here
      var hit = false;
      for (var i = 0; i < dots.length; i++) { 
        var dot = dots[i];
        var dx = mouseX - dot.x;
        var dy = mouseY - dot.y;
        if (dx * dx + dy * dy < (dot.rXr + 10)) {
          canvas_context.beginPath();
          canvas_context.clearRect(dot.x - dot.r, dot.y - dot.r, dot.r * 2, dot.r * 2);
          canvas_context.closePath();
          dot.r = 7;
          dot.rXr = 100;
          canvas_context.fillStyle = dot.color;
          canvas_context.strokeStyle = dot.color;
          canvas_context.beginPath();
          dot.isHovered = true;
          drawBullet(dot.x, dot.y, dot.r);
          canvas_context.closePath();
          $('#canvasContainer').css("cursor","pointer");
          $('.commitList#' + dot.tip).removeClass('hide').siblings().addClass('hide');
          var left = (dot.x) - $('#canvasContainer').scrollLeft();
          if ($('#canvasContainer').width() - (dot.x - $('#canvasContainer').scrollLeft()) < 320) {
            if ($('#canvasContainer').width() < 400) {
              left = 0;
            }
            else {
              if($('#canvasContainer').scrollLeft() >= 320) {
                left = left - (320 - (dot.x - $('#canvasContainer').scrollLeft()));
              }
              else if ((left - 320) >= 0) {
                left = left - 320;
              }
              else {
                left = 0;
              }
            }
          }
          $('#' + dot.tip).css("left", left + "px");
          $('#' + dot.tip).css("top", (dot.y + 15) + "px");
          hit = true;
        }
      }
      if (!hit) { 
        $('#canvasContainer').css("cursor","move");
        $('.commitList').not('.hide').addClass('hide'); 
        for (var i = dots.length - 1; i >= 0; i--) {
          if(dots[i].isHovered === true) {
            var dot = dots[i];
            canvas_context.beginPath();
            canvas_context.clearRect(dot.x - dot.r - 1, dot.y - dot.r - 1, dot.r * 2 + 2, dot.r * 2 + 2);
            canvas_context.closePath();
            dot.r = 5;
            dot.rXr = 25;
            canvas_context.beginPath();
            dot.isHovered = false;
            drawBullet(dot.x, dot.y, dot.r);
            canvas_context.closePath();
          }
        };
      }
    }

    function dragCanvas() {

      $('#canvasContainer').on('mousedown', function(click) {
        origX = click.pageX + $('#canvasContainer').scrollLeft();
        $('#canvasContainer').on('mousemove ', function(e){
          curX = e.pageX + $('#canvasContainer').scrollLeft();
          var diff = (origX - curX);
          var newpos = $('#canvasContainer').scrollLeft() + diff;
          if(newpos > ($('canvas').width() - $('#canvasContainer').width())) {
            newpos = ($('canvas').width() - $('#canvasContainer').width());
          }
          if(newpos < 0) {
            newpos = 0;
          }
          $('#canvasContainer').scrollLeft(newpos);
        });
      });
      $('#canvasContainer').on('touchstart', function(click) {
        endCoords = click.originalEvent.targetTouches[0];
        origX = endCoords.pageX + $('#canvasContainer').scrollLeft();
        $('#canvasContainer').on('touchmove', function(e){
          endCoords = e.originalEvent.targetTouches[0];
          curX = endCoords.pageX + $('#canvasContainer').scrollLeft();

          var diff = (origX - curX);
          var newpos = $('#canvasContainer').scrollLeft() + diff;
          if(newpos > ($('canvas').width() - $('#canvasContainer').width())) {
            newpos = ($('canvas').width() - $('#canvasContainer').width());
          }
          if(newpos < 0) {
            newpos = 0;
          }
          $('#canvasContainer').scrollLeft(newpos);
        });
      });
      $('#canvasContainer').on('mouseup touchend, mouseleave click', function(){
        $('#canvasContainer').off('mousemove');
      });

    };
    dragCanvas();

  }
};

$(function(){
  FastClick.attach(document.body);
  if($('#popularRepositories').length > 0) {
    var popularRepositories = PopularRepositories();
  }
  if($('#circleAnimation').length > 0) {
    CircleAnimation();
  }
});