$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/blobs/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

function getSearch() {
	localStorage.setItem("search", document.getElementById('search').value);
}
 

if (window.location.pathname === '/blobs/') {

	if (localStorage.getItem("search") === 'a') {

		  fetch('../api/v1/workouts?sort=date').then(function(res) {
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
		         + workouts._id + '/edit">' + 'Edit' + '</td><td><form action= "/blobs/' + workouts._id + '/edit" method="post" enctype="application/x-www-form-urlencoded"><input type="hidden" value="DELETE" name="_method"><button type="submit" style="width:55px;height:25px;" position= "center"> Delete</form></td></tr>' );

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
	else {
		fetch('../api/v1/workouts?query={"name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
			res.json().then(function(result) {
				if (result.length === "0") {
					document.getElementById('totalCount').innerHTML = "No entry found related to " + 
					localStorage.getItem("search");

					document.getElementById('result').style.display = "none";
				}
				else if (result.length === 1) {
					document.getElementById('totalCount').innerHTML = "Found " + result.length +
				" entry ";
				}
				else {
					document.getElementById('totalCount').innerHTML = "Found " + result.length +
				" entries ";
				}
				
				var tbody = document.getElementById('table-body');
				result.forEach(function(result) {
				 tbody.insertAdjacentHTML('beforeend', '<tr><td><a href="/blobs/' + result._id + '">'
			         + result.name + '</td><td>' + result.MMG + ' </td><td>' 
			         + result.DMG + ' </td><td>' + result.OMG + ' </td><td>' 
			         + result.type + ' </td><td>' + result.mechanics + ' </td><td>' 
			         + result.equipment + ' </td><td>' + result.difficulty + ' </td><td>' 
			         + result.date + ' </td><td><a href="/blobs/' 
			         + result._id + '/edit">' + 'Edit' + '</td><td><form action= "/blobs/' + result._id + '/edit" method="post" enctype="application/x-www-form-urlencoded"><input type="hidden" value="DELETE" name="_method"><button type="submit" style="width:55px;height:25px;" position= "center"> Delete</form></td></tr>' );

				});
				localStorage.setItem("search", null);
			});
		});
	}
}