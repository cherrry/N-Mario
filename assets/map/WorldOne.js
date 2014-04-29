var WorldOne = (function() {

  var data = Array();
  // land
  for (var i = 0; i < 30; i++) {
    data.push({ x: i, y: 9, type: 'Land', callback: null });
  }

  // brick
  for (var i = 0; i < 6; i++) {
    data.push({ x: i, y: 6, type: 'Brick', callback: null });
  }

  // question
  for (var i = 0; i < 6; i++) {
    data.push({ x: 14 - i, y: 4, type: 'Question', callback: null });
  }

  return new World(10, 30, data);
})();
