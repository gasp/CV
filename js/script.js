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
});