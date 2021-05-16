import Phaser from 'phaser';
import { Align } from '../util/align';
import scoreSystem from '../score/API';
import createBoyAnims from '../anims/Boy';
import gameOptions from '../Objects/gameOptions';
class GameScene extends Phaser.Scene {

  constructor() {
    super("Game");
  }

preload () {
}

create() {
  // create the map
  const map = this.make.tilemap({ key: 'map' });

  // first parameter is the name of the tilemap in tiled
  var tiles = map.addTilesetImage('spritesheet', 'tiles');
        
  // creating the layers
  var grass = map.createLayer('Grass', tiles, 0, 0);
  var obstacles = map.createLayer('Obstacles', tiles, 0, 0);
  
  // make all tiles in obstacles collidable
  obstacles.setCollisionByExclusion([-1]);

  // don't go out of the map
  this.player = this.physics.add.sprite(50, 100, 'dude', 4).setScale(.5);
  this.physics.world.bounds.width = map.widthInPixels;
  this.physics.world.bounds.height = map.heightInPixels;
  this.player.setCollideWorldBounds(true);

  // limit camera to map
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(this.player);
  this.cameras.main.roundPixels = true;

  createBoyAnims(this.anims);

  this.cursors = this.input.keyboard.createCursorKeys();

  // don't walk on trees
  this.physics.add.collider(this.player, obstacles);

  // where the enemies will be
  this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);            
        }        
        this.physics.add.overlap(this.player, this.spawns, this.BombZone, false, this);


        this.gameitems = this.physics.add.group();

	for (var i = 0; i < 20; i++) {
		var x = Phaser.Math.RND.between(0, 800);
		var y = Phaser.Math.RND.between(0, 300);

		this.gameitems.create(x, y, 'star').setScale(.5);
	}
  
  this.score = 0;
  this.scoreText = this.add.text(10, 7, 'Score: 0', {
      fontSize: '12px',
      fill: '#000',
    }).setDepth(3);

  
  
  this.physics.add.overlap(this.player, this.gameitems, this.collectStar, null, this);

  this.physics.add.collider(this.gameitems, obstacles);

  

}

update(){
  this.scoreText.setScrollFactor(0, 0);
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
          this.player.anims.play('left', true);
          this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
          this.player.anims.play('right', true);
          this.player.body.setVelocityX(80);
        }
 
        // Vertical movement
        else if (this.cursors.up.isDown)
        {
          this.player.anims.play('up', true);
          this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
          this.player.anims.play('down', true);
          this.player.body.setVelocityY(80);
        }  
        else {
          this.player.anims.stop();
          this.player.body.setVelocity(0);
        }  
}


BombZone(player, zone) {        
	// bomb Zone
  zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
  zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
  
  // shake the world
  // this.cameras.main.shake(800);
  // player.setTint(0xff0000);
  // this.physics.pause();
  
  this.add.text(80, 100, 'GAME OVER!!', {
    fontSize: '30px',
    fill: '#FF0000',
  }).setDepth(5);

  this.endGame(player, this.score)
  // this.startScene(true)
    }

collectStar (player, star)
{
    star.disableBody(true, true);
    this.score += 100;
    this.scoreText.setText('Score: ' + this.score);
}
endGame(player){
  this.cameras.main.shake(900);
  player.setTint(0xff0000);
  this.physics.pause();
  scoreSystem.scorer(this.score);
//   scoreSystem.namer()
//   if (this.score > 0){
//   scoreSystem.postScores();
// }
this.time.addEvent({
  delay: 3000,
  loop: false,
  callback: () => {
      this.scene.start("Input");
  }
})
}

}
export default GameScene;