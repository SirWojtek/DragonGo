import Constants from 'expo-constants';

export interface IEnvironment {
  IS_PRODUCTION: boolean;
  API_HOST: string;
}

const debuggerHost = Constants.manifest.debuggerHost || '';

const envs: { [name: string]: IEnvironment } = {
  local: {
    IS_PRODUCTION: false,
    API_HOST: 'http://' + debuggerHost.split(`:`)[0].concat(`:3000`)
  },
  prod: {
    IS_PRODUCTION: true,
    API_HOST: 'http://dragon-go.d20md.com'
  }
};

export function getEnv(): IEnvironment {
  if (!__DEV__ || process.env.NODE_ENV === 'remote') {
    return envs.prod;
  } else {
    return envs.local;
  }
}
