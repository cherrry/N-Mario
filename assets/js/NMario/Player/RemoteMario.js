require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser',
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

      self.state = data.state;

      self.setKeyState('left', data.keypress.left);
      self.setKeyState('right', data.keypress.right);
      self.setKeyState('up', data.keypress.up);
      self.setKeyState('down', data.keypress.down);

      lastestPhysics = data.physics;
    });

    var super_update = this.update;
    this.update = function () {
      if (lastestPhysics != null) {
        self.body.x = lastestPhysics.position.x * localStorage.scale;
        self.body.y = lastestPhysics.position.y * localStorage.scale;

        self.body.velocity.x = lastestPhysics.velocity.x * localStorage.scale;
        self.body.velocity.y = lastestPhysics.velocity.y * localStorage.scale;
        
        self.body.acceleration.x = lastestPhysics.velocity.x * localStorage.scale;
        self.body.acceleration.y = lastestPhysics.velocity.y * localStorage.scale;

        lastestPhysics = null;
      }

      super_update();
    };
    
  };

  RemoteMario.prototype = Object.create(Mario.prototype);
  RemoteMario.prototype.constructor = RemoteMario;
  RemoteMario.prototype.Type = 'RemoteMario';

  return RemoteMario;
});
