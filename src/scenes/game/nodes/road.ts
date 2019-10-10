import { scrollSpeed } from '../../../config/gameplay'
import { BunnyColor, BunnySprite } from '../../shared/sprites/bunny'
import { BombSprite } from '../sprites/bomb'
import { CarrotSprite } from '../sprites/carrot'
import { bunnyYPosition } from '../../../config/appearance'
import { GameDelegate } from '../interfaces'

interface Props {
  gameDelegate: GameDelegate
  bunnyColor: BunnyColor
}

type LaneNumber = 0 | 1
type ItemType = 'carrot' | 'bomb'

interface Item {
  sprite: cc.Sprite
  lane: LaneNumber
  type: ItemType
}

class RoadNode extends cc.Node {
  private readonly gameDelegate: GameDelegate
  private readonly bunny: BunnySprite
  private readonly laneCenters: number[] = []
  private currentBunnyLane: LaneNumber = 0
  private items: Item[] = []
  private itemTimeBeforeAdd: number = Math.random() * 4

  constructor({ gameDelegate, bunnyColor }: Props) {
    super()

    this.gameDelegate = gameDelegate

    this.width = cc.winSize.width / 2
    this.height = cc.winSize.height

    this.laneCenters[0] = this.width / 4
    this.laneCenters[1] = (this.width / 4) * 3

    this.bunny = new BunnySprite({ bunnyColor })
    this.bunny.x = this.laneCenters[this.currentBunnyLane]
    this.bunny.y = bunnyYPosition
    this.addChild(this.bunny, 1)

    this.bunny.startHopAnimation()

    this.scheduleUpdate()
  }

  changeBunnyLane = () => {
    // TASK_5
  }

  private addRandomItem = () => {
    // TASK_7
  }

  update = (dt: number) => {
    this.updateItems(dt)
  }

  private updateItems = (dt: number) => {
    this.itemTimeBeforeAdd -= dt

    if (this.itemTimeBeforeAdd <= 0) {
      this.addRandomItem()
      this.itemTimeBeforeAdd = 0.6 + Math.random() * 1.5
    }

    this.items = this.items.filter(item => this.updateItem(item, dt))
  }

  private updateItem = ({ sprite, type }: Item, dt: number): boolean => {
    // TASK_8
    return true
  }
}

export { RoadNode }
