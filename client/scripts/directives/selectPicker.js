angular.module('jobs')
    .directive('selectPicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $(element).selectpicker({
                    style: 'btn-default',
                    size: false
                });
            }
        };
    });