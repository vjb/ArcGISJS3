define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "dojo/text!ArcGIS/widget/template/ArcGIS.html",
    "ArcGIS/config/ArcGIS_Dojo_Loader_Config",

], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, widgetTemplate, ArcGIS_Dojo_Loader_Config) {
    "use strict";

    return declare("ArcGIS.widget.ArcGIS", [_WidgetBase, _TemplatedMixin], {

        autoLoad: false,
        timeout: 1000,
        templateString: widgetTemplate,

        widgetBase: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,
        _map: null,

        constructor: function () {
            this._handles = [];

        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            this.x = "hi there from postcreate";

            // Load a sample base map
            require(ArcGIS_Dojo_Loader_Config, ["esri/map",
                "esri/urlUtils",
                "esri/arcgis/utils",
                "esri/dijit/Legend",
                "esri/dijit/Scalebar",
                "dojo/text!esri/dijit/Search/templates/Search.html",
                "esri/dijit/Search",
                "esri/layers/FeatureLayer",
                "esri/InfoTemplate",
                "esri/dijit/BasemapGallery",
                "esri/dijit/LayerList",
                "esri/dijit/HomeButton",
                "esri/toolbars/draw",
                "esri/graphic",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/dijit/Measurement",
                "dojo/parser",
                "ArcGIS/config/mapConfig"
            ], dojo.hitch(this, function (Map,
                urlUtils,
                arcgisUtils,
                Legend,
                Scalebar,
                _SearchTemplate,
                Search,
                FeatureLayer,
                InfoTemplate,
                BasemapGallery,
                LayerList,
                HomeButton,
                Draw,
                Graphic,
                SimpleMarkerSymbol,
                SimpleLineSymbol,
                SimpleFillSymbol,
                Measurement,
                parser,
                Map_Config) {

                // webmap for DSRA DP270
                var mapid = "02ca94fa08e243eaa250d7268194b3cf";

                // map is hosted on dsraenterprise2 NOT arcgis.com
                arcgisUtils.arcgisUrl = "https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/sharing/content/items";

                arcgisUtils.createMap(mapid, "map").then(
                    dojo.hitch(this, function (response) {

                        var map = response.map;

                        this._map = map;
                        this._response = response;


                        // shouldn't this be closer to the end?
                        this.set("loaded", true);



                        //add the scalebar
                        if (false) {
                            var scalebar = new Scalebar({
                                map: map,
                                scalebarUnit: "english"
                            });
                        }

                        var measurement = new Measurement({
                            map: map
                        }, "measurementDiv");
                        measurement.startup();
                        // setup multi source search
                        var search = new Search({
                            map: response.map,
                            enableButtonMode: true,
                            showInfoWindowOnSelect: true,
                            enableInfoWindow: true
                        }, "search");

                        //Set the sources above to the search widget
                        //search.set("sources", Map_Config["values"].searchConfig.sources);

                        var sources = search.get("sources");
                        sources.push({
                            featureLayer: new FeatureLayer("https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CongressionalDistricts/FeatureServer/0"),
                            searchFields: ["DISTRICTID"],
                            displayField: "DISTRICTID",
                            exactMatch: false,
                            outFields: ["DISTRICTID", "NAME", "PARTY"],
                            name: "Congressional Districts",
                            placeholder: "3708",
                            maxResults: 6,
                            maxSuggestions: 6,

                            //Create an InfoTemplate and include three fields
                            infoTemplate: new InfoTemplate("Congressional District",
                                "District ID: ${DISTRICTID}</br>Name: ${NAME}</br>Party Affiliation: ${PARTY}"
                            ),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        sources.push({
                            featureLayer: new FeatureLayer("https://dsraenterprise2.canadacentral.cloudapp.azure.com/server/rest/services/Hosted/FSA_AREA/FeatureServer/0"),
                            "searchFields": ["fsa_name", "depot_code"],
                            "displayField": "fsa_name",
                            "exactMatch": true,
                            outFields: ["fsa_name", "depot_code"],
                            name: "FSA_AREA",
                            placeholder: "Enter Search Criterion",
                            maxResults: 6,
                            maxSuggestions: 6,

                            //Create an InfoTemplate and include two fields
                            infoTemplate: new InfoTemplate("FSA INFO",
                                "FSA :  ${fsa_name}</br>Depot: ${depot_code}</br>"
                            ),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        sources.push({
                            featureLayer: new FeatureLayer("https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/US_Senators/FeatureServer/0"),
                            searchFields: ["Name"],
                            displayField: "Name",
                            exactMatch: false,
                            name: "Senator",
                            outFields: ["*"],
                            placeholder: "Senator name",
                            maxResults: 6,
                            maxSuggestions: 6,

                            //Create an InfoTemplate

                            infoTemplate: new InfoTemplate("Senator information",
                                "Name: ${Name}</br>State: ${State}</br>Party Affiliation: ${Party}</br>Phone No: ${Phone_Number}<br><a href=${Web_Page} target=_blank ;'>Website</a>"
                            ),

                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        //Set the sources above to the search widget
                        search.set("sources", sources);

                        search.startup();

                        var basemapGallery = new BasemapGallery({
                            showArcGISBasemaps: true,
                            map: response.map,
                        }, "basemapGallery");
                        basemapGallery.startup();

                        // clickable legend
                        var myWidget = new LayerList({
                                map: response.map,
                                layers: arcgisUtils.getLayerList(response)
                            },
                            "layerList"
                        );
                        myWidget.startup();

                        var home = new HomeButton({
                            map: response.map
                        }, "HomeButton");
                        home.startup();

                        var toolbar = new Draw(response.map);
                        toolbar.on("draw-end", addToMap);

                        // wire up the buttons (NEEDS BETTER SELECTOR!)
                        document.querySelectorAll("#header button").forEach(function (d) {
                            d.addEventListener("click", activateTool);
                        })

                        function activateTool() {
                            var tool = this.textContent.toUpperCase().replace(/ /g, "_");
                            toolbar.activate(Draw[tool]);
                            response.map.hideZoomSlider();

                        }

                        function addToMap(evt) {
                            var symbol;
                            toolbar.deactivate();
                            response.map.showZoomSlider();

                            switch (evt.geometry.type) {
                                case "point":
                                case "multipoint":
                                    symbol = new SimpleMarkerSymbol();
                                    break;
                                case "polyline":
                                    symbol = new SimpleLineSymbol();
                                    break;
                                default:
                                    symbol = new SimpleFillSymbol();
                                    break;
                            }
                            var graphic = new Graphic(evt.geometry, symbol);
                            response.map.graphics.add(graphic);
                        }

                    }));

            }))
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;

            // set zoom level to current zoom level
            this._contextObj.set("CurrentZoomLevel", this._map.getZoom());

            // hook up listener to zoom-end event

            this._map.on("zoom-end", dojo.hitch(this, function () {
                this._contextObj.set("CurrentZoomLevel", this._map.getZoom());

            }))

            //after map loads, connect to listen to mouse move & drag events
            this._map.on("mouse-move", dojo.hitch(this, showCoordinates));

            // connect arcgis objects to Mendix entities
            this._response.itemInfo.itemData.operationalLayers[0].layerObject.on("click", dojo.hitch(this, function (evt) {
                
                this._contextObj.set("GlobalID", evt.graphic.attributes.globalid);
                this._contextObj.set("AssetAsJSON", JSON.stringify(evt.graphic.attributes,null,2));
            }));

            function showCoordinates(evt) {
                //the map is in web mercator but display coordinates in geographic (lat, long)
                require(ArcGIS_Dojo_Loader_Config, ["esri/geometry/webMercatorUtils"], dojo.hitch(this, function (webMercatorUtils) {
                    var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
                    this._contextObj.set("MouseLat", mp.y.toFixed(8));
                    this._contextObj.set("MouseLon", mp.x.toFixed(8));
                }));
                //display mouse coordinates

            }

            this._resetSubscriptions();
            this._updateRendering(callback);
        },

        _resetSubscriptions: function () {
            var _objectHandle = null,
                _attrHandle = null,
                _validationHandle = null;
            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle, i) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }
            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
                _objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: dojo.hitch(this, function (guid) {

                        console.log(this._contextObj.get("ZoomToLat"));
                        this._map.panDown();

                        require(ArcGIS_Dojo_Loader_Config, ["esri/geometry/Point", "esri/SpatialReference"], dojo.hitch(this, function (Point, SpatialReference) {
                            var p = new Point(parseFloat(this._contextObj.get("ZoomToLon")), parseFloat(this._contextObj.get("ZoomToLat")), new SpatialReference({
                                wkid: 4326
                            }));
                            this._map.centerAndZoom(p, 16);

                            //this._updateRendering();
                        }))

                    })
                });

                this._handles = [_objectHandle, ];
            }
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for running a microflow
        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["ArcGIS/widget/ArcGIS"]);
