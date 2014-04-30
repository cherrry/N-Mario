$(document).ready(function() {

  localStorage.name = localStorage.name || 'Player';

  $('#player_name')
    .html(localStorage.name)
    .popup({
      content: 'Change your name',
      position: 'bottom center'
    });
  $('#input_player_name').val(localStorage.name);

  $('#edit_player_name')
    .modal('setting', {
      onApprove: function() {
        localStorage.name = $('#input_player_name').val();
        $('#player_name').html(localStorage.name);
        $('#input_player_name').val(localStorage.name);
      }
    })
    .modal('attach events', '#player_name', 'show');
});
