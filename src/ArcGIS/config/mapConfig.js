/*
This is an example of a configured template. 
*/

define({
    "source": "c97297ee4900406484d7d063838a6540",
    "folderId": "f3d6656fba3f4c398af3f0a5157ea996",
    "values": {
        "color": "#1a1a1a",
        "theme": "#999999",
        "iconColor": "#ffffff",
        "activeTool": "",
        "scalebar": true,
        "splashModal": false,
        "toolbarLabels": true,
        "tool_print": true,
        "tool_print_layouts": true,
        "tool_print_legend": true,
        "tool_share": true,
        "tool_share_embed": false,
        "tool_overview": false,
        "tool_measure": true,
        "tool_details": false,
        "tool_legend": false,
        "tool_layers": true,
        "tool_sublayers": true,
        "tool_opacity": true,
        "tool_layerlegend": true,
        "locate": false,
        "locate_track": false,
        "tool_edit": false,
        "tool_edit_toolbar": true,
        "tool_bookmarks": true,
        "tool_basemap": true,
        "tool_search": true,
        "locationSearch": true,
        "popupPanel": true,
        "logo": "",
        "searchConfig": {
            "sources": [{
                "flayerId": "FSA_AREA_9992",
                "url": "https://dsraenterprise2.canadacentral.cloudapp.azure.com/server/rest/services/Hosted/FSA_AREA/FeatureServer/0",
                "name": "FSA_AREA",
                "id": "dojoUnique4",
                "enable": true,
                "enableSuggestions": true,
                "placeholder": "Enter Search Criterion",
                "searchFields": ["fsa_name", "depot_code"],
                "maxSuggestions": 8,
                "displayField": "fsa_name",
                "suggestionTemplate": "Depot: ${depot_code} FSA: ${fsa_name}",
                "exactMatch": true
            }, {
                "locator": {
                    "url": "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                    "_url": {
                        "path": "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                        "query": null
                    },
                    "normalization": true
                },
                "url": "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                "northLat": "Ymax",
                "southLat": "Ymin",
                "eastLon": "Xmax",
                "westLon": "Xmin",
                "name": "ArcGIS World Geocoding Service",
                "batch": false,
                "placefinding": true,
                "enableSuggestions": true,
                "singleLineFieldName": "SingleLine",
                "id": "dojoUnique5",
                "enable": true,
                "placeholder": "Enter Search Criterion",
                "countryCode": "CA",
                "maxSuggestions": 8
            }, {
                "flayerId": "ASSET_POINT_9577",
                "url": "https://dsraenterprise2.canadacentral.cloudapp.azure.com/server/rest/services/Hosted/ASSET_POINT/FeatureServer/0",
                "name": "ASSET_POINT",
                "id": "dojoUnique6",
                "enable": true,
                "enableSuggestions": true,
                "exactMatch": true,
                "placeholder": "Enter Search Criterion",
                "searchFields": ["site_identifier"],
                "maxSuggestions": 8,
                "displayField": "site_identifier",
                "suggestionTemplate": "Site: ${site_identifier}"
            }],
            "activeSourceIndex": "all",
            "enableSearchingAll": true
        },
        "webmap": "02ca94fa08e243eaa250d7268194b3cf",
        "altMapText": "This is a test application that implement some of the WCAG 2.0 requirements.",
        "customLayout": "rounded",
        "title": "Demo Application",
        "customUrlLayer": {
            "id": "",
            "fields": []
        }
    }
});
