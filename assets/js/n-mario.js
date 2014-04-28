var platforms;
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('sky', 'assets/sprites/3x/sky.png');
  game.load.spritesheet('brick', 'assets/sprites/3x/brick.png', 48, 48);
  game.load.spritesheet('mario', 'assets/sprites/3x/mario.png', 32, 32);
}

function create() {
  // sky
  game.add.tileSprite(0, 0, 800, 600, 'sky');
}

function update() {
}
