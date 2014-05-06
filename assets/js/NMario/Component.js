require.config({
  paths: {
    'Land': 'NMario/Component/Land'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Component', ['Land'], function (Land) {
  var Component = {};

  Component.Land = Land;

  return Component;
});
