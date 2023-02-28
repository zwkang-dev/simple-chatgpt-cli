import logger from './logger';

export function checkApiKey(apiKey: unknown, needExpose = false): apiKey is string {
  if (!apiKey) {
    if (needExpose) {
      throw new Error('CHAT_GPT_API_KEY is not set');
    }
    logger.error('CHAT_GPT_API_KEY is not set');
    return false;
  }

  return true;
}
