'use strict';

application.controller('NotebookController', function($scope, $location, $routeParams, Elements) {

    $scope.changePosition = function () {
        var temp = $scope.leftPanel;
        $scope.leftPanel = $scope.rightPanel;
        $scope.rightPanel = temp;
    };

    $scope.doNothing = function () {
        // do something here
    };

    $scope.leftPanel = [
        {
            title: "Widget 1",
            buttonClass: "glyphicon glyphicon-camera",
            action: $scope.doNothing
        },
        {
            title: "Widget 2",
            buttonClass: "glyphicon glyphicon-edit",
            action: $scope.doNothing
        }
    ];
    $scope.rightPanel = [
        {
            title: "Editar",
            buttonClass: "glyphicon glyphicon-pencil",
            action: $scope.doNothing
        },
        {
            title: "Borrar",
            buttonClass: "glyphicon glyphicon-erase",
            action: $scope.doNothing
        },
        {
            title: "Cambiar",
            buttonClass: "glyphicon glyphicon-transfer",
            action: $scope.changePosition
        }
    ];

    var load = function () {

        // Load something
    };

    load();
})
.directive('notebookSheet', function() {
    return {
        link: function(scope, element, attr) {
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var lastX;
            var lastY;

            element.bind('mousedown', function(event){
                if(event.offsetX !== undefined){
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else { // Firefox compatibility
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                // begins new line
                ctx.beginPath();

                drawing = true;
            });

            element.bind('mousemove', function(event){

                var currentX, currentY;

                if(drawing){
                    // get current mouse position
                    if(event.offsetX !== undefined){
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }

            });

            element.bind('mouseup', function(event){
                // stop drawing
                drawing = false;
            });

            // canvas reset
            function reset(){
                ctx.clearRect(0, 0, element[0].width, element[0].height);
                //element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY){
                // line from
                ctx.moveTo(lX,lY);
                // to
                ctx.lineTo(cX,cY);
                // color
                ctx.strokeStyle = "#4bf";
                // draw it
                ctx.stroke();
            }
        }
    };
});
