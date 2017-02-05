$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/contacts/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});



if (window.location.pathname === '/blobs/') {

  fetch('../api/v1/workouts').then(function(res) {
    res.json().then(function(workouts) {	
      console.log('workouts', workouts);
      var tbody = document.getElementById('table-body');
      workouts.forEach(function(workouts) {
        tbody.insertAdjacentHTML('beforeend', '<tr><td><a href="/blobs/' + workouts._id + '">'
         + workouts.name + '</td><td>' + workouts.MMG + ' </td><td>' 
         + workouts.DMG + ' </td><td>' + workouts.OMG + ' </td><td>' 
         + workouts.type + ' </td><td>' + workouts.mechanics + ' </td><td>' 
         + workouts.equipment + ' </td><td>' + workouts.difficulty + ' </td><td>' 
         + workouts.date + ' </td><td><a href="/blobs/' 
         + workouts._id + '/edit">' + 'Edit' + '</td><td><a id="delete" href="#" class="btn btn-default">Delete</a></td></tr>' );

      });
    })
  });

}