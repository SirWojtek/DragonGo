import Constants from 'expo-constants';
import { LatLng } from 'react-native-maps';

export interface IEnvironment {
  IS_PRODUCTION: boolean;
  API_HOST: string;
  INITIAL_LOCATION?: LatLng;
  SPAWN_AREA_FETCH_DISTANCE: number;
}

const debuggerHost = Constants.manifest.debuggerHost || '';

const envs: { [name: string]: IEnvironment } = {
  local: {
    IS_PRODUCTION: false,
    API_HOST: 'http://' + debuggerHost.split(`:`)[0].concat(`:3000`),
    INITIAL_LOCATION: {
      // scianka
      latitude: 51.086437,
      longitude: 17.051632
      // dom
      // latitude: 51.301637,
      // longitude: 17.068423
    },
    SPAWN_AREA_FETCH_DISTANCE: 100
  },
  prod: {
    IS_PRODUCTION: true,
    API_HOST: 'https://dragon-go.d20md.com',
    SPAWN_AREA_FETCH_DISTANCE: 100
  }
};

export function getEnv(): IEnvironment {
  if (__DEV__) {
    return envs.local;
  } else {
    return envs.prod;
  }
}
