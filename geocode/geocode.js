const request = require('request');

var geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=ai0UmDGwjSGLjx6IM4dqhoXZW0ZWkh7n&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers');
    } else if (body.results[0].providedLocation.location === "" || body.results[0].locations[0].street === "") {
      callback('Not a valid address');
    } else {
      callback(undefined, {
        address: body.results[0].locations[0].street + ' ' + body.results[0].locations[0].adminArea5 + ' ' + body.results[0].locations[0].adminArea1,
        latitude: body.results[0].locations[0].displayLatLng.lat,
        longitude: body.results[0].locations[0].displayLatLng.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;