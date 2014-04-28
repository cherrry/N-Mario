var scale = 4;
var player, platforms, cursors;
var game = new Phaser.Game(16 * scale * 15, 16 * scale * 10, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

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
    var ledge = platforms.create(i * 16 * scale, 6 * 16 * scale, 'brick');
    ledge.scale.setTo(scale, scale);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 0, 1, 2, 3], 6, true);
    ledge.animations.add('question', [4, 5, 6, 7], 4, true);

    ledge.animations.play('brick');

    ledge = platforms.create((14 - i) * 16 * scale, 4 * 16 * scale, 'brick');
    ledge.scale.setTo(scale, scale);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 0, 1, 2, 3], 6, true);
    ledge.animations.add('question', [4, 5, 6, 7], 3, true);

    ledge.animations.play('question');
  }

  // mario
  player = game.add.sprite(16 * scale, 0, 'mario');
  game.physics.arcade.enable(player);

  player.body.gravity.y = 333 * scale;
  player.body.collideWorldBounds = true;

  player.scale.setTo(scale, scale);
  player.body.setSize(14, 16, 0 * scale, 8 * scale);

  player.animations.add('walk', [3, 6], 15, true);
  player.animations.add('jump', [5], 5, true);
  player.animations.play('walk');
  player.anchor.setTo(0.5, 0.5);

}

function update() {
  game.physics.arcade.collide(player, platforms);

  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    // move to left
    player.body.velocity.x = -50 * scale;
    player.animations.play('walk');
    player.scale.x = -scale;

  } else if (cursors.right.isDown) {
    // move to right
    player.body.velocity.x = 50 * scale;
    player.animations.play('walk');
    player.scale.x = scale;
  } else {
    // stand still
    player.animations.stop();
    player.frame = 2;
  }

  if (!player.body.touching.down) {
    player.animations.play('jump');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    // jump
    if (cursors.left.isDown || cursors.right.isDown) {
      player.body.velocity.y = -200 * scale;
    } else {
      player.body.velocity.y = -210 * scale;
    }
  }
}

function render() {
  // game.debug.body(player);
}
