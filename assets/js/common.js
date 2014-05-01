$(document).ready(function() {

  // hide waiting room and game console at start
  //$('#content_index').hide();
  $('#content_room').hide();
  $('#content_game').hide();

  // assign name to the player
  localStorage.name = localStorage.name || 'Player';

  // player name
  $('#player_name')
    .html(localStorage.name)
    .popup({
      content: 'Change your name',
      position: 'bottom center'
    });
  $('#input_player_name')
    .val(localStorage.name);
  $('#edit_player_name')
    .modal('setting', {
      onApprove: function() {
        localStorage.name = $('#input_player_name').val();
        $('#player_name').html(localStorage.name);
        $('#input_player_name').val(localStorage.name);

        // TODO: tell the server about name change
        // socket.emit('name change', { id: id, name: name });
      }
    })
    .modal('attach events', '#player_name', 'show');
});
