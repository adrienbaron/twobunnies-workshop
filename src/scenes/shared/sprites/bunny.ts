type BunnyColor = 'white' | 'brown'

interface Props {
  bunnyColor: BunnyColor
}

class BunnySprite extends cc.Sprite {
  bunnyColor: string

  constructor({ bunnyColor }: Props) {
    // TASK_2
    super()

    this.bunnyColor = bunnyColor
    this.scale = 3.5
  }

  startHopAnimation = () => {
    // TASK_3
  }
}

export { BunnySprite, BunnyColor }
