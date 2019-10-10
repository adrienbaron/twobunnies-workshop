import { RoadNode } from './nodes/road'
import { GameDelegate } from './interfaces'
import { StartScene } from '../start/start-scene'
import { GrassSprite } from '../shared/sprites/grass'

class GameLayer extends cc.Scene implements GameDelegate {
  private score: number = 0
  private gameScoreLabel: cc.LabelTTF
  private leftRoad: RoadNode
  private rightRoad: RoadNode
  private grass: GrassSprite

  constructor() {
    super()

    this.createBackground()
    this.createRoads()
    this.createScoreLabel()
    this.registerControl()
  }

  private createRoads = () => {
    this.leftRoad = new RoadNode({
      bunnyColor: 'white',
      gameDelegate: this,
    })
    this.addChild(this.leftRoad)

    this.rightRoad = new RoadNode({
      bunnyColor: 'brown',
      gameDelegate: this,
    })
    this.rightRoad.x = cc.winSize.width / 2
    this.addChild(this.rightRoad)
  }

  private createScoreLabel = () => {
    this.gameScoreLabel = new cc.LabelTTF('0', 'Arial', 120)
    this.gameScoreLabel.x = cc.winSize.width / 2
    this.gameScoreLabel.y = (cc.winSize.height / 4) * 3
    this.addChild(this.gameScoreLabel, 1)
  }

  private registerControl = () => {
    this.registerControlKeyboard()
    this.registerControlTouch()
  }

  // TASK_6
  private registerControlKeyboard = () => {
    cc.eventManager.addListener(
      {
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: keyCode => {
          // DO SOMETHING HERE
        },
      },
      this
    )
  }

  private registerControlTouch = () => {
    cc.eventManager.addListener(
      {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan: touch => {
          // DO SOMETHING HERE
        },
      },
      this
    )
  }

  private createBackground = () => {
    this.grass = new GrassSprite()
    this.grass.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
    this.grass.startScrolling()

    this.addChild(this.grass)
  }

  onGameOver = () => {
    cc.director.runScene(new StartScene({ previousScore: this.score }))
  }

  onScoreIncrease = () => {
    this.score++
    this.gameScoreLabel.setString(this.score + '')
  }
}

export { GameLayer }
