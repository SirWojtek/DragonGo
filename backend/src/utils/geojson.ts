import { Point, Polygon } from 'geojson';
import { LatLng, Rect } from '../models/api/spawn-areas.api';

export function toPoint(latLng: LatLng): Point {
  return {
    type: 'Point',
    coordinates: [latLng.lat, latLng.lng],
  };
}

export function toPolygon(rect: Rect): Polygon {
  return {
    type: 'Polygon',
    coordinates: [
      [
        [rect.southwest.lat, rect.northeast.lng],
        [rect.northeast.lat, rect.northeast.lng],
        [rect.northeast.lat, rect.southwest.lng],
        [rect.southwest.lat, rect.southwest.lng],
      ],
    ],
  };
}
