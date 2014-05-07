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
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'mushroom');

    this.animations.add('flipping', [0, 1, 2, 3], 15, true);
    this.animations.play('flipping');

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.anchor.setTo(0.5, 0.5);
    this.body.setSize(16, 16, 0, 0);
  };

  Coin.prototype = Object.create(BaseCollectible.prototype);
  Coin.prototype.constructor = Coin;

  return Coin;
});
