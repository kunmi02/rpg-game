import 'phaser';
import Button from '../objects/Button'
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  preload () {
  }
 
  create () {
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.gameButton = new Button(this, 400, 100, 'btn-default', 'btn-hover', 'Credits', 'Credits');
    this.gameButton = new Button(this, 400, 200, 'btn-default', 'btn-hover', 'Play', 'Game');
    this.gameButton = new Button(this, 400, 300, 'btn-default', 'btn-hover', 'Options', 'Options');
    this.gameButton = new Button(this, 400, 400, 'btn-default', 'btn-hover', 'Scoreboard', 'Score');
    // this.gameButton = new Button(this, 400, 100, 'btn-default', 'btn-hover', 'Credits', 'Credits');
  }
}