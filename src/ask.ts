import { checkApiKey } from './checkApiKey';
import { getConfig } from './config';
import logger from './logger';
import debug from 'debug';
import apiManager from './apiManager';

const debugLogger = debug('ask:module');

export async function ask(askText: string) {
  const apiKey = getConfig<string | undefined>('CHAT_GPT_API_KEY');
  debugLogger('apiKey: %s', apiKey);
  checkApiKey(apiKey, true);
  const answer = await apiManager.createCompletion(apiKey!, {
    prompt: askText,
    max_tokens: 1000,
    model: "text-davinci-003",
  })

  if(typeof answer === 'undefined') {
    logger.success(`no answer`)
    return;
  }

  logger.success(answer)
  return answer;
}