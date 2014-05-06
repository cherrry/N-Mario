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
    var lastestPhysics = null;

    Mario.call(this, identity, game, group, solids);

    this.__defineSetter__('lastestData', function (data) {

      this.setKeyState('left', data.keypress.left);
      this.setKeyState('right', data.keypress.right);
      this.setKeyState('up', data.keypress.up);
      this.setKeyState('down', data.keypress.down);

      lastestPhysics = data.physics;
    });

    var super_update = this.update;
    this.update = function () {
      if (lastestPhysics != null) {
        this.body.x = lastestPhysics.position.x;
        this.body.y = lastestPhysics.position.y;

        this.body.velocity.x = lastestPhysics.velocity.x;
        this.body.velocity.y = lastestPhysics.velocity.y;
        
        this.body.acceleration.x = lastestPhysics.velocity.x;
        this.body.acceleration.y = lastestPhysics.velocity.y;

        lastestPhysics = null;
      }

      super_update();
    };
    
  };

  RemoteMario.prototype = Object.create(Mario.prototype);
  RemoteMario.prototype.constructor = RemoteMario;

  return RemoteMario;
});
