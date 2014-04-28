var platforms;
var game = new Phaser.Game(48 * 15, 48 * 10, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('sky', 'assets/sprites/3x/sky.png');
  game.load.spritesheet('brick', 'assets/sprites/3x/brick.png', 48, 48);
  game.load.spritesheet('mario', 'assets/sprites/3x/mario.png', 32, 32);
}

function create() {
  // sky
  game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // platform
  platforms = game.add.group();
  platforms.enableBody = true;

  for (var i = 0; i < 15; i++) {
    var ground = platforms.create(i * 48, game.world.height - 48, 'brick');
    ground.body.immovable = true;
  }

  for (var i = 0; i < 6; i++) {
    var ledge = platforms.create(i * 48, 5 * 48, 'brick');
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 1, 2, 3], 10, true);
    ledge.animations.add('question', [4, 5, 6, 7], 10, true);

    ledge.animations.play('brick');

    var ledge = platforms.create((14 - i) * 48, 2 * 48, 'brick');
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 1, 2, 3], 10, true);
    ledge.animations.add('question', [4, 5, 6, 7], 10, true);

    ledge.animations.play('question');
  }
}

function update() {
}
