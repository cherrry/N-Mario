require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible',
    'Music': 'Music',
    'PowerUp': 'NMario/Collectible/PowerUp',
    'LifeUp': 'NMario/Collectible/LifeUp',
    'Mushroom': 'NMario/Collectible/Mushroom',
    'BouncingCoin': 'NMario/Collectible/BouncingCoin',
    'BreakBrick': 'NMario/Collectible/BreakBrick'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Brick', ['BaseCollectible', 'Music', 'PowerUp', 'BouncingCoin', 'LifeUp', 'Mushroom', 'BreakBrick'], function (BaseCollectible, Music, PowerUp, BouncingCoin, LifeUp, Mushroom, BreakBrick) {
  var Brick = function(game, objects, x, y, attr) {
    var self = this;

    BaseCollectible.call(this, game, objects, x, y, attr, 'brick');
    BaseCollectible.structure_objects.push(this);

    this.animations.add('breakable', [0, 1, 2, 3], 10, true);
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
      this.animations.play(attr.breakable == true ? 'breakable' : 'ques');
    } else {
      this.animations.play(attr.breakable == true ? 'breakable' : 'empty');
    }

    this.body.immovable = true;
    this.body.setSize(16, 16, 0, 0);

    this.broadcast = function (socket) {};

    this.update = function () {
      self.body.x = x * 16 * localStorage.scale;
      if (self.body.y > y * 16 * localStorage.scale) {
        self.body.y = y * 16 * localStorage.scale;
        self.body.velocity.y = 0;
        self.body.gravity.y = 0;
        self.body.immovable = true;
      }
    };

    this.collected = function (player, collect_index) {
      if (attr.visible == false) {
        //Set have collision
        self.body.checkCollision.up = true;
        self.body.checkCollision.down = true;
        self.body.checkCollision.left = true;
        self.body.checkCollision.right = true;
        attr.visible = true;
        console.log('show brick');
        self.animations.play(attr.breakable == true ? 'breakable' : 'empty');
      }
      if (collect_index >= attr.item.length - 1 && attr.breakable != true) {
        self.animations.play('empty');
      }
      if (collect_index >= attr.item.length) {
        if (attr.breakable == true) {

          // break Brick
          new BreakBrick(game, BaseCollectible.floating_objects, x - 1, y - 1, { frame: 0 } );
          new BreakBrick(game, BaseCollectible.floating_objects, x + 1, y - 1, { frame: 1 } );
          new BreakBrick(game, BaseCollectible.floating_objects, x - 1, y + 1, { frame: 2 } );
          new BreakBrick(game, BaseCollectible.floating_objects, x + 1, y + 1, { frame: 3 } );

          Music.sound('break-brick');
          self.kill();
          return;
        }
        Music.sound('bump');
        return;
      }

      if (self.body.immovable) {
        self.body.velocity.y = -100 * localStorage.scale;
        self.body.gravity.y = 800 * localStorage.scale;
        self.body.immovable = false;
      }

      var itemRelease = attr.item[collect_index];
      switch (itemRelease) {
        case 'Power-Up':
        case 'PowerUp':
          var powerup_id = 'powerup_from_' + attr.id + '_' + collect_index;
          BaseCollectible.ref_collectibles[powerup_id] = new PowerUp(game, BaseCollectible.overlap_objects, x, y - 1, { id: powerup_id, type: 'grow' });
          BaseCollectible.ref_collectibles[powerup_id].body.velocity.y = - 100 * localStorage.scale;
          break;
        case 'One-Up':
        case 'OneUp':
          console.log('generate power up');
          var oneup_id = 'oneup_from_' + attr.id + '_' + collect_index;
          BaseCollectible.ref_collectibles[oneup_id] = new LifeUp(game, BaseCollectible.overlap_objects, x, y - 1, { id: oneup_id, type: 'lifeup' });
          BaseCollectible.ref_collectibles[oneup_id].body.velocity.y = - 100 * localStorage.scale;
          break;
        case 'Coin':
          var coin_id = 'coin_from_' + attr.id + '_' + collect_index;
          player.coins += 1;
          BaseCollectible.ref_collectibles[coin_id] = new BouncingCoin(game, BaseCollectible.floating_objects, x, y - 1, { id: coin_id });
          break;
        case 'Mushroom':
          var mushroom_id = 'mushroom_from_' + attr.id + '_' + collect_index;
          BaseCollectible.ref_collectibles[mushroom_id] = new Mushroom(game, BaseCollectible.collide_objects, x, y - 1, { id: mushroom_id });
          BaseCollectible.ref_collectibles[mushroom_id].body.velocity.y = - 100 * localStorage.scale;
          break;
        default:
          Music.sound('bump');
          break;
      }
    };

  };

  Brick.prototype = Object.create(BaseCollectible.prototype);
  Brick.prototype.constructor = Brick;
  Brick.prototype.Type = 'Brick';

  return Brick;
});
