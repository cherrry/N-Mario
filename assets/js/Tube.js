function Tube(group, y, x, attr) {

  /*
    attr = {
      height = number,
      direction = 'up'/'down',
      flower = true/false
    };
  */

  for (var i = 0; i < attr.height; i++) {
    var tile = group.create(x * 16 * globalScale, (y + i) * 16 * globalScale, 'tube', 9);
    tile.scale.setTo(globalScale, globalScale);
    tile.body.immovable = true;

    if (i == 0 && attr.direction == 'up') {
      tile.frame = 0;
    } else if (i == attr.height - 1 && attr.direction == 'down') {
      tile.frame = 2;
    }

    tile = group.create((x + 1) * 16 * globalScale, (y + i) * 16 * globalScale, 'tube', 10);
    tile.scale.setTo(globalScale, globalScale);
    tile.body.immovable = true;

    if (i == 0 && attr.direction == 'up') {
      tile.frame = 1;
    } else if (i == attr.height - 1 && attr.direction == 'down') {
      tile.frame = 3;
    }
  }

}
