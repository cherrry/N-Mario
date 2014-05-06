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
  var RemoteMario = function (identity, game, group, solids, collectibles) {
    var self = this;

    Mario.call(this, identity, game, group, solids);
    
  };

  RemoteMario.prototype = Object.create(Mario.prototype);
  RemoteMario.prototype.constructor = RemoteMario;

  return RemoteMario;
});
