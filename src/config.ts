import { Configure } from 'json-configure';

const config = new Configure();

export function setConfig<T>(key: string, value: T) {
  config.write(key, value);
}

export function getConfig<T>(key: string): T {
  return config.read(key) as T;
}
