define('World', ['Brick', 'Coin', 'Land', 'Question', 'Tube'], function() {
  var World = function(rows, cols, data) {
    return World.prototype.init(rows, cols, data);
  };

  console.log('World.js loaded');

  World.prototype = {
    constructor: World,
    init: function(rows, cols, data) {

      var self = this;
      var map = new Array(rows);
      for (var i = 0; i < rows; i++) {
        map[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
          map[i][j] = { type: null, attr: null };
        }
      }

      for (var i = 0; i < data.length; i++) {
        var tile = data[i];

        map[tile.y][tile.x] = new Object();
        map[tile.y][tile.x].type = tile.type;
        map[tile.y][tile.x].attr = tile.attr;
      }
      
      this.__defineGetter__('rows', function() { return rows; });
      this.__defineGetter__('cols', function() { return cols; });
      this.__defineGetter__('map', function() { return map; });

      return this;

    }
  };

  World.prototype.init.prototype = World.prototype;

  return World;
});
