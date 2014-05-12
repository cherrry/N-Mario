require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'BaseCollectible': 'NMario/Collectible/BaseCollectible'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Boat', ['BaseCollectible'], function (BaseCollectible) {
  var Boat = function(game, objects, x, y, attr) {

    var self = this;
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'brick');

    this.animations.add('stable', [8], 1, true);
    this.animations.play('stable');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.velocity.x = 0;
    this.body.bounce.x = 1;
    this.body.gravity.y = 50 * localStorage.scale;
    this.body.maxVelocity.x = 80;

    this.anchor.setTo(0.5, 0.5);
    this.body.setSize(16, 16, 0, 0);

    var lastestPhysics = null;

    this.update = function () {

      if (lastestPhysics != null) {
        self.body.x = lastestPhysics.position.x * localStorage.scale;
        self.body.y = lastestPhysics.position.y * localStorage.scale;

        self.body.velocity.x = lastestPhysics.velocity.x * localStorage.scale;
        self.body.velocity.y = lastestPhysics.velocity.y * localStorage.scale;

        self.body.acceleration.x = lastestPhysics.acceleration.x * localStorage.scale;
        self.body.acceleration.y = lastestPhysics.acceleration.y * localStorage.scale;

        lastestPhysics = null;
      }
    };

	this.collected = function (player, collect_index) {

			player.body.velocity.x = self.body.velocity.x;
			player.body.acceleration.x = self.body.acceleration.x;

	};

    this.__defineSetter__('lastestData', function (data) {
      lastestPhysics = data.physics;
    });

    this.__defineGetter__('lastestData', function () {
      return {
        id: attr.id,
        physics: {
          position: { x: self.body.x / localStorage.scale, y: self.body.y / localStorage.scale },
          velocity: { x: self.body.velocity.x / localStorage.scale, y: self.body.velocity.y / localStorage.scale },
          acceleration: { x: self.body.acceleration.x / localStorage.scale, y: self.body.acceleration.y / localStorage.scale }
        }
      };
    });

  };

  Boat.prototype = Object.create(BaseCollectible.prototype);
  Boat.prototype.constructor = Boat;
  Boat.prototype.Type = 'Boat';

  return Boat;
});
