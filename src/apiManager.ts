import { blueBright } from "colorette";
import ora from "ora";
import logger from "./logger";
import robot from "./robot";

type IOptions = {
  throwError: boolean
  loggerError?: ((val: unknown) => void) | Boolean;
}

const defaultOpts: IOptions = {
  throwError: false,

  loggerError: false,
}

const spinner = ora(blueBright('loading ask response...'));

function isBool(val: unknown): val is Boolean {
  return typeof val === 'boolean'
}

type PickTaskOrPromiseReturnValue<T> = 
  T extends (...args: any[]) => Promise<infer R> ? R :
  T extends (...args: any[]) => infer R ? R :
  T extends Promise<infer R> ? R :
  never;


async function executeTask<T 
  extends ((...arg:any) => any | Promise<any>) | Promise<any>
>(task: T, opts: IOptions = defaultOpts): Promise<PickTaskOrPromiseReturnValue<T> | undefined> {
  const { throwError, loggerError } = opts;
  try {
    spinner.start();
    if('then' in task) {
      return await task;
    }
    const fn = task();
    if('then' in fn) {
      return await fn;
    }
    return fn();
  }catch(e) {
    
    if(isBool(loggerError) && loggerError) {
      spinner.clear();
      spinner.stop(); 
      if(e instanceof Error) {
        logger.error(e.message)
      }
    }

    if(!isBool(loggerError) && loggerError) {
      loggerError(e);
    }
    if(throwError) {
      throw e;
    }
  }finally {
    spinner.clear();
    spinner.stop();
  }
}


function robotChecker(robot: unknown) {
  if(!robot) {
    logger.info('robot is not registered');
    throw new Error('robot is not registered');
  }
}

class ApiManager {

  public async createCompletion(apiKey: string, params: any) {
    let robotIns = null;
    if (apiKey) {
      robotIns = robot.registerRobot(apiKey);
    }
    robotChecker(robotIns);

    console.log(robotIns, params)

    const robotInstance = robotIns!;
    const data = await executeTask(robotInstance.chat.completions.create(params));
    return data?.choices[0].message.content ?? '';
  }

  // public async createChatCompletion(apiKey: string, params: any) {
  //   let robotIns = null;
  //   if (apiKey) {
  //     robotIns = robot.registerRobot(apiKey);
  //   }
  //   robotChecker(robotIns);

  //   const robotInstance = robotIns!;
  //   const data = await executeTask(robotInstance.chat.completions.create(params));
  //   return data?.choices[0]?.message?.content ?? '';
  // }
}


export default new ApiManager();