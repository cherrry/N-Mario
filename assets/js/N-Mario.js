var scale = 3, globalScale = scale;
var player, platforms, keyboard, world = WorldOne;
var game = new Phaser.Game(16 * scale * 15, 16 * scale * 10, Phaser.CANVAS, 'world', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {
  game.load.image('sky', 'assets/sprites/sky.png');
  game.load.spritesheet('brick', 'assets/sprites/brick.png', 16, 16);
  game.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);
  game.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
}

function create() {
  keyboard = game.input.keyboard;

  game.world.setBounds(0, 0, 16 * scale * world.cols, 16 * scale * world.rows);

  // sky
  game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // platform
  platforms = game.add.group();
  platforms.enableBody = true;

  for (var i = 0; i < world.rows; i++) {
    for (var j = 0; j < world.cols; j++) {
      var tile = world.map[i][j];

      if (tile.type != null) {
        window[tile.type](platforms, i, j, tile.callback);
      }
    }
  }

  // mario
  player = new Mario({ color: 0 }, game, platforms);

}

function update() {
  player.update({ keyboard: keyboard });
}

function render() {
  //player.debug();
}
