import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// NOTE: do NOT use or inject in the production code!
// This class should be only used in test to bypass JWT validation.
@Injectable()
export class NoopStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super((req, callback) => callback(null, true));
  }
}
