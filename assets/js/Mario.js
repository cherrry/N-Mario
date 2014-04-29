function Mario(identity, game, solids) {

  if (this == window) {
    return new Mario(identity, game, solids);
  }

  var player, spriteOffset = 26 * identity.color;
  var anim = {
    stand: 'samll-stand',
    walk: 'small-walk',
    jump: 'small-jump'
  };

  player = game.add.sprite(16 * scale, 0, 'mario');
  game.physics.arcade.enable(player);

  player.body.gravity.y = 333 * scale;
  player.body.collideWorldBounds = true;

  player.scale.setTo(scale, scale);
  smallMario();

  player.animations.add('small-stand', [0 + spriteOffset], 1, true);
  player.animations.add('small-walk', [1 + spriteOffset, 2 + spriteOffset], 15, true);
  player.animations.add('small-jump', [3 + spriteOffset], 1, true);

  player.animations.add('super-stand', [14 + spriteOffset], 1, true);
  player.animations.add('super-walk', [15 + spriteOffset, 16 + spriteOffset, 15 + spriteOffset, 14 + spriteOffset], 30, true);
  player.animations.add('super-jump', [17 + spriteOffset], 1, true);

  player.anchor.setTo(0.5, 0.5);
  player.animations.play(anim.walk);

  function smallMario() {
    player.body.setSize(14, 16, 0 * scale, 8 * scale);
    anim.stand = 'small-stand';
    anim.walk = 'small-walk';
    anim.jump = 'small-jump';
  }

  function superMario() {
    player.body.setSize(14, 27, 0 * scale, 2 * scale);
    anim.stand = 'super-stand';
    anim.walk = 'super-walk';
    anim.jump = 'super-jump';
  }

  this.update = function(leftKeyDown, rightKeyDown, upKeyDown) {
    game.physics.arcade.collide(player, solids);

    player.body.velocity.x = 0;

    if (leftKeyDown) {
      // move to left
      player.body.velocity.x = -50 * scale;
      player.scale.x = -scale;
      player.animations.play(anim.walk);

    } else if (rightKeyDown) {
      // move to right
      player.body.velocity.x = 50 * scale;
      player.scale.x = scale;
      player.animations.play(anim.walk);

    } else {
      // stand still
      player.animations.play(anim.stand);

    }

    if (!player.body.touching.down) {
      player.animations.play(anim.jump);
    }

    if (upKeyDown && player.body.touching.down) {
      // jump
      if (leftKeyDown || rightKeyDown) {
        player.body.velocity.y = -200 * scale;
      } else {
        player.body.velocity.y = -210 * scale;
      }
    }

  };

  this.debug = function() {
    game.debug.body(player);
  };

};
