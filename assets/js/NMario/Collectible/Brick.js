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
    this.animations.add('tranparent', [9], 1, true);

    if(attr.visible == false){
      self.body.checkCollision.up = false;
      self.body.checkCollision.down = true;
      self.body.checkCollision.left = false;
      self.body.checkCollision.right = false;
      this.animations.play('tranparent');
    }else if (attr.item.length > 0) {
      this.animations.play('ques');
    } else {
      this.animations.play('empty');
    }

    this.body.immovable = true;
    this.body.setSize(16, 16, 0, 0);

    this.broadcast = function (socket) {};

    this.collected = function (player) {
      var itemRelease = attr.item.pop();
      if (attr.visible == false){
        //Set have collision
        self.body.checkCollision.up = true;
        self.body.checkCollision.down = true;
        self.body.checkCollision.left = true;
        self.body.checkCollision.right = true;
      }
      if (attr.visible == false || attr.item.length == 0){
        attr.visible = true;
        self.animations.play("empty");
      }
      switch (target.Type) {
        case 'Power-Up':
          break;
        case 'Coin':
          break;
      }
      console.log('Brick relesed : ' + itemRelease);
    };

  };
  Brick.prototype = Object.create(BaseCollectible.prototype);
  Brick.prototype.constructor = Brick;
  Brick.prototype.Type = 'Brick';

  return Brick;
});
