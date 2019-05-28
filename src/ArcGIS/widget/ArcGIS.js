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

        templateString: widgetTemplate,

        widgetBase: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function () {
            this._handles = [];

        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

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
                "dojo/parser",
                "ArcGIS/config/mapConfig"
            ], function (Map,
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
                parser,
                Map_Config
            ) {

                //parser.parse();

                // webmap for DSRA DP270
                var mapid = "02ca94fa08e243eaa250d7268194b3cf";

                // map is hosted on dsraenterprise2 NOT arcgis.com
                arcgisUtils.arcgisUrl = "https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/sharing/content/items";

                arcgisUtils.createMap(mapid, "map").then(function (response) {

                    var map = response.map;

                    //map.hideZoomSlider();

                    //add the scalebar
                    if (false) {
                        var scalebar = new Scalebar({
                            map: map,
                            scalebarUnit: "english"
                        });
                    }




                    // simple search
                    var search = new Search({
                        map: response.map,
                        enableButtonMode: false,
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
                });

            })
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);
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
