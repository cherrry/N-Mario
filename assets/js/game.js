require.config({
  paths: {
    phaser: '../libs/phaser/phaser.min',
    NMario: 'NMario',
    game: 'game',
    World: 'World',
    WorldOne: '../map/WorldOne'
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

define('game', ['NMario', 'World', 'WorldOne'], function(NMario, World) {
  
  console.log('game.js loaded');
  
  // need to be careful
  window.game = NMario('world', 3, World.WorldOne);
  window.globalScale = 3;
  window.scale = 3;
});
