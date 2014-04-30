(function() {
  var NMario = function(container_id, scale, first_level) { return NMario.prototype.init(container_id, scale, first_level); };

  NMario.prototype = {
    constructor: NMario,
    init: function(container_id, scale, first_level) {

      // obtain inner width of container
      var self = this;
      var container_width = document.getElementById('ruler').offsetWidth;

      // create a new game
      var game = new Phaser.Game(container_width, 16 * scale * 10, Phaser.CANVAS, container_id, {
        preload: preload,
        create: create,
        update: update,
        render: render
      }, false, false);

      // define variables used later
      var keyboard;
      
      function preload() {
        // load all sprite sheet
        game.load.image('sky', 'assets/sprites/sky.png');
        game.load.spritesheet('brick', 'assets/sprites/brick.png', 16, 16);
        game.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);
        game.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
        game.load.spritesheet('tube', 'assets/sprites/tube.png', 16, 16);
      }

      function create() {
        // initialize variables
        keyboard = game.input.keyboard;
        self.world = first_level;
      }

      function update() {
        // TODO: game logic goes here (simply call update to all objects)
      }

      function render() {
        // TODO: render debug bounding box
      }

      // some getter
      this.__defineGetter__('scale', function() { return scale; });
      this.__defineGetter__('game', function() { return game; });

      this.__defineSetter__('world', function(world) {
        // set new level
        game.world.removeAll();

        game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var platforms = game.add.group();
        platforms.enableBody = true;

        // add objects to the game
        for (var i = 0; i < world.rows; i++) {
          for (var j = 0; j < world.cols; j++) {
            var tile = world.map[i][j];

            if (tile.type != null) {

              // need to pull those init function into 'NMario' scope to avoid this brain damaging line of code
              window[tile.type](platforms, i, j, tile.attr);
            }
          }
        }

        // TODO: create Mario and RemoteMario(s)
      });

      return this;
    }
  };
  NMario.prototype.init.prototype = NMario.prototype;

  window.NMario = NMario;
})();

// TODO: name variable and hide them from global scope
var mario = NMario('world', 3, WorldOne);
var game = mario.game;
var globalScale = mario.scale, scale = globalScale;

/*
var scale = 3, globalScale = scale;
var player, platforms, keyboard, world = WorldOne;
var game = new Phaser.Game(16 * scale * 15, 16 * scale * 10, Phaser.CANVAS, 'world', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {
  game.load.image('sky', 'assets/sprites/sky.png');
  game.load.spritesheet('brick', 'assets/sprites/brick.png', 16, 16);
  game.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);
  game.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
  game.load.spritesheet('tube', 'assets/sprites/tube.png', 16, 16);
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
        window[tile.type](platforms, i, j, tile.attr);
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
  // player.debug();
  // game.debug.body(globalTile);
}
*/
