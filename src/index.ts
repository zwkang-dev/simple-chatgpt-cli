import { cac } from 'cac';
import pkgJSON, { version, name } from '../package.json';
import { ask } from './ask';
import { getConfig, setConfig } from './config';
import logger from './logger';
import updateNotifier from 'update-notifier';
import { CHAT_GPT_API_KEY } from './constants';
import { conversation, reset } from './conversation';
import { listEngines } from './engines';

const notifier = updateNotifier({ pkg: pkgJSON });
const cli = cac(name);

function onErrorLogger(err: Error) {
  logger.error(err.message);
  return;
}

process.on('uncaughtException', onErrorLogger);
process.on('unhandledRejection', onErrorLogger);

cli
  .command('ask <text>', 'just send a text to ask chatgpt')
  .action(ask);

cli
  .command('conversation [text]', 'just send a text to ask chatgpt')
  .alias('co')
  .option('--reset', 'reset conversation')
  .action((args, config) => {
    if(config?.reset) {
      reset();
      return;
    }
    if(args) {
      conversation(args);
    }
  })

cli
  .command('read', 'read your chatgpt api key')
  .action(() => logger.success(getConfig(CHAT_GPT_API_KEY)));

cli
  .command('set <your_api_key>', 'set your chatgpt api key')
  .action((args, config) => {
    setConfig(CHAT_GPT_API_KEY, args),logger.success(`success append CHAT_GPT_API_KEY`);
  });

cli
  .command('list-engines')
  .action(listEngines)

cli.version(version);
cli.help();
cli.parse();

notifier.notify();
