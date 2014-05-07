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
  var RemoteMario = function (identity, game, objects) {
    var self = this;
    var lastestPhysics = null;

    Mario.call(this, identity, game, objects);

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
        self.body.x = lastestPhysics.position.x;
        self.body.y = lastestPhysics.position.y;

        self.body.velocity.x = lastestPhysics.velocity.x;
        self.body.velocity.y = lastestPhysics.velocity.y;
        
        self.body.acceleration.x = lastestPhysics.velocity.x;
        self.body.acceleration.y = lastestPhysics.velocity.y;

        lastestPhysics = null;
      }

      super_update();
    };
    
  };

  RemoteMario.prototype = Object.create(Mario.prototype);
  RemoteMario.prototype.constructor = RemoteMario;

  return RemoteMario;
});
