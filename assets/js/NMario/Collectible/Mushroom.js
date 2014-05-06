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
  var Mushroom = function(game, group, solids, x, y, attr) {
    
    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'mushroom', 0);
    group.add(this);

    this.animations.add('moving', [0, 1], 10, true);
    this.animations.play('moving');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.velocity.x = 40 * localStorage.scale;
    this.body.bounce.x = 1;

    this.update = function () {
      game.physics.arcade.collide(this, solids);
    };
  };

  Mushroom.prototype = Object.create(Phaser.Sprite.prototype);
  Mushroom.prototype.constructor = Mushroom;

  return Mushroom;
});
