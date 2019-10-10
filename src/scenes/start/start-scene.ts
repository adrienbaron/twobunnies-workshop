import { StartLayer } from './start-layer'

interface Props {
  previousScore?: number
}

class StartScene extends cc.Scene {
  constructor({ previousScore }: Props = {}) {
    super()

    this.addChild(new StartLayer({ previousScore }))
  }
}

export { StartScene }
