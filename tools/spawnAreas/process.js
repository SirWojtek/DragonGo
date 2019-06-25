#!/bin/node

const fs = require('fs');


places2 = JSON.parse(fs.readFileSync('places2.json'));
places3 = JSON.parse(fs.readFileSync('places3.json'));

function generateLat(viewport) {
  const min = Math.min(viewport.northeast.lat, viewport.southwest.lat);
  const diff = Math.abs(viewport.northeast.lat - viewport.southwest.lat);

  return min + diff * Math.random();
}

function generateLng(viewport) {
  const min = Math.min(viewport.northeast.lng, viewport.southwest.lng);
  const diff = Math.abs(viewport.northeast.lng - viewport.southwest.lng);

  return min + diff * Math.random();
}

function generateMonsters(place) {
  return [ "1", "2", "3", "4", "5", "6", "7" ,"8" ]
    .map(id => ({
      id,
      location: {
        latitude: generateLat(place.geometry.viewport),
        longitude: generateLng(place.geometry.viewport),
      }
    }));
}

let counter = 0;
function mapPlaces(place) {
  return {
    viewport: {
      northeast: {
        latitude: place.geometry.viewport.northeast.lat,
        longitude: place.geometry.viewport.northeast.lng
      },
      southwest: {
        latitude: place.geometry.viewport.southwest.lat,
        longitude: place.geometry.viewport.southwest.lng
      }
    },
    name: place.name,
    monsters: generateMonsters(place),
    id: String(counter++),
  };
}

const merged = [
  ...places2.map(mapPlaces),
  ...places3.map(mapPlaces),
];

fs.writeFileSync('./spawn-areas.json', JSON.stringify(merged));
