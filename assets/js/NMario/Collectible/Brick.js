require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible',
    'PowerUp': 'NMario/Collectible/PowerUp'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Brick', ['BaseCollectible', 'PowerUp'], function (BaseCollectible, PowerUp) {
  var Brick = function(game, objects, x, y, attr) {
    var self = this;

    BaseCollectible.call(this, game, objects, x, y, attr, 'brick');
    BaseCollectible.structure_objects.push(this);

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

    this.collected = function (player, collect_index) {
      if (attr.visible == false) {
        //Set have collision
        self.body.checkCollision.up = true;
        self.body.checkCollision.down = true;
        self.body.checkCollision.left = true;
        self.body.checkCollision.right = true;
      }
      if (attr.visible == false || collect_index >= attr.item.length - 1){
        attr.visible = true;
        self.animations.play("empty");
      }
      if (collect_index >= attr.item.length) {
        return;
      }
      var itemRelease = attr.item[collect_index];
      switch (itemRelease) {
        case 'Power-Up':
          var powerup_id = 'powerup_from_' + attr.id + '_' + collect_index;
          BaseCollectible.ref_collectibles[powerup_id] = new PowerUp(game, BaseCollectible.overlap_objects, x, y - 1, { id: powerup_id, type: 'grow' });
          break;
        case 'Coin':
          console.log('create coin', BaseCollectible.overlap_objects);
          break;
      }
    };

  };

  Brick.prototype = Object.create(BaseCollectible.prototype);
  Brick.prototype.constructor = Brick;
  Brick.prototype.Type = 'Brick';

  return Brick;
});
