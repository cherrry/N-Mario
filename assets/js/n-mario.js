var player, platforms, cursors;
var game = new Phaser.Game(48 * 15, 48 * 10, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

function preload() {
  game.load.image('sky', 'assets/sprites/1x/sky.png');
  game.load.spritesheet('brick', 'assets/sprites/1x/brick.png', 16, 16);
  game.load.spritesheet('mario', 'assets/sprites/1x/mario.png', 32, 32);
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
    var ground = platforms.create(i * 48, game.world.height - 48, 'brick');
    ground.scale.setTo(3, 3);
    ground.body.immovable = true;
  }

  for (var i = 0; i < 6; i++) {
    var ledge = platforms.create(i * 48, 5 * 48, 'brick');
    ledge.scale.setTo(3, 3);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 1, 2, 3], 5, true);
    ledge.animations.add('question', [4, 5, 6, 7], 5, true);

    ledge.animations.play('brick');

    var ledge = platforms.create((14 - i) * 48, 2 * 48, 'brick');
    ledge.scale.setTo(3, 3);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 1, 2, 3], 5, true);
    ledge.animations.add('question', [4, 5, 6, 7], 5, true);

    ledge.animations.play('question');
  }

  // mario
  player = game.add.sprite(0, 0, 'mario');
  game.physics.arcade.enable(player);

  player.body.gravity.y = 800;
  player.body.collideWorldBounds = true;

  player.scale.setTo(3, 3);

  player.animations.add('walk', [3, 5, 6, 7, 2], 5, true);
  player.animations.play('walk');
  player.anchor.setTo(0.5, 0.5);

}

function update() {
  game.physics.arcade.collide(player, platforms);

  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    // move to left
    player.body.velocity.x = -300;
    player.animations.play('walk');
    player.scale.x = -3;

  } else if (cursors.right.isDown) {
    // move to right
    player.body.velocity.x = 300;
    player.animations.play('walk');
    player.scale.x = 3;

  } else {
    // stand still
    player.animations.stop();
    player.frame = 2;
  }

  if (cursors.up.isDown && player.body.touching.down) {
    // jump
    player.body.velocity.y = -800;
  }
}
