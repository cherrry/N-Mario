require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Water', ['BaseCollectible'], function (BaseCollectible) {
  var Water = function(game, objects, x, y, attr) {
    var self = this;

    BaseCollectible.call(this, game, objects, x, y, attr, 'water');

    this.animations.add('water', [0, 1, 2, 3], 2, true);

    this.animations.play('water');

    this.body.immovable = true;
    this.body.setSize(16, 16, 0, 0);

    this.broadcast = function (socket) {};

    this.collected = function (player, collect_index) {
    };

  };
  Water.prototype = Object.create(BaseCollectible.prototype);
  Water.prototype.constructor = Water;
  Water.prototype.Type = 'Water';

  return Water;
});
