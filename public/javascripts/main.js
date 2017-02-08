$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/blobs/'+val+'/edit',
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
      fetch('../api/v1/workouts/count').then(function(res){
		res.json().then(function(count){
			console.log('count', count)
			var totalCount = document.getElementById('totalCount');
			setTimeout(function() {
				totalCount.innerHTML = count.count;
			}, 500)
			
		});
	  });
    });

  });

});	


function getSearch() {
	localStorage.setItem("search", document.getElementById('search').value);
}
 

if (window.location.pathname === '/blobs/') {

	if (localStorage.getItem("search") === 'null' || localStorage.getItem("search") === null) {

		  fetch('../api/v1/workouts?sort=date').then(function(res) {
		    res.json().then(function(workouts) {	
		      console.log('workouts', workouts);
		      var tbody = document.getElementById('table-body');
		      workouts.forEach(function(workouts) {
		        tbody.insertAdjacentHTML('beforeend', '<tr><td> <input type="checkbox" id="' + workouts._id + '" />  </td><td><a href="/blobs/' + workouts._id + '">'
		         + workouts.name + '</td><td>' + workouts.MMG + ' </td><td>' 
		         + workouts.DMG + ' </td><td>' + workouts.OMG + ' </td><td>' 
		         + workouts.type + ' </td><td>' + workouts.mechanics + ' </td><td>' 
		         + workouts.equipment + ' </td><td>' + workouts.difficulty + ' </td><td>' 
		         + workouts.date + ' </td><td><a href="/blobs/' 
		         + workouts._id + '/edit">' + 'Edit' + '</td></tr>' );

		      });
		    })
		  });

		  fetch('../api/v1/workouts/count').then(function(res){
			res.json().then(function(count){
				console.log('count', count)
				var totalCount = document.getElementById('totalCount');
				setTimeout(function() {
					totalCount.innerHTML = count.count;
				}, 500)
				
			});
		  });
		  
		  
	}	  
	if (localStorage.getItem("search") !== 'null') {
		fetch('../api/v1/workouts?query={"name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
			res.json().then(function(result) {
				if (result.length === 1) {
					document.getElementById('totalCount').innerHTML = "Found " + result.length +
				" entry ";
				}
				else {
					document.getElementById('totalCount').innerHTML = "Found " + result.length +
				" entries ";
				}
				
				var tbody = document.getElementById('table-body');
				result.forEach(function(result) {
				 tbody.insertAdjacentHTML('beforeend', '<tr><td> <input type="checkbox" id="' + result._id + '" />  </td><td><a href="/blobs/' + result._id + '">'
			         + result.name + '</td><td>' + result.MMG + ' </td><td>' 
			         + result.DMG + ' </td><td>' + result.OMG + ' </td><td>' 
			         + result.type + ' </td><td>' + result.mechanics + ' </td><td>' 
			         + result.equipment + ' </td><td>' + result.difficulty + ' </td><td>' 
			         + result.date + ' </td><td><a href="/blobs/' 
			         + result._id + '/edit">' + 'Edit' + '</td></tr>' );

				});
				localStorage.setItem("search", null);
			});
		});
	}

}