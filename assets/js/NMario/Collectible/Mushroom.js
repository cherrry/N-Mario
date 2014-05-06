require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Mushroom', ['Phaser'], function (Phaser) {
  var Mushroom = function(game, group, x, y, attr, solids, players) {
    
    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'mushroom', 0);
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
  };

  Mushroom.prototype = Object.create(Phaser.Sprite.prototype);
  Mushroom.prototype.constructor = Mushroom;

  return Mushroom;
});
