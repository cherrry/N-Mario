require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'ControllableMario': 'NMario/Player/ControllableMario',
    'RemoteMario': 'NMario/Player/RemoteMario'
  },
  shim: {
    'ControllableMario': {
      exports: 'ControllableMario'
    }
  }
});

define('Player', ['ControllableMario', 'RemoteMario'], function (ControllableMario, RemoteMario) {
  var Player = {};

  Player.ControllableMario = ControllableMario;
  Player.RemoteMario = RemoteMario;

  return Player;
});
