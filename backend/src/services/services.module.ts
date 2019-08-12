import { Module } from '@nestjs/common';
import { GoogleMapsService } from './google-maps.service';
import { ConfigService } from './config.service';

if (!process.env.NODE_ENV) {
  throw new Error('Unrecognized environment');
}

@Module({
  providers: [
    GoogleMapsService,
    {
      provide: ConfigService,
      useValue: new ConfigService(`environment/${process.env.NODE_ENV}.env`),
    },
  ],
  exports: [GoogleMapsService, ConfigService],
})
export class ServicesModule {}
