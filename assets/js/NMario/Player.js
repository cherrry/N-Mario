require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'Mario': 'NMario/Player/Mario',
    'RemoteMario': 'NMario/Player/RemoteMario'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Player', ['Mario', 'RemoteMario'], function (Mario, RemoteMario) {
  var Player = {};

  Player.Mario = Mario;
  Player.RemoteMario = RemoteMario;

  return Player;
});
