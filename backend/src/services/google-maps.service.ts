import { Injectable } from '@nestjs/common';
import { createClient, PlaceSearchResult } from '@google/maps';
import { LatLng, Rect } from '../models/api/spawn-areas.api';

const MAX_PAGES = 10;

export interface IPlace {
  name: string;
  viewport: Rect;
}

@Injectable()
export class GoogleMapsService {
  private client = createClient({
    key: 'api key',
    Promise,
  });

  async getPlaces(location: LatLng, radius: number): Promise<IPlace[]> {
    const places: IPlace[] = [];
    const response = await this.client
      .placesNearby({
        location,
        radius,
      })
      .asPromise();

    places.push(...this.convertToPlaces(response.json.results));

    let pagetoken = response.json.next_page_token;
    let i = 0;
    while (pagetoken && i < MAX_PAGES) {
      const page = await this.client
        .placesNearby({ location, pagetoken })
        .asPromise();

      places.push(...this.convertToPlaces(page.json.results));

      pagetoken = page.json.next_page_token;
      i += 1;
      // TODO: log this
    }

    // TODO: log if the limit was reached

    return places;
  }

  private convertToPlaces(results: PlaceSearchResult[]): IPlace[] {
    return results.map(r => ({
      name: r.name,
      viewport: r.geometry.viewport,
    }));
  }
}
