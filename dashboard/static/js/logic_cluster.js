// Creating map object
const urls = {
  // source: https://observablehq.com/@mbostock/u-s-airports-voronoi
  // source: https://github.com/topojson/us-atlas
  map: "static/data/counties-10m.json",

 
  // price:"postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb",
  heatmap_url: "/heatmap",
  cluster_url :"/cluster"

  // neighborhood: "postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb"
  };

    // Assemble API query URL
var LANeighbourhoodsURL = "http://data.insideairbnb.com/united-states/ca/los-angeles/2020-05-08/visualisations/neighbourhoods.geojson";

var myMap = L.map("map", {
    center:  [34.052235, -118.243683],
    zoom: 10
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v9",
    accessToken: API_KEY
  }).addTo(myMap);
  

  
  // Grab the data with d3
  d3.json(LANeighbourhoodsURL, function(response) {
  
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < response.features.length; i++) {
      if (response.features[i].properties.neighbourhood) {    
  
      // Set the data location property to a variable
      var location = response.features[i].geometry;
  
      // Check for location property
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
          .bindPopup(response.features[i].properties.neighbourhood));
      }
  
    }
    }
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });
  