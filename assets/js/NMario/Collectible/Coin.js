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

define('Coin', ['BaseCollectible', 'Music'], function (BaseCollectible, Music) {
  var Coin = function(game, objects, x, y, attr) {

    var self = this;
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'coin');

    this.animations.add('flipping', [0, 1, 2, 3], 5, true);
    this.animations.play('flipping');

    this.body.allowGravity = false;

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.setSize(6, 12, 5 * localStorage.scale, 2 * localStorage.scale);
    
    this.broadcast = function (socket) {};

    this.collected = function (player, collect_index) {
      if (collect_index == 0) {
        if(player.id == sessionStorage.id)
          player.coins += 1;
        Music.sound('coin', null);
        self.kill();
      }
    };
  };

  Coin.prototype = Object.create(BaseCollectible.prototype);
  Coin.prototype.constructor = Coin;
  Coin.prototype.Type = 'Coin';

  return Coin;
});
