var player, platforms, cursors;
var game = new Phaser.Game(48 * 15, 48 * 10, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

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
    var ground = platforms.create(i * 48, game.world.height - 48, 'land', 1);
    ground.scale.setTo(3, 3);
    ground.body.immovable = true;
  }

  for (var i = 0; i < 6; i++) {
    var ledge = platforms.create(i * 48, 6 * 3 * 16, 'brick');
    ledge.scale.setTo(3, 3);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 1, 2, 3], 5, true);
    ledge.animations.add('question', [4, 5, 6, 7], 5, true);

    ledge.animations.play('brick');

    ledge = platforms.create((14 - i) * 3 * 16, 4 * 3 * 16, 'brick');
    ledge.scale.setTo(3, 3);
    ledge.body.immovable = true;

    ledge.animations.add('brick', [0, 1, 2, 3], 5, true);
    ledge.animations.add('question', [4, 5, 6, 7], 5, true);

    ledge.animations.play('question');
  }

  // mario
  player = game.add.sprite(48, 0, 'mario');
  game.physics.arcade.enable(player);

  player.body.gravity.y = 1000;
  player.body.collideWorldBounds = true;

  player.scale.setTo(3, 3);
  player.body.setSize(14, 16, 0, 24);

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
    player.body.velocity.x = -200;
    player.animations.play('walk');
    player.scale.x = -3;

  } else if (cursors.right.isDown) {
    // move to right
    player.body.velocity.x = 200;
    player.animations.play('walk');
    player.scale.x = 3;
    player.body.setSize(14, 16, 0, 24);

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
      player.body.velocity.y = -600;
    } else {
      player.body.velocity.y = -650;
    }
  }
}

function render() {
  // game.debug.body(player);
}
