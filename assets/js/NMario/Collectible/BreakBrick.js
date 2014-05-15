require.config({
  path: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible'
  }
});

define('BreakBrick', ['BaseCollectible'], function (BaseCollectible) {
  var BreakBrick = function (game, objects, x, y, attr) {

    var self = this;
    BaseCollectible.call(this, game, objects, x, y, attr, 'break-brick');

    this.body.allowGravity = true;
    this.body.gravity.y = 400 * localStorage.scale;
    switch (attr.frame) {
      case 0:
        this.body.velocity.x = -20 * localStorage.scale;
        this.body.velocity.y = -150 * localStorage.scale;
      break;
      case 1:
        this.body.velocity.x = 20 * localStorage.scale;
        this.body.velocity.y = -150 * localStorage.scale;
      break;
      case 2:
        this.body.velocity.x = -20 * localStorage.scale;
        this.body.velocity.y = -100 * localStorage.scale;
      break;
      case 3:
        this.body.velocity.x = 20 * localStorage.scale;
        this.body.velocity.y = -100 * localStorage.scale;
      break;
    }
    this.frame = attr.frame;

    window.setTimeout(function () {
      self.kill();
    }, 500);


  };

  BreakBrick.prototype = Object.create(BaseCollectible.prototype);
  BreakBrick.prototype.constructor = BreakBrick;
  BreakBrick.prototype.Type = 'BreakBrick';

  return BreakBrick;
});
