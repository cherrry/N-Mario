require.config({
  paths: {
    phaser: '../libs/phaser/phaser.min',
    NMario: 'NMario',
    World: 'World'
  },
  shim: {
    NMario: {
      exports: 'NMario'
    },
    World: {
      exports: 'World'
    }
  }
});

require(['NMario', 'World'], function(NMario, World) {
  
  console.log('game.js loaded');
  /*
  require(['../map/WorldOne'], function() {
    // need to be careful
    window.game = NMario('world', 3, World.WorldOne);
    window.globalScale = 3;
    window.scale = 3;
  });
  */
  World.load('WorldOne');

});
