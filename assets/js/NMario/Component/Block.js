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

define('Block', ['Phaser'], function (Phaser) {
  var Block = function(game, objects, x, y, attr) {
    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'block', 1);
    objects.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.anchor.setTo(0, 0);
    this.body.setSize(16, 16, 0, 0);
  };
  Block.prototype = Object.create(Phaser.Sprite.prototype);
  Block.prototype.constructor = Block;
  Block.prototype.Type = 'Block';

  return Block;
});
