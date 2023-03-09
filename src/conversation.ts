
import { checkApiKey } from './checkApiKey';
import { getConfig, setConfig } from './config';
import logger from './logger';
import debug from 'debug';

import type { ChatCompletionRequestMessage } from 'openai'
import apiManager from './apiManager';

const LATEST_CONVERSATION = 'latestConversation';

const debugLogger = debug('ask:module');

export async function conversation(askText: string) {
  const apiKey = getConfig<string | undefined>('CHAT_GPT_API_KEY');
  debugLogger('apiKey: %s', apiKey);
  checkApiKey(apiKey, true);
  const list = getConfig<any[]>(LATEST_CONVERSATION) || [];
  const answer = await apiManager.createChatCompletion(apiKey!, {
    messages: [...list, { role: 'user', content: askText}],
    max_tokens: 2048,
    model: 'gpt-3.5-turbo',
    stream: false
  })

  if(typeof answer === 'undefined') {
    logger.info('no answer')
    return;
  }

  setConfig(LATEST_CONVERSATION, [...(getConfig<ChatCompletionRequestMessage[]>(LATEST_CONVERSATION) || []), {
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