import { Configuration, OpenAIApi } from 'openai'

class RobotManager {
  private map: Map<string, OpenAIApi> = new Map();

  public registerRobot(apiKey: string) {
    const configure = new Configuration({
      apiKey: apiKey
    })
    const robot = new OpenAIApi(configure)
    this.map.set(apiKey, robot);
    return robot;
  }

  public getRobot(apiKey: string) {
    return this.map.get(apiKey);
  }

  public removeRobot(apiKey: string) {
    this.map.delete(apiKey);
  }
}

export default new RobotManager();
