/* 
This configuration file is used to load the approriate libraries for the ArcGIS JS API, which 
is also built upon the Dojo Framework. All "require" calls that are made for ESRI components
should include this configuration -- it will tell the Dojo Loader where to look for the libraries
that start with <name>.  Otherwise, Mendix looks for them under mxclientsystem
*/


// pull the libraries from dsraenterprise2
//var libraryURL = "https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/jsapi/jsapi/";

// pull the libraries from the official CDN
var libraryURL = "https://js.arcgis.com/3.28/"

define({
    packages: [{
            name: "esri",
            location: libraryURL + 'esri'
        },
        {
            name: "dojox",
            location: libraryURL + 'dojox'
        },
        {
            name: "dojo",
            location: libraryURL + 'dojo'
        },
        {
            name: "moment",
            location: libraryURL + 'moment'
        },
    ]
});
