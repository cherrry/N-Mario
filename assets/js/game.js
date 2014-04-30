require.config({
  paths: {
    phaser: '../libs/phaser/phaser.min',
    NMario: 'NMario',
    Land: 'Land',
    game: 'game'
  },
  shim: {
    NMario: {
      deps: ['phaser'],
      exports: 'NMario'
    },
    Land: {
      deps: ['NMario']
    },
    game: {
      deps: ['Land']
    }
  }
});

require(['NMario', 'Land'], function(NMario) {
  
  console.log('game.js loaded');
  console.log(NMario.prototype);
});
