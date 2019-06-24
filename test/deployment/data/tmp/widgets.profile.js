dependencies = {
    layers: [
        {
            name: "../mxui/mxui.js",
            resourceName: "mxui.mxui",
            dependencies: [ "mxui.mxui" ],
            discard: true
        },
        {
            name: "./widgets/widgets.js",
            resourceName: "widgets.widgets",
            dependencies: ["widgets.widgets"],
            layerDependencies: [ "../mxui/mxui.js" ],
            noref: true
        }
    ],
    prefixes: [
        [ "dojox", "../dojox" ],
        [ "dijit", "../dijit" ],

        [ "mxui", "../mxui" ],
        [ "mendix", "../mendix" ],

        [ "big", "../big" ],
        [ "MobileFeatures", "C:\\Users\\vbe\\temp\\VJBGIS\\test\\deployment\\web\\widgets\\MobileFeatures" ], [ "widgets", "C:\\Users\\vbe\\temp\\VJBGIS\\test\\deployment\\data\\tmp\\widgets" ]

    ]
};