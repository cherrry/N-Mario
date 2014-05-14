require.config({
  paths: {
    'Land': 'NMario/Component/Land',
    'Tube': 'NMario/Component/Tube',
    'Block': 'NMario/Component/Block'
  },
  shim: {
    'Land': {
      exports: 'Land'
    },
    'Tube': {
      exports: 'Tube'
    },
    'Block': {
      exports: 'Block'
    }
  }
});

define('Component', ['Land', 'Tube', 'Block'], function (Land, Tube, Block) {
  var Component = {};

  Component.Land = Land;
  Component.Tube = Tube;
  Component.Block = Block;

  return Component;
});
