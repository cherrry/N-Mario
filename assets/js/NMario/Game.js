require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'Component': 'Component'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Game', ['Phaser', 'Component'], function (Phaser, Component) {

  var Game = {};
  var phaser = new Phaser.Game(10, 10, Phaser.CANVAS, 'world', { preload: preload, create: create, update: update, render: render }, false, false);


  var player, remote_players;
  var keyboard = null;

  Game.resize = function (world) {
    var container_width = document.getElementById('ruler').offsetWidth;
    
    phaser.renderer.resize(container_width, 16 * localStorage.scale * world.height);
    phaser.world.setBounds(0, 0, 16 * localStorage.scale * world.width, 16 * localStorage.scale * world.height);

  };

  function preload() {
    phaser.load.image('sky', 'assets/sprites/sky.png', 1, 1);

    phaser.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);
    phaser.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
  }

  function create() {
    keyboard = phaser.input.keyboard;
  }

  function update() {
  }

  function render() {
  }

  Game.__defineSetter__('NMario', function (NMario) {
    Game.NMario = NMario;
  });

  Game.__defineSetter__('world', function (world) {
    Game.resize(world);

    for (var i = 0; i < world.solids.length; i++) {
      var solid = world.solids[i];
      console.log(Component);
      new Component.Land(phaser, solid.x, solid.y);
    }
  });

  // define all websocket listener listener here
  Game.__defineSetter__('socket', function (socket) {

    socket.on('game init', function (data) {
      Game.world = data.world;
    });

    socket.on('player data update', function (data) {
    });

    socket.on('object data update', function (data) {
    });
  });

  return Game;
});
