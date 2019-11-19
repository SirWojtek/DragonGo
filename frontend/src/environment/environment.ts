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
    API_HOST: 'https://dragon-go.d20md.com'
  }
};

export function getEnv(): IEnvironment {
  if (__DEV__) {
    return envs.local;
  } else {
    return envs.prod;
  }
}
