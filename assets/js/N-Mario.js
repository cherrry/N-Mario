var scale = 3;
var player, platforms, cursors;
var game = new Phaser.Game(16 * scale * 15, 16 * scale * 12, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {
  game.load.image('sky', 'assets/sprites/sky.png');
  game.load.spritesheet('brick', 'assets/sprites/brick.png', 16, 16);
  game.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);
  game.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();

  // sky
  game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // platform
  platforms = game.add.group();
  platforms.enableBody = true;

  for (var i = 0; i < 15; i++) {
    var ground = platforms.create(i * 16 * scale, game.world.height - 16 * scale, 'land', 1);
    ground.scale.setTo(scale, scale);
    ground.body.immovable = true;
  }

  for (var i = 0; i < 6; i++) {
    var ledge = platforms.create(i * 16 * scale, 8 * 16 * scale, 'brick');
    ledge.scale.setTo(scale, scale);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 0, 1, 2, 3], 6, true);
    ledge.animations.add('question', [4, 5, 6, 7], 4, true);

    ledge.animations.play('brick');

    ledge = platforms.create((14 - i) * 16 * scale, 6 * 16 * scale, 'brick');
    ledge.scale.setTo(scale, scale);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 0, 1, 2, 3], 6, true);
    ledge.animations.add('question', [4, 5, 6, 7], 3, true);

    ledge.animations.play('question');
  }

  // mario
  player = new Mario({ color: 0 }, game, platforms);

}

function update() {
  player.update(cursors.left.isDown, cursors.right.isDown, cursors.up.isDown);
}

function render() {
  // player.debug();
}
