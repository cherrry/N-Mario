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
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'mushroom');

    this.animations.add('moving', [0, 1], 15, true);
    this.animations.play('moving');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.velocity.x = 40 * localStorage.scale;
    this.body.gravity.y = 50 * localStorage.scale;
    this.body.bounce.x = 1;

    this.anchor.setTo(0.5, 0.5);
    this.body.setSize(16, 16, 0, 0);

    var lastestPhysics = null;

    this.update = function () {
      game.physics.arcade.collide(this, objects);
      /*
      game.physics.arcade.collide(this, players, function (mushroom, player) {
        console.log(mushroom, player);
      });
      */

      if (lastestPhysics != null) {
        this.body.x = lastestPhysics.position.x * localStorage.scale;
        this.body.y = lastestPhysics.position.y * localStorage.scale;

        this.velocity.x = lastestPhysics.position.x * localStorage.scale;
        this.velocity.y = lastestPhysics.position.y * localStorage.scale;

        lastestPhysics = null;
      }
    };

    this.__defineSetter__('lastestData', function (data) {
      lastestPhysics = data.physics;
    });

    this.__defineGetter__('lastestData', function () {
      return {
        id: attr.id,
        physics: {
          position: { x: this.body.x / localStorage.scale, y: this.body.y / localStorage.scale },
          velocity: { x: this.body.velocity.x / localStorage.scale, y: this.body.velocity.x / localStorage.scale }
        }
      };
    });

  };

  Mushroom.prototype = Object.create(BaseCollectible.prototype);
  Mushroom.prototype.constructor = Mushroom;

  return Mushroom;
});
