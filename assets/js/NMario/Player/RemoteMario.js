require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'Mario': 'NMario/Player/Mario'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    },
    'Mario': {
      exports: 'Mario'
    }
  }
});

define('RemoteMario', ['Phaser', 'Mario'], function (Phaser, Mario) {
  var RemoteMario = function (identity, game, group, solids) {
  };

  Mario.prototype = Object.create(Mario.prototype);
  Mario.prototype.constructor = RemoteMario;

  return RemoteMario;
});
