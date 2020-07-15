// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "static/data/neighbourhoods.geojson";
console.log(geoData);
var geojson;
//var geoData;
// function myFunc(vars){
//   console.log(vars)
//   return vars
//

//var geodata = document.getElementById(test=geoData)

$.ajax({
  type : "GET",
  url : '/neighborhood',
  dataType: "json",
  //data: JSON.stringify(you can put in a variable in here to send data with the request),
  contentType: 'application/json;charset=UTF-8',
  success: function (response) {
    //console.log(response.length);
    for (var i = 0; i < response.length; i++) {
      console.log(response[i][0]);

        d3.json(geoData, function(response) { 
          geojson = L.choropleth(response, {
          
          // Define what  property in the features to use
          valueProperty: "MHI2016",

          // Set color scale
          scale: ["#ffffb2", "#b10026"],

          // Number of breaks in step range
          steps: 10,

          // q for quartile, e for equidistant, k for k-means
          mode: "q",
          style: {
            // Border color
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
          },

          // Binding a pop-up to each layer
          
          onEachFeature: function(feature, layer) {
            if (feature.properties && feature.properties.neighbourhood){
            //layer.bindPopup(feature.properties.neighbourhood);
            //console.log(feature);
            layer.bindPopup("Neighborhood: " + feature.properties.neighbourhood + "<br>Price:<br>" +
              "$" + response.daily_price + "<br>Review Score:<br>" + response.review_scores_rating);
            }
          }
        }).addTo(myMap);
      });
    }  
  }
});
  // // Set up the legend
//     var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//       var div = L.DomUtil.create("div", "info legend");
//       var limits = geojson.options.limits;
//       var colors = geojson.options.colors;
//       var labels = [];

//       // Add min & max
//       var legendInfo = "<h1>Price</h1>" +
//         "<div class=\"labels\">" +
//           "<div class=\"min\">" + limits[0] + "</div>" +
//           "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//         "</div>";

//       div.innerHTML = legendInfo;

//       limits.forEach(function(limit, index) {
//         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//       });

//       div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//       return div;
//     };

//   // Adding legend to the map
//   legend.addTo(myMap);

//   },
      
// });
  


//console.log(geoData)
//var test = response;
//console.log('CHECK HERE FOR DATA')

// Grab data with d3
// d3.json(url, function(data) {
//   console.log(url.latitude)
//   // Create a new choropleth layer
//   geojson = L.choropleth(data, {

//     // Define what  property in the features to use
//     valueProperty: "MHI2016",

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a pop-up to each layer
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
//         "$" + feature.properties.MHI2016);
//     }
//   }).addTo(myMap);

//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Price</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

//});
