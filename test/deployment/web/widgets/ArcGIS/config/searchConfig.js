/*
Configuration for the individual searches
*/


define({
   

s1: {
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
},


});
