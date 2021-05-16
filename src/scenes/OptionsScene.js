import 'phaser';
import Button from '../objects/Button'
 
export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }
 
  preload () {
  }
 
create () {
  this.model = this.sys.game.globals.model;
 
this.text = this.add.text(100, 30, 'Options', { fontSize: 20 });
this.musicButton = this.add.image(100, 100, 'checkedBox').setScale(.5);
this.musicText = this.add.text(120, 90, 'Music Enabled', { fontSize: 16 });
 
this.soundButton = this.add.image(100, 135, 'checkedBox').setScale(.5);
this.soundText = this.add.text(120, 125, 'Sound Enabled', { fontSize: 16 });
 
this.musicButton.setInteractive();
this.soundButton.setInteractive();
 
this.musicButton.on('pointerdown', function () {
  this.model.musicOn = !this.model.musicOn;
  // this.musicOn = !this.musicOn;
  this.updateAudio();
}.bind(this));
 
this.soundButton.on('pointerdown', function () {
  this.model.soundOn = !this.model.soundOn;
  // this.soundOn = !this.soundOn;
  this.updateAudio();
}.bind(this));
this.updateAudio();

this.gameButton = new Button(this, 160, 200, 'btn-default', 'btn-hover', 'Menu', 'Title');
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
     
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
};