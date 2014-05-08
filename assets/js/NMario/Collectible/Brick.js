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

define('Brick', ['BaseCollectible'], function (BaseCollectible) {
  var Brick = function(game, objects, x, y, attr) {
    var self = this;

    BaseCollectible.call(this, game, objects, x, y, attr, 'brick');

    this.animations.add('ques', [4, 5, 6, 7], 10, true);
    this.animations.add('empty', [8], 1, true);
    if (attr.item.length > 0) {
      this.animations.play('ques');
    } else {
      this.animations.play('empty');
    }

    this.body.immovable = true;
    this.body.setSize(16, 16, 0, 0);

    this.broadcast = function (socket) {};

    this.collected = function (player) {
      var itemRelease = attr.item.pop();
      if (attr.item.length == 0){
        self.animations.play("empty");
      }
      console.log('Brick relesed : ' + itemRelease);
    };

  };
  Brick.prototype = Object.create(BaseCollectible.prototype);
  Brick.prototype.constructor = Brick;
  Brick.prototype.Type = 'Brick';

  return Brick;
});
