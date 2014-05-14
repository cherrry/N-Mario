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

define('Flag', ['BaseCollectible', 'Music'], function (BaseCollectible, Music) {
  var Flag = function(game, objects, x, y, attr) {
    var self = this;
    var can_collect = true;

    BaseCollectible.call(this, game, objects, x, y, attr, 'flag');
    objects.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.body.allowGravity = false;

    this.body.setSize(4, 111, 22 * localStorage.scale, 17 * localStorage.scale);

    this.broadcast = function (socket) {};

    this.collected = function (player, collect_index) {
      if (player.Type == 'ControllableMario' && collect_index == 0 && can_collect) {
        //Ask player to act 'flag'
        player.send('player flag', {x: this.body.x});

        // Set flag falling
        this.body.setSize(4, 15, 22 * localStorage.scale, 20 * localStorage.scale);
        this.body.immovable = false;
        this.body.maxVelocity.y = 100 * localStorage.scale;
        this.body.velocity.y = 100 * localStorage.scale;

        Music.stopTheme();
        Music.blockingSound(attr.music, function () {
          player.send('end game', { player: sessionStorage.id });
        });
        
        //player.send('end game', {});
        can_collect = false;
      }
    };
  };

  Flag.prototype = Object.create(BaseCollectible.prototype);
  Flag.prototype.constructor = Flag;
  Flag.prototype.Type = 'Flag';

  return Flag;
});
