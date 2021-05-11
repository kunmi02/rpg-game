import Phaser from 'phaser';

const createBoyAnims = (anims = Phaser.Animations.AnimationManager) => {
  // anims.create({
  //   key: 'walk',
  //   frames: anims.generateFrameNames('boy', {
  //     prefix: 'p1_walk0',
  //     suffix: '.png',
  //     end: 5,
  //   }),
  //   frameRate: 8,
  // });

  anims.create({
    key: 'down',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 10,
  });
  anims.create({
    key: 'right',
    frames: anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

anims.create({
    key: 'up',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 10
});

anims.create({
    key: 'left',
    frames: anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
});
};
export default createBoyAnims;