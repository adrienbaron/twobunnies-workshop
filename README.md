# cocos2d-X Workshop

This repo contains the code of a simple cocos2d-X game.
The game is called 2Bunnies and is a clone of [2 Cars](https://play.google.com/store/apps/details?id=com.ketchapp.twocars&hl=en_GB).

⚠️ This repo is incomplete, you need to follow the instructions in `TASKS.md` to get an actual game.

## Project structure

The code for the game is contained in the `src` folder.

- `src/app.ts`: The game entry-point. Setup cocos2d and start the start scene.
- `src/config`: Config constants
- `src/scenes`: cocos2d scenes for the game
  - `src/scenes/start`: The start screen
  - `src/scenes/shared`: Shared elements between scenes
  - `src/scenes/game`: The main game screen

## How to run the project

Ensure you have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed then run

### To run on the Web

```bash
yarn install
yarn start
```

Then open your browser on [http://localhost:55555/](http://localhost:55555/)

### To run on the iOS

Ensure you have XCode installed.

First run:

```bash
yarn install
yarn build
```

This will build the JS bundle.

Then open: `frameworks/runtime-src/proj.ios_mac/twobunnies.xcodeproj` with XCode.
Finally select an iOS simulator or your iPhone and hit run.

### To run on Android

⚠️ I haven't tried with this particular project.

Ensure you have Android Studio installed.

First run:

```bash
yarn install
yarn build
```

Then open: `frameworks/runtime-src/proj.android` with Android Studio.
Finally select a device and run.

