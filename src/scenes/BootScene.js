import { Scene } from 'phaser';

class BootScene extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Load any assets here from your assets directory
    this.load.image('bg', 'assets/fairy-background-craft-pixel.png');
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}

export default BootScene;