class BombSprite extends cc.Sprite {
  constructor() {
    super('#bomb.png')

    this.scale = 0.8
    this.setAnchorPoint(cc.p(0.5, 0))
  }
}

export { BombSprite }
