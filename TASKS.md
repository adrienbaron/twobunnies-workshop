# Tasks for the Workshop

As is, the game is incomplete, you'll need to do various tasks to get it working.
Hopefully this will give you a sense of how cocos2d works.

## Task 1

_Goal_: Load the images of bunnies necessary for the game

In cocos2d, images can be loaded from [spritesheets](https://docs.cocos2d-x.org/cocos2d-x/v3/en/sprites/spritesheets.html).
This repo already contains the necessary images in `res/sprites/`.

Go to `src/app.ts` and search for `// TASK_1`.
Under it, add the code to load the bunnies spritesheet.

To load the spritesheet in the sprite cache you can take example on the `items` one that is already there.
You won't see anything change yet in the game as you need to use the sprite (see task 2).

ℹ️ The file `src/resources.ts` contains a map of the resources paths.

ℹ️ I used [TexturePacker](https://www.codeandweb.com/texturepacker) to create the spritesheets in case you want to create your own.

## Task 2

_Goal_: Use the images from the sprite cache

There is already `BunnySprite` created that extends `cc.Sprite`.
For now it doesn't use any images.

Go to `src/scenes/shared/sprites/bunny.ts` and search for `// TASK_2`.

Change the constructor of `BunnySprite` to use the right image from the `spritesheet` you loaded depending on it's color.

The `super()` call accept a string as parameter which can be the name of a frame from a loaded `spritesheet` prefixed by `#`.

ℹ️ To see which frames are available in the spritesheet you can open `res/sprites/bunnies.plist` in your IDE and look at the `<key>` tags.

## Task 3

_Goal_: Make the bunny hop!

The `startHopAnimation` method from the `BunnySprite` class will be called to make the bunny start it's hoping animation.

Animate Actions in cocos2d are a subset of Actions.
There are various Actions you can do, like moving from a position to another, scaling, changing opacity and more.
See [here](https://docs.cocos2d-x.org/cocos2d-x/v3/en/actions/) for more details on what's possible.

In this case you will want to follow the following steps.

First create a `cc.Animation`:

```typescript
const animation = new cc.Animation(
  [
    cc.spriteFrameCache.getSpriteFrame(`FRAME-01.png`),
    cc.spriteFrameCache.getSpriteFrame(`FRAME-02.png`),
  ], // frames from the sprite cache, that have been loaded from the spritesheet
  0.15 // delay for a frame in s (all time in cocos2d is in seconds)
)
```

You can then turn your animation into an action by wrapping it in `cc.animate(animation : Animation): Animate`:

```typescript
const animateAction = cc.animate(animation)
```

Then you can wrap your Animate Actions in `cc.repeatForever` that will make the animation loop.

```typescript
const infiniteAnimateAction = cc.repeatForever(animateAction)
```

Finally ask the sprite to run the action!

```typescript
this.runAction(infiniteAnimateAction)
```

If you want to spice things up a bit, you can try using `cc.spawn([...actions])` (run all actions from the array in parallel) and `cc.sequence([...actions])` (run actions from the array one after another).
Combining those with `cc.scaleTo(duration, scaleX, scaleY)` would let make the bunny grow up and down as it hops :).

## Task 4

_goal_: Add a Start Playing button

Cocos2d comes preloaded with convenient elements such as a menu with menu items.
Let's use this to create a start playing label.

Go to `src/scenes/start/start-layer.ts` and find `// TASK_4`.

- Create a label using `new cc.LabelTTF(labelText: string, fontName: string, fontSize: number)`
- Create a new `cc.MenuItemLabel`: `new cc.MenuItemLabel(label: cc.LabelTTF, onSelect: () => void)`
  - The callback you pass should call the `startGame` method that will start the game
- Create a menu to contains that item: `new cc.Menu(...items: cc.MenuItem)`
- Finally add the menu to the layer: `this.addChild(node: cc.Node)`

By default the menu will be positioned at the center of the screen.
You can change the `x` or `y` attribute of the menu or the item to change it's position relative to it's parent.

## Task 5

_goal_: Make the bunny change lane

Why did the bunny change lane?
It doesn't really matter, but we want it to happen!

Go to `src/scenes/game/nodes/road.ts` and look for `// TASK_5`.

This file deals with the road for a given bunny.
There are 2 roads in the game scene (therefore: 2Bunnies).
Each roads has 2 lanes (left and right).

The goal of this function is to switch the lane the bunny is currently on.
The lane number is stored in `currentBunnyLane`.

As `cocos2d` is not reactive like React, you'll have to manually update the `x` position of the bunny when you change the lane.

For your convenience, lane `x` centers are already computed in `this.laneCenters[0]` (left) and `this.laneCenters[1]` (right).

You can either set the `x` attribute of the bunny directly, or use the `moveTo` action: `cc.moveTo(duration: number, targetX: number, targetY: number)`.

ℹ️ You can test it works by calling `changeBunnyLane` manually as control is not implemented yet.

## Task 6

_goal_: React to user input

As we want our game to be usable both on desktop and on mobile we are going to deal with 2 methods of input, keyboard and touch.

Go to `src/scenes/game/game-layer.ts` and look for `// TASK_6`.

For keyboard we want to react on left and right key.
The left key (`cc.KEY.left`) should switch the lanes of the left road bunny, and the right key (`cc.KEY.right`) should switch lanes of the right road bunny.

For touch we want to use the location (`touch.getLocationX()`) and the width of the screen (`cc.winSize.width`).
Using both of those we can determine whether the touch was on the left or the right side of the screen.

Once you are done you should be able to control your bunnies by using the keyboard or clicking on the left or right!

## Task 7

_goal_: Add random carrots and bombs

Right now, the game is a bit empty, let's add items!

Go to `src/scenes/game/nodes/road.ts` and look for `// TASK_7`.

There are two items in the game, `carrot` and `bomb`.
They both already have a sprite created: `CarrotSprite` and `BombSprite`.

You need to:

- pick a type of item at random
- Create the right sprite for it
- Position the sprite and add it to the road (hint: `this.addChild()`)
- Push the item in the `this.items` array.
  - The format of items objects in that array is: `{type: 'carrot' | 'bomb', lane: 0 | 1, sprite: cc.Sprite}`

ℹ️ In cocos2d, `0,0` is the bottom left corner. So the top of the screen is `cc.winSize.height`

## Task 8

_goal_: Make it work!

The final task, and it's a big one.
Let's wrap this up by writing the update function that will be called by cocos2d on every frame for each item in our road.

Go to `src/scenes/game/nodes/road.ts` and look for `// TASK_8`.

I've already wrote the code that calls `addRandomItem` at random times.

I've also wrote the loop that calls `updateItem` for each items.
That function must return `true` if we want to keep the item in the `this.items` array, `false` otherwise.

In this `updateItem` function we want to:

- Update the `y` coordinate of our item
  - We can use the constant `scrollSpeed` from the configuration and `dt` the time elapsed since the last frame in seconds
- If our item went off screen
  - If it's a carrot we want to go to game over (as we cannot miss a carrot)
  - If it's a bomb we simply want to remove the item
- If the bunny collide with the item
  - If it's a carrot we want to increase the score and remove the item
  - If it's a bomb we want to go to game over

Careful, to remove an item you need to both remove the sprite from the road (`this`) and return false.

ℹ️ To remove a child sprite you can call `this.removeChild(child: cc.Node)`

ℹ️ To go to game over you can call `this.gameDelegate.onGameOver()`

ℹ️ To increase score you can call `this.gameDelegate.onScoreIncrease()`

ℹ️ To check for collision you can use `cc.rectIntersectsRect(cc.Rect, cc.Rect)` and `mySprite.getBoundingBox(): cc.Rect`.
