import { Point } from 'react-native-maps';

export function pointDistance(p1: Point, p2: Point): number {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;

  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
