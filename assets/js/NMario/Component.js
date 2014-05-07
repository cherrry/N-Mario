require.config({
  paths: {
    'Land': 'NMario/Component/Land',
    'Tube': 'NMario/Component/Tube',
    'Brick': 'NMario/Component/Brick'
  },
  shim: {
    'Land': {
      exports: 'Land'
    },
    'Tube': {
      exports: 'Tube'
    },
    'Brick': {
      exports: 'Brick'
    }
  }
});

define('Component', ['Land', 'Tube', 'Brick'], function (Land, Tube, Brick) {
  var Component = {};

  Component.Land = Land;
  Component.Tube = Tube;
  Component.Brick = Brick;

  return Component;
});
