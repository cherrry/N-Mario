require.config({
  paths: {
    'Coin': 'NMario/Collectible/Coin',
    'Music': 'Music'
  }
});

define('BouncingCoin', ['Coin', 'Music'], function (Coin, Music) {
  var BouncingCoin = function (game, objects, x, y, attr) {
    var self = this;

    Coin.call(this, game, objects, x, y, attr);

    this.body.allowGravity = true;

    this.body.gravity.y = 500 * localStorage.scale;
    this.body.velocity.y = -200 * localStorage.scale;

    Music.sound('coin');

    this.update = function () {
      if (self.body.velocity.y > 0) {
        self.kill();
      }
    };

  };

  BouncingCoin.prototype = Object.create(Coin.prototype);
  BouncingCoin.prototype.constructor = BouncingCoin;
  BouncingCoin.prototype.Type = 'BouncingCoin';

  return BouncingCoin;
});
