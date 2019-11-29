import { LatLng, Point } from 'react-native-maps';
import { ILocation } from '../store/types/ILocation';

export function locationDistance(c1: ILocation, c2: ILocation): number {
  return pointDistance({ x: c1.lat, y: c1.lng }, { x: c2.lat, y: c2.lng });
}

export function latLngDistance(c1: LatLng, c2: LatLng): number {
  return pointDistance(
    { x: c1.latitude, y: c1.longitude },
    { x: c2.latitude, y: c2.longitude }
  );
}

export function pointDistance(p1: Point, p2: Point): number {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;

  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
