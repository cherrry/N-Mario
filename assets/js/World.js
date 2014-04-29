function World(rows, cols, data) {

  if (this == window) {
    return new World(rows, columns, data);
  }

  this.rows = rows;
  this.cols = cols;

  this.map = new Array(rows);
  for (var i = 0; i < rows; i++) {
    this.map[i] = new Array(cols);

    for (var j = 0; j < cols; j++) {
      this.map[i][j] = { type: null, callback: null };
    }
  }

  for (var i = 0; i < data.length; i++) {
    var tile = data[i];

    this.map[tile.y][tile.x] = new Object();
    this.map[tile.y][tile.x].type = tile.type;
    this.map[tile.y][tile.x].callback = tile.callback;
  }

  return this;
}
