define('WorldOne', ['World'], function(World) {

  console.log('WorldOne.js loaded');

  var WorldOne = (function() {

    var data = Array();
    // land
    for (var i = 0; i < 30; i++) {
      data.push({ x: i, y: 9, type: 'Land', attr: null });
    }

    // brick
    for (var i = 0; i < 6; i++) {
      data.push({ x: i, y: 6, type: 'Brick', attr: null });
    }
    
    // coin
    for (var i = 0; i < 3; i++) {
      data.push({ x: i, y: 5, type: 'Coin', attr: null });
    }

    // question
    for (var i = 0; i < 6; i++) {
      data.push({ x: 14 - i, y: 4, type: 'Question', attr: null });
    }

    // tube
    data.push({ x: 8, y: 7, type: 'Tube', attr: { height: 2, direction: 'up', flower: false } });
    data.push({ x: 20, y: 0, type: 'Tube', attr: { height: 4, direction: 'down', flower: false } });

    return new World(10, 30, data);
  })();

  World.WorldOne = WorldOne;
});
