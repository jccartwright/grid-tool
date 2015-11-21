'use strict';

/**
 * @ngdoc function
 * @name gridToolApp.controller:MainCtrl
 * @description
 * # ContractCtrl
 * Controller of the gridToolApp
 */
angular.module('gridToolApp')
    .controller('ContactCtrl', function ($scope) {

        $scope.map = {
            options: {
                basemap: 'topo',
                center: [-122.45,37.75],
                zoom: 13,
                sliderStyle: 'small'
            }
        };
    });