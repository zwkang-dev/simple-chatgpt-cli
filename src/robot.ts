import OpenAI from 'openai'

class RobotManager {
  private map: Map<string, OpenAI> = new Map();

  public registerRobot(apiKey: string) {
    const configure = {
      apiKey: apiKey,
      baseURL: 'https://api.deepseek.com', 
    }
    const robot = new OpenAI(configure)
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
