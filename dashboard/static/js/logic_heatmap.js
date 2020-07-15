const urls = {
  // source: https://observablehq.com/@mbostock/u-s-airports-voronoi
  // source: https://github.com/topojson/us-atlas
  map: "static/data/counties-10m.json",

 
  // price:"postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb",
  heatmap_url: "/heatmap",
  cluster_url :"/cluster"

  // neighborhood: "postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb"
  };
  // const svg  = d3.select("svg");
  // const width  = parseInt(svg.attr("width"));
  // const height = parseInt(svg.attr("height"));
  // const hypotenuse = Math.sqrt(width * width + height * height);
  
  // // must be hard-coded to match our topojson projection
  // // source: https://github.com/topojson/us-atlas
  // const projection = d3.geoAlbers().scale(1280).translate([480, 300]);
  
var LANeighbourhoodsURL = "http://data.insideairbnb.com/united-states/ca/los-angeles/2020-05-08/visualisations/neighbourhoods.geojson";

var map = L.map("map", {
    center: [34.052235, -118.243683],
    zoom:10
  }); 


L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v9",
    accessToken: API_KEY
}).addTo(map);

d3.json(LANeighbourhoodsURL, function(data) {
    response = data.features;
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].geometry;
        console.log(location);
  
      if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 25,
      maxZoom: 12,
      minOpacity: 0.5,
      radius: 10,
      max: 1,
      blur: 10,
      gradient: {
          0: "#000000",
          0.2: "#570000",
          0.4: "#ff0000",
          0.6: "#ffc800",
          0.8: "#ffff00",
          "1.0": "#FFFFFF" ,
      }
  }).addTo(map)
});