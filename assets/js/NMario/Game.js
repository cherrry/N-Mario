require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'Component': 'NMario/Component',
    'Collectible': 'NMario/Collectible',
    'Player': 'NMario/Player'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    },
    'Component': {
      exports: 'Component'
    },
    'Collectible': {
      exports: 'Collectible'
    },
    'Player': {
      exports: 'Player'
    }
  }
});

define('Game', ['Phaser', 'Player', 'Component', 'Collectible'], function (Phaser, Player, Component, Collectible) {

  var Game = {};
  var phaser = new Phaser.Game(10, 10, Phaser.CANVAS, 'world', { preload: preload, create: create, update: update, render: render }, false, false);

  var socket = null;

  var solids = null, collectibles = null, players = null;
  var player = null, remote_players = {}, ref_collectibles = {};
  var keyboard = null;

  Game.resize = function (world) {
    var container_width = document.getElementById('ruler').offsetWidth;
    
    phaser.renderer.resize(container_width, 16 * localStorage.scale * world.height);
    phaser.world.setBounds(0, 0, 16 * localStorage.scale * world.width, 16 * localStorage.scale * world.height);

    phaser.camera.width = container_width;
    phaser.camera.height = 16 * localStorage.scale * world.height;

  };

  function preload() {
    phaser.load.image('sky', 'assets/sprites/sky.png', 1, 1);

    phaser.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);

    phaser.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
    phaser.load.spritesheet('tube', 'assets/sprites/tube.png', 32, 16);

    phaser.load.spritesheet('mushroom', 'assets/sprites/mushroom.png', 16, 16);
  }

  function create() {
    phaser.physics.startSystem(Phaser.Physics.ARCADE);
    keyboard = phaser.input.keyboard;
  }

  function update() {
    if (player != null) {
      var just_change = false;

      if (player.getKeyState('left') != keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.setKeyState('left', keyboard.isDown(Phaser.Keyboard.LEFT));
        just_change = true;
      }
      if (player.getKeyState('right') != keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.setKeyState('right', keyboard.isDown(Phaser.Keyboard.RIGHT));
        just_change = true;
      }
      if (player.getKeyState('up') != keyboard.isDown(Phaser.Keyboard.UP)) {
        player.setKeyState('up', keyboard.isDown(Phaser.Keyboard.UP));
        just_change = true;
      }
      if (player.getKeyState('down') != keyboard.isDown(Phaser.Keyboard.DOWN)) {
        player.setKeyState('down', keyboard.isDown(Phaser.Keyboard.DOWN));
        just_change = true;
      }

      if (just_change) {
        player.broadcast(socket);
      }
    }

  }

  function render() {
    if (player != null) {
      player.render();
    }
    if (solids != null) {
      // solids.forEach(phaser.debug.body, this);
    }
  }

  Game.__defineSetter__('game', function (game) {
    var world = game.world, players_identity = game.players;

    Game.resize(world);
    phaser.world.removeAll();
    phaser.add.tileSprite(0, 0, phaser.world.width, phaser.world.height, 'sky');

    solids = phaser.add.group();
    solids.enableBody = true;

    collectibles = phaser.add.group();
    collectibles.enableBody = true;
    ref_collectibles = {};

    players = phaser.add.group();
    players.enableBody = true;
    remote_players = {};

    for (var i = 0; i < world.solids.length; i++) {
      var solid = world.solids[i];
      new Component[solid.type](phaser, solids, solid.x, solid.y, solid.attr);
    }

    for (var i = 0; i < world.collectibles.length; i++) {
      var collectible = world.collectibles[i];
      new Collectible[collectible.type](phaser, collectibles, collectible.x, collectible.y, collectible.attr, solids, players);
    }

    for (var i = 0; i < 4; i++) {
      var identity = players_identity[i];

      if (identity != null) {
        if (identity.id == sessionStorage.id) {
          player = new Player.ControllableMario(identity, phaser, players, solids, collectibles);
        } else {
          remote_players[identity.id] = new Player.RemoteMario(identity, phaser, players, solids, collectibles);
          
        }
      }
    }
  });

  // define all websocket listener listener here
  Game.__defineSetter__('socket', function (_socket) {

    socket = _socket;

    socket.on('game init', function (data) {
      // console.log(data);
      Game.game = data;
      // Game.world = data.world;
      // Game.players = data.players;
    });

    window.setInterval(function () {
      if (player != null) {
        player.broadcast(socket);
      }
    }, 200);

    socket.on('player data update', function (data) {
      if (player != null && data.id in remote_players) {
        var remote_player = remote_players[data.id];
        remote_player.lastestData = data;
      }
    });

    socket.on('collectible data update', function (data) {
    });
  });

  return Game;
});
