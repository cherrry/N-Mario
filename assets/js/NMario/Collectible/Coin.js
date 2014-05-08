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

define('Coin', ['BaseCollectible'], function (BaseCollectible) {
  var Coin = function(game, objects, x, y, attr) {

    var self = this;
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'coin');

    this.animations.add('flipping', [0, 1, 2, 3], 5, true);
    this.animations.play('flipping');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.setSize(10, 16, 3 * localStorage.scale, 0);
    
    this.broadcast = function (socket) {};

    this.collected = function (player) {
      self.kill();
    };
  };

  Coin.prototype = Object.create(BaseCollectible.prototype);
  Coin.prototype.constructor = Coin;
  Coin.prototype.Type = 'Coin';

  return Coin;
});
