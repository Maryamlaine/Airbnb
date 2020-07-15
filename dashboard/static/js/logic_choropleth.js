//Creating map object
// Creating map object
const urls = {
  // source: https://observablehq.com/@mbostock/u-s-airports-voronoi
  // source: https://github.com/topojson/us-atlas
  map: "static/data/counties-10m.json",

 
  // price:"postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb",
 choropleth_url: "/choropleth"
  

  // neighborhood: "postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb"
  };


var map = L.map("map", {
    center: [34.052235, -118.243683],
    zoom:10
  }); 

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var LANeighbourhoodsURL = "http://data.insideairbnb.com/united-states/ca/los-angeles/2020-05-08/visualisations/neighbourhoods.geojson";



var geojson;

// Grab data with d3
d3.json(geoData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "neighbourhood",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "k",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Neighbourhood:" + response.features[i].properties.neighbourhood+ "<br>latitude:<br> " + 
      response.features[i].geometry.coordinates[1] + "<br>longitude:<br>" +response.features[i].geometry.coordinates[0]);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Neighbourhood</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});
