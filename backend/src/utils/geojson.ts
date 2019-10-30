import { Point, Polygon } from 'geojson';
import { random, sortBy, uniq } from 'lodash';
import { LatLng, Rect } from '../../../api/spawn-areas.api';

export function toPoint(latLng: LatLng): Point {
  return {
    type: 'Point',
    coordinates: [latLng.lat, latLng.lng],
  };
}

export function toLatLng(point: Point) {
  if (!point.coordinates[0] || !point.coordinates[1]) {
    throw new Error('Invalid point');
  }

  return {
    lat: point.coordinates[0],
    lng: point.coordinates[1],
  };
}

export function toPolygon(rect: Rect): Polygon {
  return {
    type: 'Polygon',
    coordinates: [
      [
        [rect.southwest.lng, rect.northeast.lat],
        [rect.northeast.lng, rect.northeast.lat],
        [rect.northeast.lng, rect.southwest.lat],
        [rect.southwest.lng, rect.southwest.lat],
        [rect.southwest.lng, rect.northeast.lat],
      ],
    ],
  };
}

export function toRect(polygon: Polygon): Rect {
  if (
    !polygon.coordinates ||
    !polygon.coordinates[0] ||
    !polygon.coordinates[0][0]
  ) {
    throw new Error('Invalid polygon');
  }

  const lngs = polygon.coordinates[0].map(c => c[0]);
  const lats = polygon.coordinates[0].map(c => c[1]);
  const uniqLats = sortBy(uniq(lats));
  const uniqLngs = sortBy(uniq(lngs));

  if (uniqLats.length !== 2 || uniqLngs.length !== 2) {
    throw new Error('Invalid polygon');
  }

  return {
    southwest: { lat: uniqLats[0], lng: uniqLngs[0] },
    northeast: { lat: uniqLats[1], lng: uniqLngs[1] },
  };
}

export function generatePointWithinPolygon(polygon: Polygon): Point {
  const rect = toRect(polygon);

  const lat = random(rect.southwest.lat, rect.northeast.lat);
  const lng = random(rect.southwest.lng, rect.northeast.lng);

  return toPoint({
    lat,
    lng,
  });
}
