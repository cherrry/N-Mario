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

define('Brick', ['Phaser'], function (Phaser) {
  var Brick = function(game, objects, x, y, attr) {
    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'brick', 8);
    objects.add(this);

    if (attr.isEmpty == 0){
      this.animations.add('ques', [4, 5, 6, 7], 10, true);
      this.animations.play('ques');
    }

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.anchor.setTo(0, 0);
    this.body.setSize(16, 16, 0, 0);
  };
  Brick.prototype = Object.create(Phaser.Sprite.prototype);
  Brick.prototype.constructor = Brick;

  return Brick;
});
