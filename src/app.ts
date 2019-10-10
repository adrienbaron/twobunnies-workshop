import 'core-js';
import { resourcesPathArray, res } from './resources'
import { StartScene } from './scenes/start/start-scene'

const sys = cc.sys
if (!sys.isNative && document.getElementById('cocosLoading'))
  //If referenced loading.js, please remove it
  document.body.removeChild(document.getElementById('cocosLoading'))

// Pass true to enable retina display, on Android disabled by default to improve performance
cc.view.enableRetina(sys.os === sys.OS_IOS)

// Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
if (
  sys.isMobile &&
  sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
  sys.browserType !== sys.BROWSER_TYPE_WECHAT
) {
  cc.view.enableAutoFullScreen(true)
}

// Adjust viewport meta
cc.view.adjustViewPort(true)

// Uncomment the following line to set a fixed orientation for your game
cc.view.setOrientation(cc.ORIENTATION_PORTRAIT)

const originalRatio = 640 / 960
const frameSize = cc.view.getFrameSize()

const resolutionPolicy =
  frameSize.width / frameSize.height > originalRatio
    ? cc.ResolutionPolicy.FIXED_HEIGHT
    : cc.ResolutionPolicy.FIXED_WIDTH

// Setup the resolution policy and design resolution size
cc.view.setDesignResolutionSize(640, 960, resolutionPolicy)

// The game will be resized when browser size change
cc.view.resizeWithBrowserSize(true)

// Load resources then start the game
cc.LoaderScene.preload(resourcesPathArray, () => {
  // Load images in memory
  // TASK_1
  cc.spriteFrameCache.addSpriteFrames(res.itemsPlist)

  cc.director.runScene(new StartScene())
})
