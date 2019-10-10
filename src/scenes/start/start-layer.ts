import { bunnyYPosition } from '../../config/appearance'
import { GameScene } from '../game/game-scene'
import { BunnySprite } from '../shared/sprites/bunny'
import { GrassSprite } from '../shared/sprites/grass'

interface Props {
  previousScore?: number
}

class StartLayer extends cc.Scene {
  constructor({ previousScore }: Props = {}) {
    super()

    this.createBackground()

    const gameTitle = new cc.LabelTTF('2Bunnies', 'Arial', 120)
    gameTitle.setAnchorPoint(cc.p(0.5, 0))
    gameTitle.x = cc.winSize.width / 2
    gameTitle.y = (cc.winSize.height / 4) * 3
    this.addChild(gameTitle)

    if (previousScore >= 0) {
      this.createPreviousScoreLabel(previousScore)
    }

    this.createMenu()
    this.registerControlKeyboard()
  }

  private createPreviousScoreLabel = (previousScore: number) => {
    const previousScoreLabel = new cc.LabelTTF(
      `Score: ${previousScore}`,
      'Arial',
      75
    )
    previousScoreLabel.setAnchorPoint(cc.p(0.5, 1))
    previousScoreLabel.x = cc.winSize.width / 2
    previousScoreLabel.y = (cc.winSize.height / 4) * 3 - 20
    this.addChild(previousScoreLabel)
  }

  private createMenu = () => {
    // TASK_4
  }

  private registerControlKeyboard = () => {
    cc.eventManager.addListener(
      {
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: keyCode => {
          if (keyCode === cc.KEY.enter) {
            this.startGame()
          }
        },
      },
      this
    )
  }

  private startGame = () => {
    cc.director.runScene(new GameScene())
  }

  private createBackground = () => {
    const grass = new GrassSprite()
    grass.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
    grass.startScrolling()
    this.addChild(grass)

    const leftBunny = new BunnySprite({ bunnyColor: 'white' })
    leftBunny.startHopAnimation()
    leftBunny.x = cc.winSize.width / 4
    leftBunny.y = bunnyYPosition
    this.addChild(leftBunny)

    const rightBunny = new BunnySprite({ bunnyColor: 'brown' })
    rightBunny.startHopAnimation()
    rightBunny.x = (cc.winSize.width / 4) * 3
    rightBunny.y = bunnyYPosition
    this.addChild(rightBunny)
  }
}

export { StartLayer }
