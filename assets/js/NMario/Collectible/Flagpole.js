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

define('Flagpole', ['Phaser'], function (Phaser) {
  var Flagpole = function(game, objects, x, y, attr) {
    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'flagpole', 0);
    objects.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.body.setSize(4, 111, 22 * localStorage.scale, 17 * localStorage.scale);

    this.broadcast = function (socket) {};

    this.collected = function (player) {
      console.log('end game!');
    };
  };

  Flagpole.prototype = Object.create(Phaser.Sprite.prototype);
  Flagpole.prototype.constructor = Flagpole;
  Flagpole.prototype.Type = 'Flagpole';

  return Flagpole;
});
