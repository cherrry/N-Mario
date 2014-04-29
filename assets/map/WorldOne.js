var WorldOne = (function() {

  var data = Array();
  // land
  for (var i = 0; i < 15; i++) {
    data.push({ x: i, y: 9, type: 'land', callback: null });
  }

  // brick
  for (var i = 0; i < 6; i++) {
    data.push({ x: i, y: 6, type: 'brick', callback: null });
  }

  // question
  for (var i = 0; i < 6; i++) {
    data.push({ x: i, y: 4, type: 'question', callback: null });
  }

  return new World(10, 15, data);
})();
