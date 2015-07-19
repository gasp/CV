var CircleAnimation = function() {
    var stage = new Kinetic.Stage({
            container: 'container',
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
            "Sup'internet",
            "HTML / CSS",
            "PHP / MySQL",
            "Webdesign",
            "JS / jQuery",
            "C# / .Net"

        ],
        [
            "Soonvibes",
            "Zend",
            "HTML / CSS",
            "JS"
        ],
        [
            "Melty",
            "JS / jQuery",
            "HTML / CSS",
            "PHP / MySQL"
        ],
        [
            "Eurelis",
            "JS/jQuery",
            "AngularJS",
            "HTML / CSS",
            "Foundation",
            "Drupal",
            "Magento"
        ]
    ]};

    var spaceBetweenPoints;
    var nextTopPoint;
    var nextBottomPoint;

    // nextBottomPoint = lastTopPoint - ((nextTopPoint - lastTopPoint) / 2)

    var topPos = 30;
    var middlePos = 70;
    var bottomPos = 110;

    $xPos = 10;
    $yPos = middlePos;
    spaceBetweenPoints = 40; 

    function drawLine(startX, startY, endY, endX) {
        endX = typeof endX !== 'undefined' ? endX : startX + spaceBetweenPoints;
        canvas_context.beginPath();
        canvas_context.moveTo(startX,startY);
        canvas_context.lineTo(endX,endY);
        canvas_context.stroke();
    }

    function drawBullet(X, Y) {
        canvas_context.beginPath();
        canvas_context.arc(X,Y,5,0,2*Math.PI);
        canvas_context.stroke();
    }

    function drawLineAndBullet(startX, startY, endY) {
        //create line ...
        drawLine(startX, startY, endY);

        //... and his own bullet
        drawBullet(startX + spaceBetweenPoints,endY);

        //update positions
        $xPos += spaceBetweenPoints;
        $yPos = endY;
    }


    var canvas = document.getElementById("popularRepositories");
    if (canvas.getContext) {
        var canvas_context = canvas.getContext("2d");
        
        //define text style
        canvas_context.font = "10px sans-serif";
        canvas_context.textAlign = "center";

        //initialize with first bullet
        canvas_context.beginPath();
        canvas_context.arc($xPos,$yPos,5,0,2*Math.PI);
        canvas_context.stroke();
        //create first line
        drawLineAndBullet($xPos, $yPos, middlePos);

        var beginPos = 0;
        var lastTopPos = 0;
        var lastBottomPos = 0;
        for (var i = 0; i < repositories.jobs.length; i++) {
            console.log(repositories.jobs[i]);
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
                if (beginPos !== 0) {
                    drawLine(beginPos, middlePos, middlePos, $xPos);
                    drawBullet($xPos, middlePos); 
                }
                beginPos = $xPos;
                console.log(repositories.jobs[i].length);
                for (var job = 0; job < repositories.jobs[i].length; job++) {
                    drawLineAndBullet($xPos, $yPos, topPos);
                    console.log(repositories.jobs[i][job]);
                    if ((job % 2) != 1) {
                        canvas_context.fillText(repositories.jobs[i][job], $xPos, topPos - 15);
                    }
                    else {
                        canvas_context.fillText(repositories.jobs[i][job], $xPos, topPos + 17);
                    }
                    
                }

                // drawLineAndBullet($xPos, $yPos, topPos);
                // drawLineAndBullet($xPos, $yPos, topPos);
                // drawLineAndBullet($xPos, $yPos, topPos);
                // drawLineAndBullet($xPos, $yPos, topPos);                
                lastTopPos = $xPos;
            } 
            else {
                //prevent superposition 
                if ($xPos <= lastBottomPos) {
                    $xPos = lastBottomPos + spaceBetweenPoints;
                }
                //create middle line and first bullet
                if (beginPos !== 0) {
                    drawLine(beginPos, middlePos, middlePos, $xPos);
                    drawBullet($xPos, middlePos); 
                }
                beginPos = $xPos;

                for (var job = 0; job < repositories.jobs[i].length; job++) {
                    drawLineAndBullet($xPos, $yPos, bottomPos);
                    console.log(repositories.jobs[i][job]);
                    if ((job % 2) != 1) {
                        canvas_context.fillText(repositories.jobs[i][job], $xPos, bottomPos + 17);
                    }
                    else {
                        canvas_context.fillText(repositories.jobs[i][job], $xPos, bottomPos - 15);
                    }
                    
                }
                // drawLineAndBullet($xPos, $yPos, bottomPos);
                // drawLineAndBullet($xPos, $yPos, bottomPos);
                // drawLineAndBullet($xPos, $yPos, bottomPos);
                lastBottomPos = $xPos;
            }
        }
    }
};

$(function(){
    var popularRepositories = PopularRepositories();
});