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

define('Mushroom', ['BaseCollectible'], function (BaseCollectible) {
  var Mushroom = function(game, objects, x, y, attr) {

    var self = this;
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'mushroom');

    this.animations.add('moving', [0, 1], 15, true);
		this.animations.add('dying', [2], 1, true);
    this.animations.play('moving');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.velocity.x = 40 * localStorage.scale;
    this.body.gravity.y = 50 * localStorage.scale;
    this.body.bounce.x = 1;

    this.anchor.setTo(0.5, 0.5);
    this.body.setSize(16, 16, 0, 0);

    var lastestPhysics = null;

    this.update = function () {
      /*
      game.physics.arcade.collide(this, objects, function (mushroom, object) {
        console.log(object);
      });
      */
      /*
      if (self.body.velocity.x > 0) {
        self.body.velocity.x = 40 * localStorage.scale;
      } else {
        self.body.velocity.x = -40 * localStorage.scale;
      }
      */

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

	this.die = function () {
		//Set body to static
		self.body.velocity.x = 0;
		self.body.velocity.y = 0;
		self.body.acceleration.x = 0;
		self.body.acceleration.y = 0;

		//Disable physics
		self.body.setSize(0, 0, 0, 0);

		//Change to dying animation
		self.animations.play('dying');
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

  Mushroom.prototype = Object.create(BaseCollectible.prototype);
  Mushroom.prototype.constructor = Mushroom;

  return Mushroom;
});
