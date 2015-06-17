MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: "none",
    "HTML-CSS": {
        showMathMenu: true
    }
});
MathJax.Hub.Configured();

application.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.$watch($attrs.mathjaxBind, function(value) {
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
                $scope.transformEquation = $element[0].outerHTML;
            });
        }]
    };
});

application.controller('equationController', function ($scope) {
    $scope.toMathjax = "";

    $scope.save = function () {
        $scope.$close($scope.transformEquation);
    }
});
