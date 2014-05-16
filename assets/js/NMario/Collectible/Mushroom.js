require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible',
    'Music': 'Music'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Mushroom', ['BaseCollectible', 'Music'], function (BaseCollectible, Music) {
  var Mushroom = function(game, objects, x, y, attr) {

    var self = this;
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'mushroom');

    this.animations.add('moving', [0, 1], 15, true);
		this.animations.add('dead', [2], 2, false);
    this.animations.play('moving');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    if (attr.direction == 'left') {
      this.body.velocity.x = -40 * localStorage.scale;
    } else {
      this.body.velocity.x = 40 * localStorage.scale;
    }
    this.body.gravity.y = 400 * localStorage.scale;
    this.body.bounce.x = 1;

    this.anchor.setTo(0, 0);
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

	this.collected = function (player, collect_index) {
		if (attr.state != 'dead'){
			attr.state = 'dead';

			//Set body to static
			self.body.velocity.x = 0;
			self.body.velocity.y = 0;
			self.body.acceleration.x = 0;
			self.body.acceleration.y = 0;

			//Set body box
			self.body.setSize(16, 8, 0, 4 * localStorage.scale);

			//Change to dying animation
			self.animations.play('dead');
      Music.sound('stomp');

			//Kill object after animation
			self.events.onAnimationComplete.add(function(){
					self.kill();
			}, self);
		}
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
  Mushroom.prototype.Type = 'Mushroom';

  return Mushroom;
});
