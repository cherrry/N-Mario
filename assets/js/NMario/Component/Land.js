define('Land', function() {
  console.log('Land.js loaded');
  var Land = function(group, i, j, attr) {x
    var tile = group.create(i * 16 * localstorage.globalScale, j * 16 * localstorage.globalScale, 'land', 1);
    tile.scale.setTo(localstorage.globalScale, localstorage.globalScale);
    tile.body.immovable = true;
  };
  return Land;
});