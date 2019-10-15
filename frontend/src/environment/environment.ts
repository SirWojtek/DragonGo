import Constants from "expo-constants";

export interface IEnvironment {
  IS_PRODUCTION: boolean;
  API_HOST: string;
}

const debuggerHost = Constants.manifest.debuggerHost || "";

const envs: { [name: string]: IEnvironment } = {
  local: {
    IS_PRODUCTION: false,
    API_HOST:
      "http://" +
      debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000`)
  }
};

export function getEnv(): IEnvironment {
  return envs.local;
}
