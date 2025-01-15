
import { checkApiKey } from './checkApiKey';
import { getConfig, setConfig } from './config';
import logger from './logger';
import debug from 'debug';

import apiManager from './apiManager';

const LATEST_CONVERSATION = 'latestConversation';

const debugLogger = debug('ask:module');

export async function conversation(askText: string, opts: {prefixSystem: any} = { prefixSystem : []}) {
  const apiKey = getConfig<string | undefined>('CHAT_GPT_API_KEY');
  debugLogger('apiKey: %s', apiKey);
  checkApiKey(apiKey, true);
  const list = getConfig<any[]>(LATEST_CONVERSATION) || [];
  opts?.prefixSystem && opts?.prefixSystem?.length > 0 && list.unshift(opts.prefixSystem);
  const answer = await apiManager.createCompletion(apiKey!, {
    messages: list.concat([{ role: 'user', content: askText}]),
    model: 'deepseek-chat',
  })

  if(typeof answer === 'undefined') {
    logger.info('no answer')
    return;
  }

  setConfig(LATEST_CONVERSATION, [...(getConfig<{role: string, content: string}[]>(LATEST_CONVERSATION) || []), {
    role: 'user',
    content: askText
  }, {
    role: 'assistant',
    content: answer
  }])

  logger.success(answer)
  return answer;
}

export async function reset() {
  setConfig(
    LATEST_CONVERSATION,
    []
  );
  logger.success('重置聊天上下文成功')
}