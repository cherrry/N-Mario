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
  var ControllableMario = function (identity, game, objects) {
    var self = this;

    Mario.call(this, identity, game, objects);
    game.camera.follow(this,  Phaser.Camera.FOLLOW_LOCKON);
    
		this.collide = function(target){
			
		};
  };

  ControllableMario.prototype = Object.create(Mario.prototype);
  ControllableMario.prototype.constructor = ControllableMario;

  return ControllableMario;
});
