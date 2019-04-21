const request = require('request');

// const url = 'https://api.darksky.net/forecast/259be2780a3d21671510c6a5fbea3fdf/37.8267,-122.4233';

// request({url: url, json: true}, (error, response) => {
//   const current = response.body.daily;
//   console.log(`${current.data[0].summary}`);
// });

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoianVsaWFub3BhZGlsaGEiLCJhIjoiY2p1NDV3OTl4MHVsYTQzbnpjN2I0bDdhbCJ9.gQPOKPnC6QQTEWTDaLJnAg';

request({url: geocodeUrl, json: true}, (error, response) => {
  console.log(response.body.features[0].center[1]);
  console.log(response.body.features[0].center[0]);
});