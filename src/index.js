import './styles.css';
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import PreloaderScene from './scenes/Preloader';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import InputScene from './scenes/Input';
import Model from './Model';

// const canvas = document.getElementById('game-canvas');
// const model = new Model();
// // this.globals = { model, bgMusic: null  };
// const config = {
//   type: Phaser.WEB_GL,
//   width: 800,
//   height: 600,
//   canvas,
//   // model,
//   // globals,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       // gravity: { y: 400 },
//       debug: true
//     }
//   },

//   scene: [
//     BootScene,
//     PreloaderScene,
//     CreditsScene,
//     GameScene,
//     TitleScene,
//     OptionsScene
//   ]

// };

// window.game = new Game(config);

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 320, // 800,
      height: 240, // 600,
      zoom: 2,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          // debug: true,
          gravity: { y: 0 },
        },
      },
    });
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Input', InputScene);
    this.scene.add('Game', GameScene);
    // this.scene.add('Score', ScoreScene);
    this.scene.add('Options', OptionsScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();