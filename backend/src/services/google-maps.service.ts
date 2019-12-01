import {
  createClient,
  GoogleMapsClient,
  PlaceSearchResult,
  PlacesNearbyRequest,
} from '@google/maps';
import { Injectable, Logger } from '@nestjs/common';
import { msleep } from 'sleep';
import { LatLng, Rect } from '../../../api/spawn-areas.api';
import { ConfigKeyEnum, ConfigService } from './config.service';

export interface IPlace {
  id: string;
  name: string;
  viewport: Rect;
}

@Injectable()
export class GoogleMapsService {
  private client: GoogleMapsClient;

  private logger = new Logger(GoogleMapsService.name);

  constructor(private configService: ConfigService) {
    this.client = createClient({
      key: this.configService.get(ConfigKeyEnum.GOOGLE_MAPS_API_KEY) as string,
      rate: { limit: 50 },
      Promise,
    });
  }

  async getPlaces(location: LatLng, radius: number): Promise<IPlace[]> {
    const places: IPlace[] = [];
    const response = await this.client
      .placesNearby({
        location,
        radius,
        type: 'park',
      })
      .asPromise();

    places.push(...this.convertToPlaces(response.json.results));

    let pagetoken = response.json.next_page_token;
    let i = 0;
    while (
      pagetoken &&
      i < this.configService.get(ConfigKeyEnum.GOOGLE_MAPS_MAX_PAGES)
    ) {
      // NOTE: it takes some time until the pagetoken becomes valid (from docs)
      // so we need to wait a bit.
      msleep(1000);

      const page = await this.client
        .placesNearby({ pagetoken } as PlacesNearbyRequest)
        .asPromise();

      places.push(...this.convertToPlaces(page.json.results));

      pagetoken = page.json.next_page_token;
      i += 1;
      this.logger.log(`Google Maps page: ${i + 1}`);
    }

    return places;
  }

  private convertToPlaces(results: PlaceSearchResult[]): IPlace[] {
    return results.map(r => ({
      id: r.place_id,
      name: r.name,
      viewport: r.geometry.viewport,
    }));
  }
}
