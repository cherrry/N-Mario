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

define('Flagpole', ['BaseCollectible'], function (BaseCollectible) {
  var Flagpole = function(game, objects, x, y, attr) {
    var self = this;
    var can_collect = true;

    BaseCollectible.call(this, game, objects, x, y, attr, 'flagpole');
    objects.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.body.allowGravity = false;

    this.body.setSize(4, 111, 22 * localStorage.scale, 17 * localStorage.scale);

    this.broadcast = function (socket) {};

    this.collected = function (player, collect_index) {
      if (player.Type == 'ControllableMario' && collect_index == 0 && can_collect) {
        console.log('flagpole', collect_index);
        player.send('end game', {});
      }
      can_collect = false;
    };
  };

  Flagpole.prototype = Object.create(BaseCollectible.prototype);
  Flagpole.prototype.constructor = Flagpole;
  Flagpole.prototype.Type = 'Flagpole';

  return Flagpole;
});
