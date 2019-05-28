/* 
This configuration file is used to load the approriate libraries for the ArcGIS JS API, which 
is also built upon the Dojo Framework. All "require" calls that are made for ESRI components
should include this configuration -- it will tell the Dojo Loader where to look for the libraries
that start with <name>.  Otherwise, Mendix looks for them under mxclientsystem
*/


define({
    packages: [{
            name: "esri",
            location: 'https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/jsapi/jsapi/esri'
        },
        {
            name: "dojox",
            location: 'https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/jsapi/jsapi/dojox'
        },
        {
            name: "dojo",
            location: 'https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/jsapi/jsapi/dojo'
        },
        {
            name: "moment",
            location: 'https://dsraenterprise2.canadacentral.cloudapp.azure.com/portal/jsapi/jsapi/moment'
        },
    ]
});
