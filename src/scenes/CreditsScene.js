import 'phaser';
 
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }
 
  preload () {
  }
 
  create () {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Placeholder', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(800/2, 600/2, 800, 600);
 
    Phaser.Display.Align.In.Center(
    this.creditsText,
    this.zone
    );
 
    Phaser.Display.Align.In.Center(
    this.madeByText,
    this.zone
    );
 
    this.madeByText.setY(1000);

3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
this.creditsTween = this.tweens.add({
  targets: this.creditsText,
  y: -100,
  ease: 'Power1',
  duration: 3000,
  delay: 1000,
  onComplete: function () {
    this.destroy;
  }
});
 
this.madeByTween = this.tweens.add({
  targets: this.madeByText,
  y: -300,
  ease: 'Power1',
  duration: 8000,
  delay: 1000,
  onComplete: function () {
    this.madeByTween.destroy;
    this.scene.start('Title');
  }.bind(this)
});
  }
};