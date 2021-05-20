import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add loading text to the preload page
    this.add.text(20, 20, 'If the game stuck at loading...Reload Page!', {
      fontSize: '9px',
      fill: '#FFF',
    }).setDepth(5);
    // add background image to the preloader scene
    this.add.image(200, 100, 'bg');

    // add phaser logo
    this.add.image(180, 100, 'logo').setScale(0.5);

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '15px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');
    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('btn-hover', 'assets/buttons/buttonHovered.png');
    
    this.load.image('btn-default', 'assets/buttons/buttonDefault.png');
    this.load.image('dog', 'assets/dog.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('platform', 'assets/stone.png');
    this.load.image('spikes', 'assets/bomb.png');
    this.load.image('sky', 'assets/layers/parallax-mountain-bg.png');
    this.load.image('mountain-far', 'assets/layers/parallax-mountain-montain-far.png');
    this.load.image('mountains', 'assets/layers/parallax-mountain-mountains.png');
    this.load.image('trees', 'assets/layers/parallax-mountain-trees.png');
    this.load.image('trees-far', 'assets/layers/parallax-mountain-foreground-trees.png');

    this.load.image('spacebar', 'assets/buttons/spacebar.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.audio('bgMusic', ['assets/Sounds/lobby.mp3']);
    this.load.audio('gameMusic', ['assets/Sounds/Game.mp3']);
    this.load.audio('jump', ['assets/Sounds/jump.wav']);
    this.load.audio('pickup', ['assets/Sounds/pickup.wav']);
  }

  ready() {
    this.scene.start('Title');
  }
}
