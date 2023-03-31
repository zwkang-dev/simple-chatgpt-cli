import { Configure } from 'json-configure';

const config = new Configure();

export function setConfig<T>(key: string, value: T) {
  config.write(key, value);
}

export function delConfig(key: string) {
  config.del(key);
}

export function getConfig<T>(key: string): T {
  return config.read(key) as T;
}

export function allConfig() {
  return config.all();
}
