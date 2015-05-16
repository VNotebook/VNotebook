'use strict';

application.directive('notebookSheet', function() {
    return {
        link: function ($scope, $element, $attr) {

            var Pencil = function() {

                var color = "#000000";
                var offset = null;
                var width = 5;
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

            var sheet = function(pencil) {
                var context = Snap($element[0]);

                $element.bind('mousedown', function(event) {
                    pencil.start(event, context);
                });

                $element.bind('mousemove', function(event) {
                    pencil.move(event);
                });

                $element.bind('mouseup', function(event) {
                    pencil.finish();
                });
            };

            sheet(new Pencil());
        }
    }
});
