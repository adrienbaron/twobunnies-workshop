import { res } from '../../../resources'
import { scrollSpeed } from '../../../config/gameplay'

const TEXTURE_HEIGHT = 64

class GrassSprite extends cc.Sprite {
  scrollShiftY: number = 0
  originalY: number = 0

  constructor() {
    super(res.grassPng)

    this.width = cc.winSize.width
    this.height = cc.winSize.height + TEXTURE_HEIGHT * 2
    this.setTextureRect(cc.rect(0, 0, this.width, this.height))
    this.getTexture().setTexParameters({
      minFilter: cc.LINEAR,
      magFilter: cc.LINEAR,
      wrapS: cc.REPEAT,
      wrapT: cc.REPEAT,
    })
  }

  startScrolling = () => {
    this.scheduleUpdate()
    this.originalY = this.y
  }

  update = (dt: number) => {
    this.scrollShiftY = (this.scrollShiftY + scrollSpeed * dt) % TEXTURE_HEIGHT
    this.y = this.originalY - this.scrollShiftY
  }
}

export { GrassSprite }
