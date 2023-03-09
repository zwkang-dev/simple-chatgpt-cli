
import { checkApiKey } from './checkApiKey';
import { getConfig } from './config';
import logger from './logger';
import debug from 'debug';
import apiManager from './apiManager';

const debugLogger = debug('ask:module');

export async function listEngines() {
  const apiKey = getConfig<string | undefined>('CHAT_GPT_API_KEY');
  debugLogger('apiKey: %s', apiKey);
  checkApiKey(apiKey, true);

  const engines = await apiManager.listEngines(apiKey!);

  if(typeof engines === 'undefined') {
    logger.success(`no engines`)
    return;
  }

  logger.table(engines);
  return engines;
}