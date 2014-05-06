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

define('ControllableMario', ['Phaser', 'Mario'], function (Phaser, Mario) {
  var ControllableMario = function (identity, game, group, solids) {
    var self = this;

    Mario.call(this, identity, game, group, solids);
    game.camera.follow(this,  Phaser.Camera.FOLLOW_LOCKON);
    
  };

  ControllableMario.prototype = Object.create(Mario.prototype);
  ControllableMario.prototype.constructor = ControllableMario;

  return ControllableMario;
});
