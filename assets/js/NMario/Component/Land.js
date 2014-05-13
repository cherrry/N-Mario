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

define('Land', ['Phaser'], function (Phaser) {
  var Land = function(game, objects, x, y, attr) {
    console.log(attr.repeat);

    attr.repeat = attr.repeat || { x: 1, y: 1 };
    attr.frame = attr.frame || 1;

    Phaser.TileSprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, attr.repeat.x * 16 * localStorage.scale, attr.repeat.y * 16 * localStorage.scale, 'land', attr.frame);

    objects.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    this.anchor.setTo(0, 0);
    this.body.setSize(attr.repeat.x * 16, attr.repeat.y * 16, 0, 0);
  };
  Land.prototype = Object.create(Phaser.TileSprite.prototype);
  Land.prototype.constructor = Land;
  Land.prototype.Type = 'Land';

  return Land;
});
