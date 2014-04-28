function Mario(identity, game, solids) {

  if (this == window) {
    return new Mario(identity, game, solids);
  }

  var player, spriteOffset = 46 * identity.color;

  player = game.add.sprite(16 * scale, 0, 'mario');
  game.physics.arcade.enable(player);

  player.body.gravity.y = 333 * scale;
  player.body.collideWorldBounds = true;

  player.scale.setTo(scale, scale);
  smallMario();

  player.animations.add('walk', [3 + spriteOffset, 6 + spriteOffset], 15, true);
  player.animations.add('jump', [5 + spriteOffset], 1, true);
  player.animations.play('walk');
  player.anchor.setTo(0.5, 0.5);

  function smallMario() {
    player.body.setSize(14, 16, 0 * scale, 8 * scale);
  }

  this.update = function(leftKeyDown, rightKeyDown, upKeyDown) {
    game.physics.arcade.collide(player, solids);

    player.body.velocity.x = 0;

    if (leftKeyDown) {
      // move to left
      player.body.velocity.x = -50 * scale;
      player.scale.x = -scale;
      player.animations.play('walk');

    } else if (rightKeyDown) {
      // move to right
      player.body.velocity.x = 50 * scale;
      player.scale.x = scale;
      player.animations.play('walk');

    } else {
      // stand still
      player.animations.stop();
      player.frame = 2 + spriteOffset;

    }

    if (!player.body.touching.down) {
      player.animations.play('jump');
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
