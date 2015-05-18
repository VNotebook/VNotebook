'use strict';

application.directive('notebookSheet', function() {
    return {
        scope: {
            mode: '&', // function
            color: '&',
            model: '='
        },
        link: function ($scope, $element, $attr) {

            var textGroup, drawGroup, context;

            var Pencil = function(colorArg, widthArg) {

                var color = colorArg;
                var offset = null;
                var width = widthArg;
                var opacity = 1.0;

                var drawing = false;
                var points = [];
                var path = null;

                this.start = function (event, context) {
                    drawing = true;

                    offset = $element[0].getBoundingClientRect();

                    var x = event.pageX - offset.left;
                    var y = event.pageY - offset.top;

                    points.push([x, y]);

                    path = drawGroup.path();

                    path.attr({
                        stroke: color,
                        "fill": "none",
                        "stroke-width": width,
                        "stroke-opacity": opacity,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                    });
                };

                this.finish = function() {
                    var _path = null;

                    if(!path != null) {
                        if(points.length <= 1) {
                            path.remove();
                        } else {
                            _path = path;
                        }
                    }

                    drawing = false;
                    path = null;
                    points = [];

                    return _path;
                };

                this.move = function(event) {
                    if(drawing) {
                        var x = event.pageX - offset.left;
                        var y = event.pageY - offset.top;

                        points.push([x, y]);
                        path.attr({ path: pointsToSVG()});
                    }
                };

                function pointsToSVG() {
                    if (points != null && points.length > 1) {
                        var p = points[0];
                        var path = "M" + p[0] + "," + p[1];

                        for (var i = 1, n = points.length; i < n; i++) {
                            p = points[i];
                            path += "L" + p[0] + "," + p[1];
                        }
                        return path;

                    } else {
                        return "";
                    }
                }
            };

            var Text = function() {

                var offset = null;
                var mouseDownElement = false;

                function elementMousedown(evt) {
                    mouseDownElement = true;
                }

                var createText = function(context, localCoordinates) {
                    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
                    var textdiv = document.createElement("div");
                    var textnode = document.createTextNode("");

                    textdiv.appendChild(textnode);
                    textdiv.setAttribute("contentEditable", "true");
                    textdiv.setAttribute("class", "textEditSVG");

                    myforeign.setAttribute("width", "100%");
                    myforeign.setAttribute("height", "100%");
                    myforeign.classList.add("foreign"); //to make div fit text

                    textdiv.classList.add("insideforeign"); //to make div fit text
                    textdiv.addEventListener("mousedown", elementMousedown, false);

                    myforeign.setAttributeNS(null, "transform", "translate(" + localCoordinates.x + " " + localCoordinates.y + ")");
                    textGroup.append(myforeign);
                    myforeign.appendChild(textdiv);
                };

                this.start = function(event, context) {
                    offset = $element[0].getBoundingClientRect();

                    var localCoordinates = {};

                    localCoordinates.x = event.pageX - offset.left;
                    localCoordinates.y = event.pageY - offset.top;

                    if(!mouseDownElement)
                        createText(context, localCoordinates);
                    else
                        mouseDownElement = false;
                };

                this.move = function(event) {
                    // TODO: implement?
                };

                this.finish = function() {
                    // TODO: implement?
                };
            };

            var sheet = function(currentObject) {

                $element.bind('mousedown', function(event) {
                    currentObject.start(event, context);
                });

                $element.bind('mousemove', function(event) {
                    currentObject.move(event);
                });

                $element.bind('mouseup', function(event) {
                    currentObject.finish();
                });
            };

            // If you add some object
            var elements = {
                "Draw": new Pencil($scope.color(), 5),
                "Erase": new Pencil("#ffffff", 6), //TODO: temporary eraser
                "Text": new Text()
            };

            function updateMode() {
                $element.unbind();
                sheet( elements[$scope.mode()] );
            }

            $scope.$watch('mode()', updateMode);

            $scope.$watch('color()', function() {
                elements.Draw = new Pencil($scope.color(), 5);
                updateMode();
            });

            $scope.$on("$destroy", function() {
                $element.unbind();
            });

            function init() {
                context = Snap($element[0]);
                drawGroup = context.g();
                textGroup = context.g();
            }

            init();
        }
    }
});
