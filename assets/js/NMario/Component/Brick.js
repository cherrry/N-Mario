require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible',
    'Phaser': '../libs/phaser/phaser.min'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Brick', ['Phaser', 'BaseCollectible'], function (Phaser, BaseCollectible) {
  var Brick = function(game, objects, x, y, attr) {
    var self = this;

    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'brick', 8);
    objects.add(this);

    this.animations.add('ques', [4, 5, 6, 7], 10, true);
    this.animations.add('empty', [8], 1, true);
    if (attr.itemNum > 0){
      this.animations.play('ques');
    }

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.anchor.setTo(0, 0);
    this.body.setSize(16, 16, 0, 0);

    this.collected = function (player) {
      attr.itemNum--;
      if (attr.itemNum <= 0){
        self.animations.play("empty");
      }
      self.animations.play('empty');
      console.log('Brick relesed');
    };

  };
  Brick.prototype = Object.create(BaseCollectible.prototype);
  Brick.prototype.constructor = Brick;
  Brick.prototype.Type = 'Brick';

  return Brick;
});
