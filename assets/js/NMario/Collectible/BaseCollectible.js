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

define('BaseCollectible', ['Phaser'], function (Phaser) {
  var BaseCollectible = function (game, group, x, y, attr, solids, players, sprite) {

    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, sprite, 0);
    group.add(this);

    this.body.collideWorldBounds = true;
    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.broadcast = function (socket) {
      socket.emit('collectible data update', this.lastestData);
    };

    this.__defineGetter__('lastestData', function () {
      return { id: attr.id };
    });

  };

  BaseCollectible.prototype = Object.create(Phaser.Sprite.prototype);
  BaseCollectible.prototype.constructor = BaseCollectible;

  return BaseCollectible;
});
