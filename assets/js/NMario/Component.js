require.config({
  paths: {
    'Land': 'NMario/Component/Land',
    'Tube': 'NMario/Component/Tube'
  },
  shim: {
    'Land': {
      exports: 'Land'
    },
    'Tube': {
      exports: 'Tube'
    }
  }
});

define('Component', ['Land', 'Tube'], function (Land, Tube) {
  var Component = {};

  Component.Land = Land;
  Component.Tube = Tube;

  return Component;
});
