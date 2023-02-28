import { checkApiKey } from './checkApiKey';
import { getConfig } from './config';
import logger from './logger';
import robot from './robot';
import ora from 'ora';
import { blueBright } from 'colorette';
import debug from 'debug';

const spinner = ora(blueBright('loading ask response...'));
const debugLogger = debug('ask:module');

export async function ask(askText: string) {
  const apiKey = getConfig<string | undefined>('CHAT_GPT_API_KEY');
  debugLogger('apiKey: %s', apiKey);

  checkApiKey(apiKey, true);
  const robotInstance = robot.registerRobot(apiKey as string);
  spinner.start();
  try {
    const { text } = await robotInstance.sendMessage(askText);
    logger.success(text);
    return text;
  }finally {
    spinner.stop();
  }
}
