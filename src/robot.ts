import { ChatGPTAPI } from 'chatgpt';

class RobotManager {
  private map: Map<string, ChatGPTAPI> = new Map();

  public registerRobot(apiKey: string) {
    const robot = new ChatGPTAPI({
      apiKey: apiKey,
    });
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
