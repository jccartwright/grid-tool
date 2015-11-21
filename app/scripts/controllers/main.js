'use strict';

/**
 * @ngdoc function
 * @name gridToolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gridToolApp
 */
angular.module('gridToolApp')
    .controller('MainCtrl', function ($scope, esriLoader) {

        var map = {
            options: {
                basemap: 'topo',
                center: [-122.45,37.75],
                zoom: 13,
                sliderStyle: 'small'
            }
        };
        $scope.map = map;

        // start once the map is loaded
        $scope.onMapLoad = function(map) {

            // this example requires other Esri modules like graphics, symbols, and toolbars
            // so we load them up front using the esriLoader
            esriLoader.require([
                'esri/toolbars/draw',
                'esri/symbols/SimpleLineSymbol',
                'esri/symbols/SimpleFillSymbol',
                'esri/graphic',
                'esri/Color',
                'esri/geometry/webMercatorUtils'
 ], function(
                Draw,
                SimpleLineSymbol,
                SimpleFillSymbol,
                Graphic,
                Color,
                webMercatorUtils
            ) {

                var tb;

                var fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                        new Color([255,0,0]), 2),new Color([255,255,0,0.25])
                );

                // get a local reference to the map object once it's loaded
                // and initialize the drawing toolbar
                function initToolbar(mapObj) {
                    map = mapObj;
                    tb = new Draw(map);
                    tb.on('draw-end', function(e) {
                        $scope.$apply(function() {
                            $scope.selectedGeom = webMercatorUtils.webMercatorToGeographic(e.geometry);
                            addGraphic(e);
                        });
                    });

                    // set the active tool once a button is clicked
                    // apply this function binding to scope since it is outside of the digest cycle
                    $scope.$apply(function() {
                        $scope.activateDrawTool = activateDrawTool;
                    });
                }

                function activateDrawTool(tool) {
                    map.disableMapNavigation();
                    tb.activate(tool.toLowerCase());

                    //clear any existing graphics
                    map.graphics.clear();
                }

                function addGraphic(evt) {
                    //deactivate the toolbar
                    tb.deactivate();
                    map.enableMapNavigation();

                    var symbol = fillSymbol;

                    map.graphics.add(new Graphic(evt.geometry, symbol));
                }

                // bind the toolbar to the map
                initToolbar(map);

                map.on('mouse-move', function(e){
                    $scope.$apply(function(){
                        //console.log(e.mapPoint);
                        $scope.mouseposition = webMercatorUtils.webMercatorToGeographic(e.mapPoint);
                    });
                });

            });

        };
    });