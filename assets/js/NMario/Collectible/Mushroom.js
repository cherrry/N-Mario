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
  var Mushroom = function(game, group, x, y, attr, solids, players) {
    
    BaseCollectible.call(this, game, group, x, y, attr, solids, players, 'mushroom');
    group.add(this);

    this.animations.add('moving', [0, 1], 10, true);
    this.animations.play('moving');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.velocity.x = 40 * localStorage.scale;
    this.body.bounce.x = 1;

    this.update = function () {
      game.physics.arcade.collide(this, solids, function (mushroom, solid) {
        console.log('hit by object');
        console.log(mushroom);
        console.log(solid);
      });
      game.physics.arcade.collide(this, players, function (mushroom, player) {
        console.log('hit by player');
        console.log(mushroom);
        console.log(player);
      });
    };

    this.__defineGetter__('lastestData', function () {
      return {
        id: attr.id,
        physics: {
          position: { x: this.body.x / localStorage.scale, y: this.body.y / localStorage.scale }
        }
      };
    });

  };

  Mushroom.prototype = Object.create(BaseCollectible.prototype);
  Mushroom.prototype.constructor = Mushroom;

  return Mushroom;
});
