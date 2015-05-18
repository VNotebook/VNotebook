'use strict';

application.directive('notebookSheet', function() {
    return {
        scope: {
            mode: '&' // function
        },
        link: function ($scope, $element, $attr) {

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

                    path = context.paper.path();

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

            var sheet = function(currentObject) {
                var context = Snap($element[0]);

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
                "Draw": new Pencil("#000000", 5),
                "Erase": new Pencil("#ffffff", 6) //TODO: temporary eraser
            };

            $scope.$watch('mode()', function() {
                sheet( elements[$scope.mode()] );
            });

            $scope.$on("$destroy", function() {
                $element.unbind();
            });
        }
    }
});
