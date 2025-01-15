import { cac } from 'cac';
import pkgJSON, { version, name } from '../package.json';
import { ask } from './ask';
import { getConfig, setConfig, delConfig, allConfig } from './config';
import logger from './logger';
import updateNotifier from 'update-notifier';
import { CHAT_GPT_API_KEY } from './constants';
import { conversation, reset } from './conversation';

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
    setConfig(CHAT_GPT_API_KEY, args);
    logger.success(`success append CHAT_GPT_API_KEY`);
  });

cli
  .command('store <key> <value>', 'store your key and value')
  .action((key, value) => {
    setConfig(key,value);
    logger.success(`success append ${key}`);
  });

cli
  .command('remove-store <key>', 'remove your key store value')
  .action((key) => {
    delConfig(key);
    logger.success(`success remove ${key}`);
  });

cli
  .command('show-store', 'show your key store value')
  .action(() => {
    logger.success(JSON.stringify(allConfig()));
  });

cli.version(version);
cli.help();
cli.parse();

notifier.notify();
