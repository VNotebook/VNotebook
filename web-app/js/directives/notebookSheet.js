'use strict';

MathJax.Hub.Config({
    tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});

application.directive('notebookSheet', function() {
    return {
        scope: {
            mode: '&', // function
            color: '&',
            equation: '&',
            model: '='
        },
        link: function ($scope, $element, $attr, $modal) {
            var textGroup, drawGroup, sheetGroup, extraContentGroup, context, stepSize;

            var Pencil = function (colorArg, widthArg, className) {

                var color = colorArg;
                var offset = null;
                var width = widthArg;

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
                        "class": className,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                    });
                };

                this.finish = function () {
                    var _path = null;

                    if (!path != null) {
                        if (points.length <= 1) {
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

                this.move = function (event) {
                    if (drawing) {
                        var x = event.pageX - offset.left;
                        var y = event.pageY - offset.top;

                        points.push([x, y]);
                        path.attr({path: pointsToSVG()});
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

            var Text = function () {

                var offset = null;
                var mouseDownElement = false;

                function elementMousedown(evt) {
                    mouseDownElement = true;
                }

                var createText = function (context, localCoordinates) {
                    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                    var textdiv = document.createElement("div");
                    var textnode = document.createTextNode("Text");

                    textdiv.appendChild(textnode);
                    textdiv.setAttribute("contenteditable", "true");
                    textdiv.setAttribute("class", "textEditSVG");
                    textdiv.setAttribute("style", "width: " + (980 - localCoordinates.x).toString() + "px;" +
                                         "line-height: " + stepSize.toString() + "px;");
                    myforeign.setAttribute("width", "100%");
                    myforeign.setAttribute("height", "100%");
                    myforeign.classList.add("foreign"); //to make div fit text

                    textdiv.classList.add("text"); //to make div fit text
                    textdiv.addEventListener("mousedown", elementMousedown, false);

                    var yFixedCoordinates = Math.floor(localCoordinates.y / stepSize) * stepSize + 5;
                    myforeign.setAttributeNS(null, "transform", "translate(" + localCoordinates.x + " " +
                                             yFixedCoordinates + ")");
                    textGroup.append(myforeign);
                    myforeign.appendChild(textdiv);
                };

                this.start = function (event, context) {
                    offset = $element[0].getBoundingClientRect();

                    var localCoordinates = {};

                    localCoordinates.x = event.pageX - offset.left;
                    localCoordinates.y = event.pageY - offset.top;

                    if (!mouseDownElement)
                        createText(context, localCoordinates);
                    else
                        mouseDownElement = false;
                };

                this.move = function (event) {
                    // TODO: implement?
                };

                this.finish = function () {
                    // TODO: implement?
                };
            };

            var Equation = function () {
                var offset = null;
                var mouseDownElement = false;

                function elementMousedown(evt) {
                    mouseDownElement = true;
                }

                var createEquation = function (context, localCoordinates) {
                    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                    var spandiv = document.createElement("div");
                    spandiv.classList.add("no-select");

                    spandiv.innerHTML = context;

                    myforeign.setAttribute("width", "100%");
                    myforeign.setAttribute("height", "100%");
                    myforeign.classList.add("foreign"); //to make div fit text

                    spandiv.classList.add("eq");
                    spandiv.addEventListener("mousedown", elementMousedown, false);

                    var yFixedCoordinates = Math.floor(localCoordinates.y / stepSize) * stepSize + 10;
                    var xFixedCoordinates = localCoordinates.x < 35 ? 35 : localCoordinates.x;
                    console.log(xFixedCoordinates);
                    myforeign.setAttributeNS(null, "transform", "translate(" + xFixedCoordinates + " " +
                        yFixedCoordinates + ")");
                    textGroup.append(myforeign);
                    myforeign.appendChild(spandiv);
                };

                this.start = function (event, context) {
                    offset = $element[0].getBoundingClientRect();

                    var localCoordinates = {};

                    localCoordinates.x = event.pageX - offset.left;
                    localCoordinates.y = event.pageY - offset.top;

                    if (!mouseDownElement)
                        createEquation($scope.equation(), localCoordinates);
                    else
                        mouseDownElement = false;
                };

                this.move = function (event) {
                    // TODO: implement?
                };

                this.finish = function () {
                    // TODO: implement?
                };
            };

            var sheet = function (currentObject) {

                $element.bind('mousedown', function (event) {
                    currentObject.start(event, context);
                });

                $element.bind('mousemove', function (event) {
                    currentObject.move(event);
                });

                $element.bind('mouseup', function (event) {
                    currentObject.finish();
                    $scope.$apply(function () {
                        $scope.model = context.toString();
                    });
                });
            };

            // If you add some object
            var elements = {
                "Draw": new Pencil($scope.color(), 5, ""),
                "Erase": new Pencil("#ffffff", 6, ""), //TODO: temporary eraser
                "Text": new Text(),
                "Equation": new Equation()
            };

            function updateMode() {
                $element.unbind();
                sheet(elements[$scope.mode()]);
            }

            $scope.$watch('mode()', updateMode);

            $scope.$watch('color()', function () {
                elements.Draw = new Pencil($scope.color(), 5);
                updateMode();
            });

            $scope.$on("$destroy", function () {
                $element.unbind();
            });

            function stripedNotebook() {
                stepSize = 30;

                for(var i = 0; i <= 25; ++i) {
                    var currentLine = context.line(35, 30 + i*stepSize, 990, 30 + i*stepSize);
                    currentLine.attr({
                        stroke: "black",
                        "stroke-width": "0.5px"
                    });
                    sheetGroup.append(currentLine);
                }
            }

            function squaredNotebook() {
                stepSize = 25;

                var options = {
                    stroke: "black",
                    "stroke-width": "0.5px",
                    "stroke-opacity": "0.5"
                };

                // putting horizontal lines
                for(var i = 0; i < 31; ++i) {
                    var currentLine = context.line(30, 30 + i*stepSize, 980, 30 + i*stepSize);
                    currentLine.attr(options);
                    sheetGroup.append(currentLine);
                }

                for(i = 0; i < 39; ++i) {
                    currentLine = context.line(30 + i*stepSize, 30, 30 + i*stepSize, 780);
                    currentLine.attr(options);
                    sheetGroup.append(currentLine);
                }
            }

            function init() {
                context = Snap($element[0]);
                drawGroup = context.group();
                extraContentGroup = context.group();
                textGroup = context.group();
                sheetGroup = context.group();
                stripedNotebook();

                var vnotebookText = context.text(910, 796, "VNoteBook").attr({
                    "style": "-moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; " +
                    "-ms-user-select: none;user-select: none; font-family: Comic Sans MS"
                });
                extraContentGroup.append(vnotebookText);
            }

            init();
        }
    }
});