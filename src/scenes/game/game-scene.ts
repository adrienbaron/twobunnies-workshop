import { GameLayer } from './game-layer'

class GameScene extends cc.Scene {
  constructor() {
    super()

    this.addChild(new GameLayer())
  }
}

export { GameScene }
