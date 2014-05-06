require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
  },
  shim: {
    'Mushroom': {
      exports: 'Mushroom'
    }
  }
});

define('Collectible', ['Mushroom'], function (Mushroom) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;

  return Collectible;
});
