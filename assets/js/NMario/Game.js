require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'Component': 'NMario/Component',
    'Collectible': 'NMario/Collectible',
    'Player': 'NMario/Player',
    'Scoreboard': 'NMario/Scoreboard',
    'Music': 'Music'
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
    },
    'Scoreboard': {
      exports: 'Scoreboard'
    }
  }
});

define('Game', ['Phaser', 'Player', 'Component', 'Collectible', 'Scoreboard', 'Music'], function (Phaser, Player, Component, Collectible, Scoreboard, Music) {

  var Game = {};
  var phaser = new Phaser.Game(10, 10, Phaser.CANVAS, 'world', { preload: preload, create: create, update: update, render: render }, false, false);

  var socket = null, isOwner = false;

  var structure_objects = null, collide_objects = null, overlap_objects = null, floating_objects = null;
  // var solids = null, collectibles = null, players = null;
  var player = null, remote_players = {}, ref_collectibles = {};
  var keyboard = null;
  var scoreboard;

  var debug_object = null;

  Game.resize = function (world) {
    var container_width = document.getElementById('ruler').offsetWidth;
    
    phaser.renderer.resize(container_width, 16 * localStorage.scale * world.height);
    phaser.world.setBounds(0, 0, 16 * localStorage.scale * world.width, 16 * localStorage.scale * world.height);

    phaser.camera.width = container_width;
    phaser.camera.height = 16 * localStorage.scale * world.height;

  };

  function preload() {
    phaser.load.image('sky', 'assets/sprites/sky.png', 1, 1);

    phaser.load.spritesheet('mario-color', 'assets/sprites/mario-color.png', 16, 16);
    phaser.load.spritesheet('mario', 'assets/sprites/mario.png', 32, 32);

    phaser.load.spritesheet('land', 'assets/sprites/land.png', 16, 16);
    phaser.load.spritesheet('tube', 'assets/sprites/tube.png', 32, 16);
    phaser.load.spritesheet('brick', 'assets/sprites/brick.png', 16, 16);

    phaser.load.spritesheet('box', 'assets/sprites/box.png', 16, 16);
    phaser.load.spritesheet('water', 'assets/sprites/water.png', 16, 16);
    phaser.load.spritesheet('boat', 'assets/sprites/boat.png', 32, 16);

    phaser.load.spritesheet('mushroom', 'assets/sprites/mushroom.png', 16, 16);
    phaser.load.spritesheet('coin', 'assets/sprites/coin.png', 16, 16);
    phaser.load.spritesheet('flagpole', 'assets/sprites/flagpole.png', 32, 128);
    phaser.load.spritesheet('flag', 'assets/sprites/flag.png', 32, 128);
    phaser.load.spritesheet('power-up', 'assets/sprites/power-up.png', 16, 16);

  }

  function create() {
    phaser.physics.startSystem(Phaser.Physics.ARCADE);
    // console.log(phaser.physics);
    keyboard = phaser.input.keyboard;
  }

  function collision_handler (source, target) {
    // If collision involves player, ask player to collide with the other object
    if (source == player) {
      player.collide(target);
    } else if (target == player) {
      player.collide(source);
    }
  }

  function update() {
    // Collision detection
    phaser.physics.arcade.collide(collide_objects, collide_objects, collision_handler);
    phaser.physics.arcade.overlap(collide_objects, overlap_objects, collision_handler);
    phaser.physics.arcade.collide(overlap_objects, structure_objects);

    // Self player control
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

      //Suicide, the 'player die' event will broadcast instead
      if (player.getKeyState('q') != keyboard.isDown(Phaser.Keyboard.Q)) {
        player.setKeyState('q', keyboard.isDown(Phaser.Keyboard.Q));
      }

      if (just_change) {
        player.broadcast(socket);
      }

      scoreboard.update();
    }

  }

  function render() {
    /*
    if (player != null) {
      player.render();
    }
    */

    if (debug_object != null) {
      phaser.debug.body(debug_object);
    }
  }

  Game.__defineSetter__('game', function (game) {
    var world = game.world, players_identity = game.players;

    Game.resize(world);
    phaser.world.removeAll();
    Phaser.Canvas.setSmoothingEnabled(phaser.context, false);
    phaser.add.tileSprite(0, 0, phaser.world.width, phaser.world.height, 'sky');

    structure_objects = [];
    Collectible.structure_objects = structure_objects;
    // structure_objects.enableBody = true;

    collide_objects = phaser.add.group();
    collide_objects.enableBody = true;
    Collectible.collide_objects = collide_objects;

    overlap_objects = phaser.add.group();
    overlap_objects.enableBody = true;
    Collectible.overlap_objects = overlap_objects;

    ref_collectibles = {};
    Collectible.ref_collectibles = ref_collectibles;

    floating_objects = phaser.add.group();
    floating_objects.enableBody = true;
    Collectible.floating_objects = floating_objects;

    remote_players = {};

    for (var i = 0; i < world.solids.length; i++) {
      var solid = world.solids[i];
      // var component = new Component[solid.type](phaser, structure_objects, solid.x, solid.y, solid.attr);
      var component = new Component[solid.type](phaser, collide_objects, solid.x, solid.y, solid.attr);
      structure_objects.push(component);
    }

    for (var i = 0; i < world.collectibles.length; i++) {
      var collectible = world.collectibles[i];
      //console.log(collectible, Collectible);
      if (collectible.collidable){
        ref_collectibles[collectible.attr.id] = new Collectible[collectible.type](phaser, collide_objects, collectible.x, collectible.y, collectible.attr);
      } else {
        ref_collectibles[collectible.attr.id] = new Collectible[collectible.type](phaser, overlap_objects, collectible.x, collectible.y, collectible.attr);
      }
      // console.log(collectible);
      if (collectible.type == 'Flag') {
        debug_object = ref_collectibles[collectible.attr.id];
      }
    }

    var k = 0;
    for (var i = 0; i < 4; i++) {
      var identity = players_identity[i];

      if (identity != null) {
        identity.position = k++;
        if (identity.id == sessionStorage.id) {
          if (identity.isOwner) {
            isOwner = true;
          }
          player = new Player.ControllableMario(identity, phaser, collide_objects);
          player.socket = socket;
        } else {
          remote_players[identity.id] = new Player.RemoteMario(identity, phaser, collide_objects);
          remote_players[identity.id].socket = socket;
          
        }
      }
    }

    // create a scoreboard on the top left hand corner
    scoreboard = new Scoreboard(phaser, player, remote_players);

    // Set Music
    console.log(game.world);
    Music.theme(game.world.theme);
  });

  // define all websocket listener listener here
  Game.__defineSetter__('socket', function (_socket) {

    socket = _socket;

    socket.on('game init', function (data) {
      // console.log(data);
      Game.game = data;
      socket.emit('stage ready', { player: sessionStorage.id });
      // Game.world = data.world;
      // Game.players = data.players;
    });

    window.setInterval(function () {
      if (player != null) {
        player.broadcast(socket);

        if (isOwner) {
          for (ref in ref_collectibles) {
            var collectible = ref_collectibles[ref];
            collectible.broadcast(socket);
          }
        }
      }
    }, 200);

    socket.on('player data update', function (data) {
      if (player != null && data.id in remote_players) {
        var remote_player = remote_players[data.id];
        remote_player.lastestData = data;
        remote_player.lives = data.lives;
        remote_player.coins = data.coins;
      }
    });

    socket.on('collectible data update', function (data) {
      if (player != null && data.id in ref_collectibles) {
        var collectible = ref_collectibles[data.id];
        collectible.lastestData = data;
      }
    });

    socket.on('player collect object', function (data) {
      if (data.player != sessionStorage.id) {
        ref_collectibles[data.collectible].collected(remote_players[data.player], data.collect_index);
      } else {
        // console.log(player, ref_collectibles[data.collectible], data.collect_index);
        ref_collectibles[data.collectible].collected(player, data.collect_index);
      }
    });

    socket.on('player flag', function (data) {
      var id = data.player;
      var position = data.position;
      if (sessionStorage.id == id) {
        player.flag(position);
      } else {
        remote_players[id].flag(position);
      }
    });

    socket.on('player yeah', function (data) {
      console.log(data.player + ' yeah');
      var id = data.player;
      if (sessionStorage.id == id) {
        player.yeah();
      } else {
        remote_players[id].yeah();
      }
    });

    socket.on('player die', function (data) {
      var id = data.player;
      if (sessionStorage.id == id) {
        player.die();
      } else {
        remote_players[id].die();
      }
    });

    socket.on('player shrink', function (data) {
      console.log(data.player + ' shrink');
      var id = data.player;
      if (sessionStorage.id == id) {
        player.shrink();
      } else {
        remote_players[id].shrink();
      }
    });

    socket.on('go back to game room', function (data) {
      Music.stopTheme();
      $('#content_index').hide();
      $('#content_room').show();
      $('#content_room #im_ready').prop('checked', false);
      $('#content_room #message_board')
        .append('<p>Game over. Thank you for playing!</p>')
        .scrollTop($('#content_room #message_board').height());
      $('#content_game').hide();
    });
  });

  return Game;
});
