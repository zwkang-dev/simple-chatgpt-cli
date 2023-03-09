import { blueBright } from "colorette";
import { CreateChatCompletionRequest, CreateCompletionRequest } from "openai";
import ora from "ora";
import logger from "./logger";
import robot from "./robot";

type IOptions = {
  throwError: boolean
}

const defaultOpts: IOptions = {
  throwError: false
}

const spinner = ora(blueBright('loading ask response...'));

type PickTaskOrPromiseReturnValue<T> = 
  T extends (...args: any[]) => Promise<infer R> ? R :
  T extends (...args: any[]) => infer R ? R :
  T extends Promise<infer R> ? R :
  never;


async function executeTask<T 
  extends ((...arg:any) => any | Promise<any>) | Promise<any>
>(task: T, opts: IOptions = defaultOpts): Promise<PickTaskOrPromiseReturnValue<T> | undefined> {
  const { throwError } = opts;
  try {
    spinner.start();
    if('then' in task) {
      return await task;
    }
    const fn = task();
    if('then' in fn) {
      return await fn();
    }
    return fn();
  }catch(e) {
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
  public async listEngines(apiKey?: string) {
    let robotIns = null;
    if (apiKey) {
      robotIns = robot.registerRobot(apiKey);
    }

    robotChecker(robotIns);

    const robotInstance = robotIns!;
    const data = await executeTask(robotInstance.listEngines);
    return data?.data.data;
  }

  public async createCompletion(apiKey: string, params: CreateCompletionRequest) {
    let robotIns = null;
    if (apiKey) {
      robotIns = robot.registerRobot(apiKey);
    }
    robotChecker(robotIns);

    const robotInstance = robotIns!;
    const data = await executeTask(robotInstance.createCompletion(params));
    const msg = data?.data.choices[0].text;
    return msg;
  }

  public async createChatCompletion(apiKey: string, params: CreateChatCompletionRequest) {
    let robotIns = null;
    if (apiKey) {
      robotIns = robot.registerRobot(apiKey);
    }
    robotChecker(robotIns);

    const robotInstance = robotIns!;
    const data = await executeTask(robotInstance.createChatCompletion(params));
    const msg = data?.data.choices[0].message?.content;
    return msg;
  }
}


export default new ApiManager();